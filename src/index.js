/* eslint-disable no-loop-func */
import './style.css';
import status from './status.js';
import {
  addTask, editTask, deleteTask, clearChecked,
} from './add_remove.js';

const mainList = document.getElementById('main-list');
const clearAll = document.getElementById('clear');

let myTasks = [];

// Save to local storage
function saveToStorage(taskArray) {
  localStorage.setItem('tasks', JSON.stringify(taskArray));
}

// Display Tasks
function displayTasks() {
  mainList.innerHTML = '';
  myTasks.forEach((myTask) => {
    const content = `<div class="list-input"><input type="checkbox"> <p class="description">${myTask.description}</p></div><span><i class="far fa-edit"></i><i class="far fa-trash-alt"></i></span>`;

    const listItem = document.createElement('li');
    listItem.innerHTML = `${content}`;
    listItem.className = 'list-item';
    mainList.appendChild(listItem);

    const listInput = listItem.firstChild;
    const checkbox = listInput.firstChild;
    const para = listInput.lastChild;
    const editIcon = listInput.nextSibling.firstChild;
    const trashIcon = editIcon.nextSibling;
    trashIcon.style.display = 'none';

    // Update checkbox status
    if (myTask.completed) {
      checkbox.classList.add('checked');
      checkbox.checked = true;
      checkbox.addEventListener('change', (e) => {
        status(e, myTask);
        saveToStorage(myTasks);
      });
    } else {
      checkbox.classList.add('unchecked');
      checkbox.addEventListener('change', (e) => {
        status(e, myTask);
        saveToStorage(myTasks);
      });
    }

    // Edit task
    editIcon.addEventListener('click', () => {
      editTask(para, myTask, myTasks, trashIcon, editIcon);
    });

    trashIcon.addEventListener('click', () => {
      deleteTask(myTasks, myTask);
    });
  });
}

clearAll.addEventListener('click', () => {
  clearChecked(myTasks);
});

// Add new task with enter icon
const enterBtn = document.getElementById('enter');
enterBtn.onclick = () => {
  addTask(myTasks);
  displayTasks();
};

// Add new task with enter keypress
const inputList = document.getElementById('inputList');
inputList.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask(myTasks);
    displayTasks();
  }
});

// Get from local storage
function getFromStorage() {
  const local = JSON.parse(localStorage.getItem('tasks'));
  if (local) {
    myTasks = local;
  }
  if (myTasks.length === 0) {
    mainList.innerHTML = '<li class="list-item"><div class="list-input"><p>To-Do List is empty.</p></div></li>';
  } else {
    displayTasks();
  }
}

window.onload = getFromStorage();