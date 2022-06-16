const toDoInput = document.querySelector("input");

function sort() {
  let ul = document.querySelector("ul");

  Array.from(ul.getElementsByTagName("LI"))
    .sort((a, b) => a.textContent.localeCompare(b.textContent))
    .forEach((li) => ul.appendChild(li));
}

function changeImage() {
  let audio = new Audio("writing.mp3");
  audio.play();
  setTimeout(() => {
    audio.pause();
    audio.currentTime = 0;
  }, 1000);
  let images = document.querySelectorAll(".waiting");
  images.forEach((images) => {
    images.src = "writing.gif";
  });
  setTimeout(() => {
    images.forEach((images) => {
      images.src = "waiting.gif";
    });
  }, 1000);
}

function submit() {
  if (!toDoInput.value || toDoInput.value.match(/^ *$/)) return;
  changeImage();
  const li = document.createElement("li");
  const p = document.createElement("p");
  const button = document.createElement("button");
  const edit = document.createElement("button");
  const editfield = document.createElement("input");
  const button2 = document.createElement("button");

  p.textContent = toDoInput.value;
  button.textContent = "Remove";
  button.classList.add("delete-btn");
  edit.textContent = "Edit";
  edit.classList.add("edit-btn");
  editfield.classList.add("editfield");
  editfield.placeholder = "Edit";
  button2.textContent = "Submit";
  button2.classList.add("submit2");

  button.addEventListener("click", () => li.remove());

  edit.addEventListener("click", () => {
    function editor() {
      if (editfield.value.match(/^ *$/)) return;
      li.append(p, edit, button);
      p.textContent = editfield.value;
      editfield.remove();
      button2.remove();
      changeImage();
    }
    editfield.value = p.textContent;
    p.remove();
    edit.remove();
    button.remove();
    li.append(editfield, button2);
    editfield.focus();
    button2.addEventListener("click", () => {
      editor();
    });
    editfield.addEventListener("keyup", (e) => {
      if (e.code !== "Enter") return;
      editor();
    });
  });

  li.append(p, edit, button);
  document.querySelector("ul").append(li);
  toDoInput.value = "";
  toDoInput.focus();
}

toDoInput.addEventListener("keyup", (e) => {
  if (e.code !== "Enter") return;
  submit();
});

document.querySelector("#deleteAll").addEventListener("click", () => {
  document.querySelectorAll("li").forEach((li) => li.remove());
});
