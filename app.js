// HTML 요소(DOM) 가져오기
const currentDate = document.getElementById('current-date');
const todoList = document.getElementById('todo-list');

// 할 일 데이터를 담을 배열, localStorage에서 가져오거나 없으면 빈 배열
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// 오늘 날짜 표시하기
function displayCurrentDate() {
  const now = new Date();
  const options = { year:'numeric', month:'long', day:'numeric', weekday:'long' };
  currentDate.textContent = now.toLocaleDateString('ko-KR', options);
}

// todos 배열을 화면에 리스트로 렌더링
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
    `;

    // 최신 글이 위로 오도록 삽입
    todoList.insertBefore(li, todoList.firstChild);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  displayCurrentDate();
  renderTodos(); // 첫 로드 시 localStorage에 있던 데이터 렌더링
});
