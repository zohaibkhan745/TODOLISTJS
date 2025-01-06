// Initialize an empty array to hold the tasks
let tasks = [];

// Load tasks from localStorage when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks && Array.isArray(storedTasks)) {
    tasks = storedTasks; // Restore tasks from localStorage
    updateTaskList(); // Update the task list display
  }
});

// Save tasks to localStorage
const saveTask = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Function to add a new task
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false }); // Add new task to tasks array
    taskInput.value = ""; // Clear input field
    updateTaskList(); // Update task list
    saveTask(); // Save tasks to localStorage
  } else {
    alert("Task cannot be empty!");
  }
};

// Function to update the displayed list of tasks
const updateTaskList = () => {
  const taskList = document.querySelector(".task-list"); // Select task list container
  taskList.innerHTML = ""; // Clear the current task list

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li"); // Create a new list item
    listItem.innerHTML = `
      <div class="taskItemWrapper">
        <div class="taskItem">
          <div class="task ${task.completed ? "completed" : ""}">
            <input 
              type="checkbox" 
              class="checkbox" 
              ${task.completed ? "checked" : ""} 
              onclick="toggleTaskComplete(${index})"
            />
            <p>${task.text}</p>
          </div>
          <div class="icons">
            <img src="./img/edit.png" alt="Edit Task" onclick="editTask(${index})" />
            <img src="./img/bin.png" alt="Delete Task" onclick="deleteTask(${index})" />
          </div>
        </div>
      </div>
    `;
    taskList.append(listItem); // Append the list item to the task list
  });

  updateProgress(); // Update progress bar and counter
};

// Function to toggle the completion status of a task
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed; // Toggle task completion
  updateTaskList(); // Refresh task list
  saveTask(); // Save tasks to localStorage
};

// Function to edit a task
const editTask = (index) => {
  const newText = prompt("Edit your task:", tasks[index].text); // Prompt for new text
  if (newText !== null && newText.trim()) { // Validate input
    tasks[index].text = newText.trim(); // Update task text
    updateTaskList(); // Refresh task list
    saveTask(); // Save tasks to localStorage
  } else if (newText === "") {
    alert("Task cannot be empty!");
  }
};

// Function to delete a task
const deleteTask = (index) => {
  tasks.splice(index, 1); // Remove the task at the specified index
  updateTaskList(); // Refresh task list
  saveTask(); // Save tasks to localStorage
};

// Function to update the progress bar and task counter
const updateProgress = () => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  const progressBar = document.getElementById("progress");
  progressBar.style.width =
    totalTasks === 0 ? "0%" : `${(completedTasks / totalTasks) * 100}%`; // Update progress bar width

  const numbers = document.getElementById("numbers");
  numbers.textContent = `${completedTasks} / ${totalTasks}`; // Update task counter
};

// Add event listener to the "newTask" button to add a task when clicked
document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent default form submission
  addTask(); // Add a new task
});
