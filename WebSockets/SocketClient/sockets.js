import { appendNote, editNote, renderNotes } from "./ui.js";

const socket = io("https://aplicaciones-distribuidas.onrender.com");

export let saveID = "";

const notes = document.querySelector("#notes");

export const serverNewNota = () =>
  socket.on("server:newnote", (note) => appendNote(notes, note));

export const loadNotesServer = () =>
  socket.on("server:loadnotes", (data) => {
    renderNotes(notes, data);
  });

export const saveNote = (formData) => socket.emit("client:newnote", formData);

export const deleteNote = (id) => socket.emit("client:deletenote", id);

export const getNote = (id) => {
  socket.emit("client:getnote", id);
};

export const selectedNote = () =>
  socket.on("server:selectednote", (note) => {
    saveID = note.id;
    editNote(document.querySelector("#noteForm"), note);
  });

export const updateNote = (formData) => {
  saveID = "";
  socket.emit("client:updatenote", formData);
};

export default socket;
