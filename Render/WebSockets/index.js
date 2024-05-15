import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createClient } from "@supabase/supabase-js";

const app = express();
const server = createServer(app);

const supabaseUrl = process.env.JS_SUPABASE_URL;
const supabaseKey = process.env.JS_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const getNotes = async (socket) => {
  let { data: mensajesSocket, error } = await supabase
    .from("mensajesSocket")
    .select("*");
  socket.emit("server:loadnotes", mensajesSocket);
};

const getNote = async (socket, id) => {
  let { data: mensajesSocket, error } = await supabase
    .from("mensajesSocket")
    .select("*")
    .eq("id", id);
  socket.emit("server:selectednote", mensajesSocket[0]);
};

const addNote = async (io, note) => {
  await supabase.from("mensajesSocket").insert([note]).select();
  getNotes(io);
};

const deleteNote = async (io, id) => {
  await supabase.from("mensajesSocket").delete().eq("id", id);
  getNotes(io);
};

const updateNote = async (io, id, note) => {
  await supabase.from("mensajesSocket").update(note).eq("id", id).select();
  getNotes(io);
};

const io = new Server(server, {
  cors: {
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  getNotes(socket);

  socket.on("client:newnote", (data) => addNote(io, data));

  socket.on("client:deletenote", (id) => deleteNote(io, id));

  socket.on("client:getnote", (id) => getNote(io, id));

  socket.on("client:updatenote", (data) => {
    const { id, ...note } = data;
    updateNote(io, id, note);
  });
});

server.listen(3000, () =>
  console.log("Servidor iniciado en http://localhost:3000")
);
