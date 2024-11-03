let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const taskName = document.getElementById('taskName').value.trim();
    const priority = document.getElementById('priorityLevel').value;
    
    if (!taskName) return alert('Please enter a task name');

    const task = {
        id: Date.now(),
        name: taskName,
        priority: priority,
        status: 'pending'
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    document.getElementById('taskName').value = '';
}

function renderTasks(filteredTasks = tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.status}`;
        taskItem.innerHTML = `
            <span>${task.name} (${task.priority})</span>
            <div>
                <button onclick="toggleStatus(${task.id})">${task.status === 'completed' ? 'Unmark' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleStatus(id) {
    const task = tasks.find(task => task.id === id);
    task.status = task.status === 'completed' ? 'pending' : 'completed';
    saveTasks();
    renderTasks();
}

function filterTasks(status) {
    const filteredTasks = status === 'all' ? tasks : tasks.filter(task => task.status === status);
    renderTasks(filteredTasks);
}

function sortTasksByPriority() {
    tasks.sort((a, b) => {
        const priorities = { high: 1, medium: 2, low: 3 };
        return priorities[a.priority] - priorities[b.priority];
    });
    renderTasks();
}

window.onload = renderTasks;
