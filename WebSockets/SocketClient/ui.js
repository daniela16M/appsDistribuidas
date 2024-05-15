const noteUI = (note) => {
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card card-body rounded-0 animate__animated animate__fadeInUp mb-2">
      <div class="d-flex justify-content-between">
          <h1 class="card-title h3">${note.message}</h1>
          <div>
              <button class="btn btn-danger delete" data-id="${note.id}">delete</button>
              <button class="btn btn-secondary update" data-id="${note.id}">update</button>
          </div>
      </div>
      <p>${note.description}</p>
  </div>`;

  return div;
};

export const renderNotes = (nodelist, notes) => {
  nodelist.innerHTML = "";
  notes.forEach((note) => {
    appendNote(nodelist, note);
  });
};

export const appendNote = (nodelist, note) =>
  nodelist.insertAdjacentElement("beforeend", noteUI(note));

export const editNote = (nodelist, note) => {
  nodelist.querySelector("#title").value = note.message;
  nodelist.querySelector("#description").value = note.description;
};
