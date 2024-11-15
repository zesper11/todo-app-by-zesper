// Get elements from the DOM
const addButton = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks from the tasks array
function displayTasks() {
    todoList.innerHTML = ''; // Clear the list before rendering

    // Loop through each task and add it to the list
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        // Create new list item for the task
        const newTask = document.createElement('li');
        newTask.textContent = task.text;

        // Create the delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-btn');
        
        // Add the delete button to the list item
        newTask.appendChild(deleteButton);

        // Add the task to the list
        todoList.appendChild(newTask);

        // When the delete button is clicked, delete the task
        deleteButton.onclick = function() {
            deleteTask(i); // Call delete function
        };
    }
}

// Add a new task
function addTask() {
    const taskText = todoInput.value.trim(); // Get input value and remove extra spaces

    if (taskText === '') {
        alert('Please enter a task!');
        return; // Do nothing if input is empty
    }

    // Add new task to the tasks array
    tasks.push({ text: taskText });

    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Clear input field
    todoInput.value = '';

    // Display the updated task list
    displayTasks();
}

// Delete a task
function deleteTask(index) {
    // Remove the task from the array using splice
    tasks.splice(index, 1);

    // Save the updated tasks array to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Display the updated task list
    displayTasks();
}

// Event listener for the "Add Task" button
addButton.addEventListener('click', addTask);

// Event listener for pressing Enter to add a task
todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Initial call to display tasks when the page loads
displayTasks();

