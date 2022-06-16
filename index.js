const toDoInput = document.querySelector("input");
//                   FUNCTIONS

//a function for the sort button to rearrange them alphabetically
function sort() {
  let ul = document.querySelector("ul");

  Array.from(ul.getElementsByTagName("LI"))
    .sort((a, b) => a.textContent.localeCompare(b.textContent))
    .forEach((li) => ul.append(li));
  localStore();
}

//a function to change the gif from waiting to writing and added writing sounds
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

//store inputs into localstorage
function localStore() {
  let list = document.querySelectorAll("li");
  let storedList = [];
  list.forEach((li) => {
    storedList.push({
      text: li.firstChild.textContent,
    });
  });
  localStorage.setItem("isTask", JSON.stringify(storedList));
}

function getItem() {
  const storedItem = JSON.parse(localStorage.getItem("isTask"));
  document.querySelectorAll("li").forEach((li) => li.remove());
  if (storedItem) {
    storedItem.forEach((task) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      const button = document.createElement("button");
      const edit = document.createElement("button");
      const editfield = document.createElement("input");
      const button2 = document.createElement("button");
      p.textContent = task.text;
      button.textContent = "Remove";
      button.classList.add("delete-btn");
      edit.textContent = "Edit";
      edit.classList.add("edit-btn");
      editfield.classList.add("editfield");
      editfield.placeholder = "Edit";
      button2.textContent = "Submit";
      button2.classList.add("submit2");

      button.addEventListener("click", () => {
        li.remove();
        localStore();
      });

      edit.addEventListener("click", () => {
        function editor() {
          if (editfield.value.match(/^ *$/)) return;
          li.append(p, edit, button);
          p.textContent = editfield.value;
          editfield.remove();
          button2.remove();
          changeImage();
          localStore();
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
    });
  }
}
//The main submit function, what happens when you press enter or hit the submit button
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

  button.addEventListener("click", () => {
    li.remove();
    localStore();
  });

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
  localStore();
  console.log(localStorage);
}

//code for the Enter key to work with the submit form
toDoInput.addEventListener("keyup", (e) => {
  if (e.code !== "Enter") return;
  submit();
});

// the command for the Clear List button, deletes every element that was added
document.querySelector("#deleteAll").addEventListener("click", () => {
  document.querySelectorAll("li").forEach((li) => li.remove());
  localStorage.clear();
});
getItem();
