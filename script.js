    const inputBox = document.getElementById("inputBox");
    const addBtn = document.getElementById("addBtn");
    const todoList = document.getElementById("todoList");

    let editTodo = null;

    const addTodo = () => {
      const inputText = inputBox.value.trim();
      if (inputText.length <= 0) {
        alert("You must write something in your todo");
        return false;
      }

      if (addBtn.value === "Edit") {
        const oldText = editTodo.target.previousElementSibling.innerHTML;
        editTodo.target.previousElementSibling.innerHTML = inputText;
        editLocalTodo(oldText, inputText);
        addBtn.value = "Add";
        inputBox.value = "";
      } else {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.innerHTML = inputText;
        li.appendChild(p);

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.classList.add("btn", "editBtn");
        li.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Remove";
        deleteBtn.classList.add("btn", "deleteBtn");
        li.appendChild(deleteBtn);

        todoList.appendChild(li);
        inputBox.value = "";

        saveLocalTodos(inputText);
      }
    };

    const updateTodo = (e) => {
      if (e.target.innerHTML === "Remove") {
        const todoItem = e.target.parentElement;
        deleteLocalTodos(todoItem);
        todoList.removeChild(todoItem);
      }

      if (e.target.innerHTML === "Edit") {
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
      }
    };

    const saveLocalTodos = (todo) => {
      let todos = [];
      if (localStorage.getItem("todos") !== null) {
        todos = JSON.parse(localStorage.getItem("todos"));
      }
      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));
    };

    const getLocalTodos = () => {
      let todos = [];
      if (localStorage.getItem("todos") !== null) {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach((todo) => {
          const li = document.createElement("li");
          const p = document.createElement("p");
          p.innerHTML = todo;
          li.appendChild(p);

          const editBtn = document.createElement("button");
          editBtn.innerText = "Edit";
          editBtn.classList.add("btn", "editBtn");
          li.appendChild(editBtn);

          const deleteBtn = document.createElement("button");
          deleteBtn.innerText = "Remove";
          deleteBtn.classList.add("btn", "deleteBtn");
          li.appendChild(deleteBtn);

          todoList.appendChild(li);
        });
      }
    };

    const deleteLocalTodos = (todoElement) => {
      let todos = JSON.parse(localStorage.getItem("todos")) || [];
      const todoText = todoElement.children[0].innerHTML;
      const index = todos.indexOf(todoText);
      if (index !== -1) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    };

    const editLocalTodo = (oldText, newText) => {
      let todos = JSON.parse(localStorage.getItem("todos")) || [];
      const index = todos.indexOf(oldText);
      if (index !== -1) {
        todos[index] = newText;
        localStorage.setItem("todos", JSON.stringify(todos));
      }
    };

    window.addEventListener("load", getLocalTodos);
    addBtn.addEventListener("click", addTodo);
    todoList.addEventListener("click", updateTodo);
  