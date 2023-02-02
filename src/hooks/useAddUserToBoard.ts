import { type DocumentReference, updateDoc } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms/user-atom";
import type { BoardData } from "../types/board.type";

const useAddUserToBoard = (
  data?: BoardData,
  docRef?: DocumentReference<BoardData>
) => {
  const userVal = useRecoilValue(userAtom);
  const shouldAdd = useRef(true);

  const handleAdd = async () => {
    if (!userVal || !data || !docRef || !shouldAdd.current) return;

    try {
      const userArrayWithoutCurrent =
        data.users.filter((x) => x.uuid !== userVal.uuid) ?? [];
      const newArr = [...userArrayWithoutCurrent, userVal];
      await updateDoc<BoardData>(docRef, {
        users: newArr,
        updated: new Date(),
      });
      shouldAdd.current = false;
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemove = async () => {
    if (!userVal || !data || !docRef) return;
    try {
      const userArrayWithoutCurrent =
        data.users.filter((x) => x.uuid !== userVal.uuid) ?? [];
      await updateDoc<BoardData>(docRef, {
        users: userArrayWithoutCurrent,
        updated: new Date(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const removeUsersVote = async () => {
    if (!userVal || !docRef || !data) return;
    try {
      const votes = data.votes;
      const filtered = votes.filter((v) => v.userId !== userVal.uuid);
      await updateDoc<BoardData>(docRef, {
        votes: filtered,
        updated: new Date(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (shouldAdd.current && data && userVal) {
      handleAdd();
    }
  }, [data, userVal]);

  useEffect(() => {
    return () => {
      handleRemove();
      removeUsersVote();
    };
  }, []);

  return {};
};

export default useAddUserToBoard;
