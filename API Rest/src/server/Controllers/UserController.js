import { supabase } from "../config/supabaseClient.js";

const getUsers = async () => {
  try {
    let { data, error } = await supabase.from("Prueba").select("*");

    if (error) throw error;

    return data;
  } catch (error) {
    throw error;
  }
};

// const getUser = async () => {
//   try {
//     let { data, error } = await supabase
//       .from("Prueba")
//       .select("*")
//       .eq("id", "1");

//     if (error) throw error;

//     return data[0];
//   } catch (error) {
//     throw error;
//   }
// };

const insertUser = async ({ user }) => {
  console.log("res", user);
  try {
    const { data, error } = await supabase
      .from("Prueba")
      .insert([user])
      .select();

    if (error) throw error;

    return data[0];
  } catch (error) {
    throw error;
  }
};

const updateUser = async ({ user }) => {
  const { id, ...dataUser } = user;
  try {
    const { data: user, error } = await supabase
      .from("Prueba")
      .update(dataUser)
      .eq("id", id)
      .select();

    if (error) throw error;

    return user[0];
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const { error } = await supabase.from("Prueba").delete().eq("id", id);

    if (error) throw error;

    return { message: "Dato elimado con exito" };
  } catch (error) {
    throw error;
  }
};

export default {
  getUsers,
  // getUser,
  insertUser,
  updateUser,
  deleteUser,
};
