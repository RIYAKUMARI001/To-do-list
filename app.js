let addTaskButton = document.querySelector(".add-task");
let taskList = document.querySelector(".task-list");
let taskInput = document.querySelector(".task-input");

// Load tasks from local storage
window.addEventListener("load", () => {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => createTaskElement(task.text, task.completed));
});

addTaskButton.addEventListener("click", () => {
    let taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    createTaskElement(taskText, false);
    saveTask(taskText, false);
    taskInput.value = "";
});

taskList.addEventListener("click", (event) => {
    let target = event.target;


    if (target.classList.contains("delete")) {
        let listItem = target.parentElement;
        deleteTask(listItem);
        listItem.remove();
    }
});

function createTaskElement(taskText, completed) {
    let item = document.createElement("li");
    item.className = "task-item";
    if (completed) item.classList.add("completed");

   
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.addEventListener("change", () => {
        item.classList.toggle("completed");
        toggleTaskCompletion(item);
    });
    let taskTextSpan = document.createElement("span");
    taskTextSpan.textContent = taskText;
    taskTextSpan.classList.add("task-text");

    let textNode = document.createTextNode(taskText);

   
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("delete-icon");

    deleteButton.addEventListener("click", () => {
        let listItem = deleteButton.parentElement;
        deleteTask(listItem);
        listItem.remove();
    });

    item.appendChild(checkbox);
    item.appendChild(taskTextSpan);
    item.appendChild(deleteButton);
    taskList.appendChild(item);
}


function saveTask(text, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function toggleTaskCompletion(taskElement) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskText = taskElement.textContent.replace("Delete", "").trim();
    let task = tasks.find(t => t.text === taskText);
    task.completed = !task.completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task from local storage
function deleteTask(taskElement) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskText = taskElement.textContent.replace("Delete", "").trim();
    let updatedTasks = tasks.filter(t => t.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
