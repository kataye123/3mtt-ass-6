// Define a global variable to store the current selected task for editing
let selectedTask = null;

// Function to add a new task to the list
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const task = taskInput.value .trim();
        if (!task) {
        alert("Please write down a task");
        return;
      }
    

    if (task.trim() !== '') {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <button onclick="completeTask(this)">Complete</button>
            <button onclick="cancelTask(this)">Undo</button>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(li);
        taskInput.value = '';
    }

    
}


// Function to mark a task as complete
function completeTask(element) {
    element.parentNode.classList.add('completed');
  }
  
  // Function to mark a completed task as canceled
  function cancelTask(element) {
    element.parentNode.classList.remove('completed');
  }

// Function to edit a task
function editTask(element) {
    selectedTask = element.parentNode;
    const taskText = selectedTask.querySelector('span').innerText;
    document.getElementById('taskInput').value = taskText;
    document.getElementById('taskInput').focus();
}

// Function to save the edited task
function saveTask() {
    if (selectedTask) {
        const newTaskText = document.getElementById('taskInput').value;
        if (newTaskText.trim() !== '') {
            selectedTask.querySelector('span').innerText = newTaskText;
        }
        selectedTask = null;
        document.getElementById('taskInput').value = '';
    }
}

// Event listener for 'Enter' key press to save the edited task
document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        saveTask();
    }
});

// Function to delete a task
function deleteTask(element) {
    element.parentNode.remove();
}

// Function to update the completed tasks counter
function updateCompletedCounter() {
    const completedTasks = document.querySelectorAll('.completed').length;
    const totalTasks = document.querySelectorAll('li').length;
    const incompleteTasks = totalTasks - completedTasks;
    document.getElementById('completedCounter').innerText = `Completed: ${completedTasks}`;
    document.getElementById('incompleteCounter').innerText = `Incomplete: ${incompleteTasks}`;
}

// Update the completeTask function to call the updateCompletedCounter function
function completeTask(element) {
    element.parentNode.classList.add('completed');
    updateCompletedCounter();
}
// Update the cancelTask function to call the updateCompletedCounter function
function cancelTask(element) {
    element.parentNode.classList.remove('completed');
    updateCompletedCounter();
}

// Update the deleteTask function to call the updateCompletedCounter function
function deleteTask(element) {
    element.parentNode.remove();
    updateCompletedCounter();
}

// Call the updateCompletedCounter function when the page loads to initialize the counter
window.onload = function () {
    updateCompletedCounter();
};

