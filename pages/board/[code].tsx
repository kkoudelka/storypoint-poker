import ActionButtons from "@/components/board/actions";
import Board from "@/components/board/board";
import DynamicChart from "@/components/board/chart";
import UserList from "@/components/board/user-list";
import Layout from "@/components/layout/layout";
import { userNameAtom } from "@/src/atoms/name";
import { selectedCardState } from "@/src/atoms/selectedCard";
import { doc, getDoc } from "@/src/firebase/firebase-client";
import { BoardData, IUser } from "@/src/types/board.type";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
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

interface IProps {
  code: string;
}

const BoardCode: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ code }) => {
  const docRef = doc<BoardData>("boards", code.toString());
  const [selectedValue, setSelectedValue] = useRecoilState(selectedCardState);
  const uNameVal = useRecoilValue(userNameAtom);

  const [docData] = useDocumentData<BoardData>(docRef);

  const addUser = async () => {
    if (!uNameVal) return;

    const user: IUser = {
      name: uNameVal,
    };
    try {
      await updateDoc<BoardData>(docRef, {
        users: arrayUnion(user),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const removeUser = async () => {
    if (!uNameVal) return;
    try {
      await updateDoc<BoardData>(docRef, {
        users: arrayRemove({
          name: uNameVal,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const removeUsersVote = async () => {
    if (!uNameVal) return;
    try {
      const dataRef = await getDoc(docRef);
      const data = dataRef.data();
      if (!data) return;
      const votes = data.votes;
      const filtered = votes.filter((v) => v.user !== uNameVal);
      await updateDoc<BoardData>(docRef, {
        votes: filtered,
      });
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   if (!uNameVal || !docData) return;

  //   if (
  //     docData.showResults === false &&
  //     docData.votes.length === 0 &&
  //     selectedValue !== null
  //   ) {
  //     setSelectedValue(null);
  //   }
  // }, [docData]);

  useEffect(() => {
    if (!uNameVal) return;
    // add user to board
    addUser();
    return () => {
      removeUser();
      removeUsersVote();
    };
  }, []);

  return (
    <Layout>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <UserList
              users={docData?.users ?? []}
              reveal={docData?.showResults ?? false}
              votes={docData?.votes}
            />
            <ActionButtons
              docRef={docRef}
              revealed={docData?.showResults ?? false}
              votes={docData?.votes}
            />
          </Grid>
          <Grid item xs={12} md={9}>
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
