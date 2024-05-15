import {
  saveNote,
  loadNotesServer,
  serverNewNota,
  deleteNote,
  getNote,
  selectedNote,
  saveID,
  updateNote,
} from "./sockets.js";

const noteForm = document.querySelector("#noteForm");
export let nodeID = "";

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const form = new FormData(e.target);
  const formData = {};

  for (const [key, value] of form) formData[key] = value;
  if (!saveID) {
    saveNote(formData);
  } else {
    updateNote({ id: saveID, ...formData });
  }
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".delete")) {
    deleteNote(e.target.dataset.id);
  }
  if (e.target.closest(".update")) {
    getNote(e.target.dataset.id);
  }
});

serverNewNota();
loadNotesServer();
selectedNote();
