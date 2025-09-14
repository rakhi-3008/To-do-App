const inputBox = document.querySelector(".myinput");
const addBtn = document.querySelector(".btn");
const todoList = document.querySelector("#todoList");

let editTodo = null;

const addTodo = () =>{
    const inputText = inputBox.value.trim();
    if(inputText.length <= 0){
        alert("Please write something in your to-do");
        return false;
    }

    if(addBtn.innerText === "Edit"){
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.innerText = "Add";
        inputBox.value = "";
    }

    else {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("editBtn","Btn");
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("deleteBtn","Btn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputText);
    }
}

const updateTodo = (e) =>{
    if(e.target.innerHTML === "Remove"){
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement);
    }

    if(e.target.innerHTML === "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.innerText = "Edit";
        editTodo = e;
    }
}

const saveLocalTodos= (todo) =>{
   let todos;
    if(localStorage.getItem("todos") === null){
         todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos)); 
}

const getLocalTodo = () =>{
    let todos;
    if(localStorage.getItem("todos") === null){
         todos = [];
    }
    else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(todo =>{

    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = todo;
    li.appendChild(p);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("editBtn","Btn");
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("deleteBtn","Btn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
        });
    }
}

const deleteLocalTodos = (todo) =>{
    let todos;
    if(localStorage.getItem("todos") === null){
         todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    todos.splice(todoIndex, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todoIndex);
}

const editLocalTodos = (todo) =>{
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded',getLocalTodo);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);
