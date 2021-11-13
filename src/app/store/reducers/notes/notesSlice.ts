import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateRandomString } from "../../../helpers/generateRandomString";
import { noteType, noteTypeBody } from "../types";

export const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: {} as noteType,
  },
  reducers: {
    clearNotes: (state, action) => {
      delete state.notes[action.payload.key];
    },
    removeNote: (
      state,
      action: PayloadAction<{ idx: string; key: string }>
    ) => {
      const copyNote = { ...state.notes };
      copyNote[action.payload.key] = copyNote[action.payload.key].filter(
        (el) => el.idx !== action.payload.idx
      );
      state.notes = copyNote;
    },
    updateNote: (
      state,
      action: PayloadAction<{ key: string; idx: string; body: noteTypeBody }>
    ) => {
      const copyNote = { ...state.notes };
      const pos = copyNote[action.payload.key].findIndex(
        (el) => el.idx === action.payload.idx
      );
      copyNote[action.payload.key][pos] = {
        body: {
          description: action.payload.body.description,
          title: action.payload.body.title || "No Title",
        },
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
      try {
        copyNotes[action.payload.key].push({
          idx: generateRandomString(12),
          body: {
            title: action.payload.body.title || "No Title",
            description: action.payload.body.description,
          },
        });
        state.notes = copyNotes;
      } catch (e) {
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
      }
    },
  },
});

export const { updateNote, addNote, removeNote, clearNotes } =
  noteSlice.actions;

export default noteSlice.reducer;
