import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { importantAndUrgent } from '../slicers/importantAndUrgent';
import { importantAndNotUrgent } from '../slicers/importantAndNotUrgent';
import { notImportantAndUrgent } from '../slicers/notImportantAndUrgent';
import { notImportantAndNotUrgent } from '../slicers/notImportantAndNotUrgent';


export const store = configureStore({
  reducer: combineReducers({
    importantAndUrgent: importantAndUrgent.reducer,
    importantAndNotUrgent: importantAndNotUrgent.reducer,
    notImportantAndUrgent: notImportantAndUrgent.reducer,
    notImportantAndNotUrgent: notImportantAndNotUrgent.reducer,
  }),
});

export type StoreDispatch = typeof store.dispatch;
export type StoreState = ReturnType<typeof store.getState>;