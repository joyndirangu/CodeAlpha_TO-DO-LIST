// script.js
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const deadlineInput = document.getElementById('deadlineInput');
    const categoryInput = document.getElementById('categoryInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const li = document.createElement('li');

        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';
        
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.innerText = taskInput.value;
        taskDetails.appendChild(taskText);

        if (deadlineInput.value) {
            const taskDeadline = document.createElement('span');
            taskDeadline.className = 'task-deadline';
            taskDeadline.innerText = `Due: ${deadlineInput.value}`;
            taskDetails.appendChild(taskDeadline);
        }

        const taskCategory = document.createElement('span');
        taskCategory.className = 'task-category';
        taskCategory.innerText = `Category: ${categoryInput.value}`;
        taskDetails.appendChild(taskCategory);
        
        li.appendChild(taskDetails);

        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerText = 'Edit';
        editBtn.onclick = function() {
            editTask(li, taskText.innerText, deadlineInput.value, categoryInput.value);
        };
        taskActions.appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerText = 'Remove';
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            saveTasks();
        };
        taskActions.appendChild(removeBtn);

        li.appendChild(taskActions);

        taskList.appendChild(li);
        saveTasks();

        taskInput.value = '';
        deadlineInput.value = '';
        categoryInput.value = 'Personal';
    }
}

function editTask(taskElement, currentTaskText, currentDeadline, currentCategory) {
    const taskInput = document.getElementById('taskInput');
    const deadlineInput = document.getElementById('deadlineInput');
    const categoryInput = document.getElementById('categoryInput');

    taskInput.value = currentTaskText;
    deadlineInput.value = currentDeadline;
    categoryInput.value = currentCategory;

    taskElement.remove();
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        const taskText = li.querySelector('.task-text').innerText;
        const taskDeadline = li.querySelector('.task-deadline')?.innerText.split(': ')[1] || '';
        const taskCategory = li.querySelector('.task-category').innerText.split(': ')[1];
        tasks.push({ text: taskText, deadline: taskDeadline, category: taskCategory });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        const taskList = document.getElementById('taskList');
        tasks.forEach(({ text, deadline, category }) => {
            const li = document.createElement('li');

            const taskDetails = document.createElement('div');
            taskDetails.className = 'task-details';
            
            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.innerText = text;
            taskDetails.appendChild(taskText);

            if (deadline) {
                const taskDeadline = document.createElement('span');
                taskDeadline.className = 'task-deadline';
                taskDeadline.innerText = `Due: ${deadline}`;
                taskDetails.appendChild(taskDeadline);
            }

            const taskCategory = document.createElement('span');
            taskCategory.className = 'task-category';
            taskCategory.innerText = `Category: ${category}`;
            taskDetails.appendChild(taskCategory);
            
            li.appendChild(taskDetails);

            const taskActions = document.createElement('div');
            taskActions.className = 'task-actions';

            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.innerText = 'Edit';
            editBtn.onclick = function() {
                editTask(li, text, deadline, category);
            };
            taskActions.appendChild(editBtn);

            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-btn';
            removeBtn.innerText = 'Remove';
            removeBtn.onclick = function() {
                taskList.removeChild(li);
                saveTasks();
            };
            taskActions.appendChild(removeBtn);

            li.appendChild(taskActions);

            taskList.appendChild(li);
        });
    }
}
