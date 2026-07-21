// HTML 요소(DOM) 가져오기
const currentDate = document.getElementById('current-date');
const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');
const categorySelect = document.getElementById('category-select');
const addButton = document.getElementById('add-button');

// 할 일 데이터를 담을 배열, localStorage에서 가져오거나 없으면 빈 배열
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// localStorage에 현재 todos 배열 저장
function saveLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// 1. 오늘 날짜 표시하기
function displayCurrentDate() {
  const now = new Date();
  const options = { year:'numeric', month:'long', day:'numeric', weekday:'long' };
  currentDate.textContent = now.toLocaleDateString('ko-KR', options);
}

// 2. todos 배열을 화면에 리스트로 렌더링
function renderTodos() {
  todoList.innerHTML = ''; // 기존 리스트 내부 비우기

  // todos 배열 돌면서 화면에 렌더링
  todos.forEach(function(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.isCompleted ? 'completed' : ''}`;

    let badgeClass = 'badge-daily';
    if (todo.category === '공부') badgeClass = 'badge-study';
    if (todo.category === '업무') badgeClass = 'badge-work';

    li.innerHTML = `
      <div class="todo-content">
        <input type="checkbox" class="todo-checkbox" id="${todo.id}" ${todo.isCompleted ? 'checked' : ''}>
        <label for="${todo.id}" class="todo-text">${todo.text}</label>
        <span class="badge ${badgeClass}">${todo.category}</span>
      </div>
      <button class="delete-button" data-id="${todo.id}">&times;</button>
    `;

    // 최신 글이 위로 오도록 삽입
    todoList.insertBefore(li, todoList.firstChild);
  });
}

// 3. 새로운 할 일 추가
function addTodo() {
  const todoText = todoInput.value.trim();
  const category = categorySelect.value;

  if (todoText === '') {
    alert('할 일을 입력해주세요!');
    return;
  }

  // 화면에 바로 렌더링 하지 않고, 데이터 객체를 만들어 배열에 추가
  const newTodo = {
    id: 'todo-' + Date.now(),
    text: todoText,
    category: category,
    isCompleted: false
  };

  todos.push(newTodo); // 배열에 추가
  saveLocalStorage(); // localStorage에 저장
  renderTodos(); // 화면 다시 렌더링

  todoInput.value = '';
  todoInput.focus();
}

// 4. 리스트 클릭 이벤트 처리 (체크박스 및 삭제)
todoList.addEventListener('click', function(e) {
  // 클릭된 요소가 삭제 버튼인 경우
  if (e.target.classList.contains('delete-button')) {
    const targetId = e.target.getAttribute('data-id');

    // 해당 id를 가진 데이터만 제외하고 새로운 배열 생성
    todos = todos.filter(todo => todo.id !== targetId);

    saveLocalStorage();
    renderTodos();
  }

  // 클릭된 요소가 체크박스인 경우
  if (e.target.classList.contains('todo-checkbox')) {
    const targetId = e.target.id;
    
    todos = todos.map(todo => {
      if (todo.id === targetId) {
        return { ...todo, isCompleted: e.target.checked };
      }
      return todo;
    });

    saveLocalStorage();
    renderTodos();
  }
});

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
  displayCurrentDate();
  renderTodos(); // 첫 로드 시 localStorage에 있던 데이터 렌더링
});

addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTodo();
  }
});