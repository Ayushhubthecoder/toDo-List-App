document.title = "Task Manager!";

// DOM Manipulation
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskNum");

// Load tasks from local storage
document.addEventListener("DOMContentLoaded", loadTasks);

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const task = taskInput.value.trim(); // Get the input value and trim whitespace

    if (task !== "") {
        addTaskToList(task); // Add task to UI
        saveTaskToLocalStorage(task); // Save task to local storage
        taskInput.value = ""; // Clear the input field
    } else {
        alert("Please enter a task.");
    }
});

function addTaskToList(task) {
    const listItem = document.createElement("li");

    listItem.textContent = task;
    listItem.addEventListener("click", function () {
        listItem.classList.toggle("completed");
        console.log("Task is completed!");
    });

    // Create a delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";

    deleteButton.addEventListener("click", function () {
        taskList.removeChild(listItem);
        deleteTaskFromLocalStorage(task); // Remove task from local storage
    });

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

// Function to save a task to local storage
function saveTaskToLocalStorage(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(addTaskToList); //loading task
}

// Function to get tasks from local storage
function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function deleteTaskFromLocalStorage(taskToDelete) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter((task) => task !== taskToDelete);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
