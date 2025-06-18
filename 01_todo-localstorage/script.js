document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const addTaskButton = document.getElementById('add-task-btn');
  const todoList = document.getElementById('todo-list');

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(task => renderTask(task));

  addTaskButton.addEventListener('click', () => {
    const taskText = todoInput.value.trim()
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    }

    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    todoInput.value = "";
    console.log(tasks);
    
  })

  function renderTask(task){
    console.log(task.text);
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.innerHTML = `
    <span>${task.text} </span>
    <button> Delete </button>`;
    li.addEventListener('click', (e) => {
      if (e.target.tagName === "BUTTON") return ;//The Tag Name has to be written in all Caps
      task.completed = !task.completed;
      li.classList.toggle('completed');
      
      saveTask();
    })

    li.querySelector('button').addEventListener('click', (e) => {
       e.stopPropagation() // prevent event bubbling
       tasks = tasks.filter((t) => t.id !== task.id);
       saveTask();
       li.remove();
    })
    todoList.appendChild(li);
  }
  // Add local storage so that when refresh also tasks context can be maintained\

  function saveTask() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }


})