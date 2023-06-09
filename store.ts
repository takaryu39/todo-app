import create from "zustand";
import { EditedNotice, EditedTask } from "./types/types";

type State = {
  editedTask: EditedTask;
  editedNotice: EditedNotice;
  updateEditedTask: (payload: EditedTask) => void;
  updateEditedNotice: (payload: EditedNotice) => void;
  resetEditedTask: () => void;
  resetEditedNotice: () => void;
};

const useStore = create<State>((set) => ({
  //状態管理を一箇所でまとめて定義する。各ページで定義しなくてもよい。
  editedTask: { id: "", title: "" },
  editedNotice: { id: "", content: "" },
  updateEditedTask: (payload) =>
    set({
      editedTask: {
        id: payload.id,
        title: payload.title,
      },
    }),
  resetEditedTask: () => set({ editedTask: { id: "", title: "" } }),
  updateEditedNotice: (payload) =>
    set({
      editedNotice: {
        id: payload.id,
        content: payload.content,
      },
    }),
  resetEditedNotice: () => set({ editedNotice: { id: "", content: "" } }),
}));

export default useStore;
