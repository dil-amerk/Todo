import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ActionSlice, UpdateTextShowed, ITodoModel } from "../types/types";

const initialState: ITodoModel[] = [];

export const createCustomSlice = (name: string) => {
  const {
    actions: { add, remove, completeStatus, reorder, update, updateTextShowed },
    reducer,
  } = createSlice({
    name,
    initialState,
    reducers: {
      add: {
        reducer: (state, action: PayloadAction<ITodoModel>) => {
          state.push(action.payload);
        },
        /* Note to me: prepare --> If you want to add a meta or error property to your action, or customize the payload of your action */
        prepare: (text: string, description: string) => ({
          payload: {
            id: uuidv4(),
            text,
            description,
            isFinished: false,
            createdAt: new Date().toLocaleString(),
            isTextShowed: false,
          } as ITodoModel,
        }),
      },
      update(state, action) {
        state.splice(
          action.payload.destination.index,
          0,
          action.payload.filterState
        );
      },
      remove(state, action: PayloadAction<string>) {
        const index = state.findIndex(({ id }) => id === action.payload);
        state.splice(index, 1);
      },
      completeStatus(state, action: PayloadAction<ActionSlice>) {
        const index = state.findIndex(({ id }) => id === action.payload.id);
        state[index].isFinished = action.payload.isFinished;
        state[index].updatedAt = action.payload.updatedAt;
      },
      updateTextShowed(state, action: PayloadAction<UpdateTextShowed>) {
        const index = state.findIndex(({ id }) => id === action.payload.id);
        state[index].isTextShowed = action.payload.isTextShowed;
      },
      reorder(state, action) {
        const [removed] = state.splice(action.payload.source.index, 1);
        state.splice(action.payload.destination.index, 0, removed);
      },
    },
  });

  return {
    actions: { add, remove, completeStatus, reorder, update, updateTextShowed },
    reducer,
  };
};
