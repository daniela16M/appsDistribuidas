const table = document.querySelector("table");

const peticion = async ({ endpoint, method, body }) => {
  method = method ? method : "GET";
  const url = "https://apirestful-users.onrender.com/";
  try {
    const res = await fetch(url + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        token: "1234",
      },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    return json;
  } catch (error) {
    return null;
  }
};

const tableData = async () => {
  if (table.querySelector("tbody")) table.querySelector("tbody").remove();
  const data = await peticion({ endpoint: "users" });
  const body = document.createElement("tbody");

  data.forEach((element) => {
    const tr = document.createElement("tr");
    tr.classList.add("row");
    tr.dataset.id = element.id;
    tr.dataset.nombre = element.nombre;
    tr.innerHTML = `<td>${element.id}</td><td>${element.nombre}</td><td><button class="edit">Editar</button><button class="delete">Eliminar</button></td>`;
    body.append(tr);
  });

  table.append(body);
};

document.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    const data = e.target.closest(".row");
    const id = data.dataset.id;
    const nombre = data.dataset.nombre;

    document.querySelector("[name='id']").value = id;
    document.querySelector("[name='nombre']").value = nombre;

    console.log(id, nombre);
  }
  if (e.target.matches(".delete")) {
    const data = e.target.closest(".row");
    const id = data.dataset.id;
    const res = await peticion({
      endpoint: "user",
      method: "DELETE",
      body: { data: { id } },
    });
    tableData();
    console.log(res);
  }
});

document.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.querySelector("[name='id']").value;
  const nombre = document.querySelector("[name='nombre']").value;
  if (id) {
    console.log(id);
    await peticion({
      endpoint: "user",
      method: "PUT",
      body: { data: { id, nombre } },
    });
  } else {
    await peticion({
      endpoint: "user",
      method: "POST",
      body: { data: { nombre } },
    });
  }
  tableData();
});

document.addEventListener("DOMContentLoaded", () => {
  tableData();
});
