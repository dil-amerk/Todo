import { AnyAction } from "@reduxjs/toolkit";

export interface ITodoModel {
  id: string;
  text: string;
  description: string;
  isFinished: boolean;
  createdAt?: string;
  updatedAt?: string;
  isTextShowed?: boolean;
}

export type ActionSlice = Omit<ITodoModel, "text">;
export type UpdateTextShowed = Omit<ActionSlice, "isFinished">;


export interface ILayoutProps {
  labelText?: string;
  addHandler: (a: string) => AnyAction;
  removeHandler: (r: string) => AnyAction;
  completedHandler: (c: ActionSlice) => AnyAction;
  selectorState: ITodoModel[];
  droppableId: string;
  updateTextShowed: (v: UpdateTextShowed) => AnyAction;
}

// Note to me: this types for PayloadAction 
