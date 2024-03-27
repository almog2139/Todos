"use strict"

var gTodos = []
var gTodoIdToEdit
createTodos()

function onInit() {
    renderTodos()
}

//Function showing the todo list
function renderTodos() {
    const todos = gTodos
    const elTodos = document.querySelector(".todo-list")
    const strHTMLs = todos.map(
        (todo) => `<li onclick="onEditTodo(event,'${todo.id}')">
        ${todo.txt} <span>date</span> ${todo.date} <span>status</span> ${todo.status}
        <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
    </li>`
    )
    elTodos.innerHTML = strHTMLs.join("")
    document.querySelector(".adding-btn").innerText = "Add";

}

//Function adding a new todo
function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = ev.target[0]
    const elDate = ev.target[1]
    const elStatus = ev.target[2]
    if (!elTxt.value) return
    if (!elDate.value) elDate.value = "2024-06-07"
    if (!elStatus.value) elStatus.value = "new"
    const elBtnAddText = document.querySelector(".adding-btn").textContent;
    if (elBtnAddText === "Add") {
        const todo = createTodo(elTxt.value, elDate.value, elStatus.value)
        gTodos.push(todo)

    } else {

        const copyGtodos = [...gTodos]
        const todos = copyGtodos.map(todo => {
            return (todo.id === gTodoIdToEdit) ? {...todo, txt: elTxt.value, data: elDate.value, status: elStatus.value } :
                todo;
        })
        gTodos = todos
    }
    saveTodosToStorage()
    renderTodos()
    elTxt.value = ""
    elDate.value = ""
    elStatus.value = ""
}
//Function remove todo
function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    const isConfirm = confirm("Are you sure?")
    if (!isConfirm) return
    const idx = gTodos.findIndex((todo) => todo.id === todoId)
    gTodos.splice(idx, 1)
    saveTodosToStorage()
    renderTodos()

}
//Function Edit todo
function onEditTodo(ev, todoId) {
    ev.stopPropagation()
    gTodoIdToEdit = todoId;
    const todo = gTodos.find((todo) => todo.id === todoId)
    console.log(todo)
    const inputText = document.getElementById('todo-text');
    const inputDate = document.getElementById('todo-date');
    const inputStatus = document.getElementById('todo-status');
    inputText.value = todo.txt
    inputDate.value = todo.date
    inputStatus.value = todo.status
    document.querySelector(".adding-btn").innerText = "Edit";

}
//Create a defult todo list
function createTodos() {
    var todos = loadFromStorage('todoDB')
    if (!todos || !todos.length) {
        todos = [
            createTodo('Do the dishes', "2024-05-01", "new"),
            createTodo('Learn Javascript', "2024-09-12", "new"),
        ]
    }
    gTodos = todos
    saveTodosToStorage()
}
//Function that build todo object 
function createTodo(txt, date, status) {
    return {
        id: makeId(),
        txt,
        date,
        status
    }
}
//Function update the localStorage with the new list on todolist
function saveTodosToStorage() {
    saveToStorage('todoDB', gTodos)
}

function makeId(length = 5) {
    var txt = ''
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}