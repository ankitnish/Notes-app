import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../features/notes/notesSlice";

const savedNotes = localStorage.getItem("notes");

const preloadedState = savedNotes
  ? {
      notes: {
        notes: JSON.parse(savedNotes),
        tags: ["Work", "Personal", "Urgent"],
      },
    }
  : undefined;

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    "notes",
    JSON.stringify(state.notes.notes)
  );
});