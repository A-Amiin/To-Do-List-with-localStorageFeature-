// Initialize the counter from local storage or start at 1
let counter = JSON.parse(localStorage.getItem('counter')) || 1;

// Function to create and return a span with specified text and font weight
function createStyledSpan(text, fontWeight) {
    const span = document.createElement('span');
    span.style.fontWeight = fontWeight;
    span.textContent = text;
    return span;
}

// Function to add a new task
function addTask(task, date, isNewTask = true) {
    // Create a new list item
    const li = document.createElement('li');
    li.classList.add('li-list');
    const counterSpan = createStyledSpan(`${counter}- `, '900');
    const dueDateSpan = createStyledSpan(' - Due Date: ', '900');
    // Create text nodes for the task and date
    const taskText = document.createTextNode(task);
    const dateText = document.createTextNode(date);

    // Append the spans and text nodes to the list item
    li.appendChild(counterSpan);
    li.appendChild(taskText);
    li.appendChild(dueDateSpan);
    li.appendChild(dateText);

    // Add a delete button
    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function () {
        li.remove(); // Remove the task from the DOM
        removeTaskFromLocalStorage(task, date); // Remove the task from local storage
    });
    li.appendChild(deleteButton);
    document.querySelector(".ordered-list").appendChild(li);
    if (isNewTask) {
        saveTaskToLocalStorage(task, date); // Save the task into local storage
        counter++; // Increment the counter only when adding a new task
        localStorage.setItem('counter', counter); // Save the updated counter in local storage
    }
}

// Function to save a task to local storage
function saveTaskToLocalStorage(task, date) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ task, date });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove a task from local storage
function removeTaskFromLocalStorage(task, date) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.task !== task || t.date !== date);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', function () {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(({ task, date }, index) => {
        counter = index + 1; // Ensure the counter matches the task number
        addTask(task, date, false); // Load tasks without incrementing the counter
    });
    // Update the counter to be ready for the next new task
    counter = tasks.length + 1;
    localStorage.setItem('counter', counter); // Save the counter in local storage
});

// Add event listener to the "Add Task" button --> that runs the whole APP process
document.getElementById('add-task').addEventListener('click', function () {
    const task = document.getElementById('task').value;
    const date = document.getElementById('date').value;
    if (task && date) {
        addTask(task, date);
        document.getElementById('task').value = '';
        document.getElementById('date').value = '';
    } else {
        alert('Please enter both a task and a date.');
    }
});

// Add event listeners to change the borders of the input fields
const taskInput = document.getElementById('task');
const dateInput = document.getElementById('date');

taskInput.addEventListener('focus', function () {
    document.getElementById('task').style.outline = '2px solid #4CAF50';
});

taskInput.addEventListener('blur', function () {
    document.getElementById('task').style.outline = '';
});

dateInput.addEventListener('focus', function () {
    document.getElementById('date').style.outline = '2px solid #4CAF50';
});

dateInput.addEventListener('blur', function () {
    document.getElementById('date').style.outline = '';
});