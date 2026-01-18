const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const todayBar = document.getElementById('todayBar');

let currentDate = new Date();

function showToday() {
  const todayDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  todayBar.textContent = "Today: " + todayDate.toLocaleDateString('en-US', options);
}

function updateCalendar() {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  monthYearElement.textContent = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const firstDay = new Date(currentYear, currentMonth, 1);
  let firstDayOfWeek = firstDay.getDay();
  if (firstDayOfWeek === 0) firstDayOfWeek = 7; 

  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const totalDays = lastDay.getDate();

  let html = '';

  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  for (let i = firstDayOfWeek - 1; i > 0; i--) {
    html += `<div class="date inactive">${prevMonthLastDay - i + 1}</div>`;
  }


  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const today = new Date();
    const activeClass = (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    ) ? 'active' : '';
    html += `<div class="date ${activeClass}">${i}</div>`;
  }


  const totalDisplayed = (firstDayOfWeek - 1) + totalDays;
  const nextDays = (7 - (totalDisplayed % 7)) % 7;
  for (let i = 1; i <= nextDays; i++) {
    html += `<div class="date inactive">${i}</div>`;
  }

  datesElement.innerHTML = html;
  showToday();
}


prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  updateCalendar();
});
nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  updateCalendar();
});


updateCalendar();
