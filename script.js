let todos = [
];
let nextId = 4;
let isDarkMode = false;

const noteInput = document.getElementById('noteInput');
const sendBtn = document.getElementById('sendBtn');
const themeBtn = document.getElementById('themeBtn');
const todoList = document.getElementById('todoList');
const container = document.getElementById('container');

function renderTodos(filteredTodos = todos) {
    todoList.innerHTML = '';
    
    filteredTodos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item' + (todo.completed ? ' completed' : '');
        todoItem.style.cssText = `
            display: flex; 
            align-items: center; 
            padding: 15px; 
            border: 1px solid #e0e0e0; 
            border-radius: 8px; 
            margin-bottom: 10px; 
            background-color: ${todo.completed ? '#f0f8ff' : '#fafafa'};
        `;

        todoItem.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${todo.id})" 
                   style="margin-right: 15px; transform: scale(1.2);">
            <span style="flex: 1; font-size: 16px; color: ${todo.completed ? '#666' : '#333'}; text-decoration: ${todo.completed ? 'line-through' : 'none'};">
                ${todo.text}
            </span>
            <button onclick="editTodo(${todo.id})" style="background: none; border: none; font-size: 18px; cursor: pointer; margin-right: 10px;">✏️</button>
            <button onclick="deleteTodo(${todo.id})" style="background: #ff6b6b; color: white; border: none; font-size: 14px; cursor: pointer; padding: 6px 10px; border-radius: 5px;">
                Delete
            </button>
        `;

        todoList.appendChild(todoItem);
    });
}

function addTodo() {
    const text = noteInput.value.trim();
    if (text) {
        todos.push({
            id: nextId++,
            text: text,
            completed: false
        });
        noteInput.value = '';
        renderTodos();
    }
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        const newText = prompt('Yangi matn kiriting:', todo.text);
        if (newText !== null && newText.trim()) {
            todo.text = newText.trim();
            renderTodos();
        }
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

function searchTodos() {
    const searchText = noteInput.value.toLowerCase();
    const filtered = todos.filter(todo => 
        todo.text.toLowerCase().includes(searchText)
    );
    renderTodos(filtered);
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const body = document.body;
    
    if (isDarkMode) {
        body.style.backgroundColor = '#1a1a1a';
        container.style.backgroundColor = '#2d2d2d';
        container.style.color = '#ffffff';
        themeBtn.textContent = '🌤️';
        themeBtn.style.backgroundColor = '#ffa500';
    } else {
        body.style.backgroundColor = '#f5f5f5';
        container.style.backgroundColor = 'white';
        container.style.color = 'white';
        themeBtn.textContent = '🌙';
        themeBtn.style.backgroundColor = '#667eea';
    }
    renderTodos();
}

// Event listeners
sendBtn.addEventListener('click', addTodo);
themeBtn.addEventListener('click', toggleTheme);

noteInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});

noteInput.addEventListener('input', function() {
    if (this.value.trim() === '') {
        renderTodos();
    } else {
        searchTodos();
    }
});

// Initialize
renderTodos();

// Global access
window.toggleTodo = toggleTodo;
window.editTodo = editTodo;
window.deleteTodo = deleteTodo;
