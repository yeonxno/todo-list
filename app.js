// HTML 요소(DOM) 가져오기
const currentDate = document.getElementById('current-date');

// 오늘 날짜 표시하기
function displayCurrentDate() {
  const now = new Date();
  const options = { year:'numeric', month:'long', day:'numeric', weekday:'long' };
  currentDate.textContent = now.toLocaleDateString('ko-KR', options);
}

document.addEventListener('DOMContentLoaded', function() {
  displayCurrentDate();
});
