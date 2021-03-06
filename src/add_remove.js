function addTask(taskArray) {
  const inputList = document.getElementById('inputList');
  const task = {
    description: inputList.value,
    completed: false,
    index: taskArray.length + 1,
  };
  taskArray.push(task);
  localStorage.setItem('tasks', JSON.stringify(taskArray));
  inputList.value = '';
}

function editTask(text, task, taskArray, trashIcon, editIcon) {
  text.setAttribute('contenteditable', 'true');
  text.classList.add('inputEdit');
  editIcon.style.display = 'none';
  trashIcon.style.display = 'block';
  task.description = text.innerHTML;
  text.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      task.description = text.innerHTML;
      localStorage.setItem('tasks', JSON.stringify(taskArray));
      trashIcon.style.display = 'none';
      editIcon.style.display = 'block';
      text.classList.remove('inputEdit');
      text.setAttribute('contenteditable', 'false');
    }
  });
}

function deleteTask(taskArray, delTask) {
  taskArray = taskArray.filter((task) => task.index !== delTask.index);
  taskArray.forEach((task) => {
    task.index = taskArray.indexOf(task) + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(taskArray));
  window.location.reload();
}

function clearChecked(taskArray) {
  taskArray = taskArray.filter((task) => !task.completed);
  taskArray.forEach((task) => {
    task.index = taskArray.indexOf(task) + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(taskArray));
  window.location.reload();
}

export {
  addTask, editTask, deleteTask, clearChecked,
};