import Board from "@/components/board/board";
import DynamicChart from "@/components/board/chart";
import UserList from "@/components/board/user-list";
import Layout from "@/components/layout/layout";
import { doc, getDoc } from "@/src/firebase/firebase-client";
import { BoardData } from "@/src/types/board.type";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TabPanel from "@mui/lab/TabPanel";
import type {
  GetServerSideProps,
  NextPage,
  InferGetServerSidePropsType,
} from "next";
import { useEffect } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useRecoilState, useRecoilValue } from "recoil";
import TabContext from "@mui/lab/TabContext";
import { goBackAtom } from "@/src/atoms/goBack";
import { useRouter } from "next/router";
import { userAtom } from "@/src/atoms/user-atom";
import Typography from "@mui/material/Typography";
import { appName, appUrl } from "@/src/utils";
import Divider from "@mui/material/Divider";
import Timer from "@/components/board/timer";
import { visitedBoardsAtom } from "@/src/atoms/visited-boards";
import { Tooltip, IconButton, Box } from "@mui/material";
import useCopyToClipboard from "@/src/hooks/useCopyToClipboard";
import OgMeta from "@/components/meta/og";
import useBoardNotifications from "@/src/hooks/useNotifications";
import useAddUserToBoard from "@/src/hooks/useAddUserToBoard";
import ActionButtons from "@/components/board/actions";
import TicketDialog from "@/components/board/tickets/dialog";

interface IProps {
  code: string;
}

const BoardCode: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ code }) => {
  const docRef = doc<BoardData>("boards", code.toString());
  const [, setGoBack] = useRecoilState(goBackAtom);
  const [localBoards, setLocalBoards] = useRecoilState(visitedBoardsAtom);
  const userVal = useRecoilValue(userAtom);
  const router = useRouter();

  const [docData] = useDocumentData<BoardData>(docRef);

  useAddUserToBoard(docData, docRef);
  useBoardNotifications(docData);

  const [, copy] = useCopyToClipboard();

  const addBoardToUser = async () => {
    if (!code || !docData || !docData.boardTitle) return;
    setLocalBoards((prev) => {
      const filtered = prev.filter((x) => x.id !== code);
      const newArr = [
        {
          id: code,
          boardTitle: docData?.boardTitle,
          visitedOn: new Date(),
        },
        ...filtered,
      ];
      return newArr;
    });
  };

  useEffect(() => {
    if (!docData || !docData.boardTitle || !code) return;
    if (localBoards.find((x) => x.id === code)) {
      return;
    }
    addBoardToUser();
  }, [code, docData, localBoards]);

  useEffect(() => {
    if (!userVal?.name || userVal?.name?.length < 1) {
      setGoBack(router.asPath);
      router.push("/name");
    }
  }, [router, setGoBack, userVal]);

  return (
    <Layout>
      <OgMeta
        title={`${docData?.boardTitle} | ${appName}`}
        url={`${appUrl}/board/${code}`}
      />
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: "auto", display: "flex", gap: 2 }}>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={(theme) => ({
                    fontSize: 36,

                    [theme.breakpoints.down("md")]: {
                      fontSize: 24,
                    },
                  })}
                >
                  {docData?.ticket ?? "Currently no ticket"}
                </Typography>
                <TicketDialog docRef={docRef} data={docData} />
              </Box>
              <Tooltip title="Copy link to board">
                <IconButton
                  onClick={() => {
                    copy(window.location.href);
                  }}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Divider sx={(theme) => ({ mt: theme.spacing(1) })} />
          </Grid>
          <Grid item xs={12}>
            {docData?.ticket && <Timer data={docData} />}
          </Grid>
          <Grid item xs={12} md={3} order={{ md: 1, xs: 2 }}>
            <UserList data={docData} docRef={docRef} />
            <ActionButtons
              docRef={docRef}
              revealed={docData?.showResults ?? false}
              votes={docData?.votes}
              data={docData}
            />
          </Grid>
          <Grid item xs={12} md={9} order={{ md: 2, xs: 1 }}>
            <TabContext value={docData?.showResults ? "results" : "board"}>
              <TabPanel value={"board"} tabIndex={0} sx={{ p: 0 }}>
                <Board
                  docRef={docRef}
                  revealed={docData?.showResults ?? true}
                  data={docData}
                />
              </TabPanel>
              <TabPanel value={"results"} tabIndex={1} sx={{ p: 0 }}>
                <DynamicChart votes={docData?.votes ?? []} />
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default BoardCode;

export const getServerSideProps: GetServerSideProps<IProps> = async (
  context
) => {
  const code = context.params?.["code"];

  if (!code) {
    return {
      notFound: true,
    };
  }

  const d = doc("boards", code.toString());
  const docSnap = await getDoc(d);

  if (!docSnap.exists()) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      code: code.toString(),
    },
  };
};
