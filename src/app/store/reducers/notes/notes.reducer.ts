import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateRandomString } from "../../../helpers/generateRandomString";

export const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: {} as {
      [k in string]: {
        idx: string;
        body: { title: string; description: string };
      }[];
    },
  },
  reducers: {
    removeNote: (state, action: PayloadAction<{ idx: string, key: string }>) => {
      const copyNote = { ...state.notes };
      copyNote[action.payload.key] = copyNote[action.payload.key].filter(
        (el) => el.idx !== action.payload.idx
      );
      state.notes = copyNote;
    },
    updateNote: (state, action) => {
      const copyNote = { ...state.notes };
      const pos = copyNote[action.payload.key].findIndex(
        (el) => el.idx === action.payload.idx
      );
      copyNote[action.payload.key][pos] = {
        body: {description: action.payload.body.description, title: action.payload.body.title || 'No Title' },
        idx: action.payload.idx,
      };
      state.notes = copyNote;
    },
    addNote: (
      state,
      action: PayloadAction<{
        key: string;
        body: { title: string; description: string };
      }>
    ) => {
      const copyNotes = { ...state.notes };
      copyNotes[action.payload.key].push({
        idx: generateRandomString(12),
        body: {
          title: action.payload.body.title || "No Title",
          description: action.payload.body.description,
        },
      });
      state.notes = copyNotes;
    },
    createNote: (
      state,
      action: PayloadAction<{
        key: string;
        body: { title: string; description: string };
      }>
    ) => {
      state.notes = {
        ...state.notes,
        [action.payload.key]: [
          {
            idx: generateRandomString(12),
            body: {
              title: action.payload.body.title || "No Title",
              description: action.payload.body.description,
            },
          },
        ],
      };
    },
  },
});

export const { updateNote, createNote, addNote, removeNote } =
  noteSlice.actions;

export default noteSlice.reducer;
