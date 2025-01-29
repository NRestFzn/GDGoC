function addTask() {
  const input = document.getElementById('tf-input').value;
  const task = document.createElement('li');

  task.textContent = input;

  task.id =
    new Date().valueOf().toString() +
    Math.random().toString(36).substring(2, 7);

  task.classList.add('list-item');

  const deleteButton = document.createElement('button');

  deleteButton.textContent = 'Delete';

  deleteButton.classList.add('delete-button');

  deleteButton.addEventListener('click', () => {
    deleteTask(task.id);
  });

  const editButton = document.createElement('button');

  editButton.textContent = 'Edit';

  editButton.addEventListener('click', () => {
    editTask(task.id);
  });

  task.appendChild(editButton);
  task.appendChild(deleteButton);

  document.getElementById('task-container').appendChild(task);

  document.getElementById('tf-input').value = '';
}

function deleteTask(id) {
  const task = document.getElementById(id);
  task.remove();
}

function editTask(id) {
  const task = document.getElementById(id);

  const input = document.getElementById('tf-input');

  const addButton = document.getElementById('add-button')
  
  addButton.textContent = 'Edit';

  addButton.addEventListener('click', () => {

    task.textContent = input.value;

    addButton.textContent = 'Add Task';
  })
}
