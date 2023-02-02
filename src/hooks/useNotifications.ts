import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/user-atom";
import { type BoardData } from "../types/board.type";

const useBoardNotifications = (data: BoardData | undefined) => {
  const { enqueueSnackbar } = useSnackbar();
  const userVal = useRecoilValue(userAtom);

  const announceNewAdmin = () => {
    if (!data) return;

    if (data.admin === userVal?.uuid) {
      enqueueSnackbar("You are now moderating this board", {
        variant: "info",
      });
      return;
    }
    const newModeratorName = data.users?.find(
      (user) => user.uuid === data.admin
    )?.name;
    enqueueSnackbar(`${newModeratorName} is now the moderator`, {
      variant: "info",
    });
  };

  useEffect(() => {
    if (data?.admin && data?.admin.length > 0) {
      announceNewAdmin();
    }
  }, [data?.admin]);

  return {};
};

export default useBoardNotifications;
