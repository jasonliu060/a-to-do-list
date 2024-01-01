const theList = JSON.parse(localStorage.getItem('theList'));
console.log(theList);

const today = new Date();
const curYear = today.getFullYear();
const curMonthNum = today.getMonth();
const curDate = today.getDate();
const curDay = today.getDay();

// enable months[curMonthNum] to change month format
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


// switch between month -> 0 / week -> 1 / day -> 2
let calendarSwitcher = 0;
function selectCalendar() {
  switch (calendarSwitcher) {
    case 0:
      document.querySelector('.month-calendar').style.display = 'block';
      document.querySelector('.week-calendar').style.display = 'none';
      document.querySelector('.day-schedule').style.display = 'none';
      break;
    case 1:
      document.querySelector('.month-calendar').style.display = 'none';
      document.querySelector('.week-calendar').style.display = 'block';
      document.querySelector('.day-schedule').style.display = 'none';
      break;
    case 2:
      document.querySelector('.month-calendar').style.display = 'none';
      document.querySelector('.week-calendar').style.display = 'none';
      document.querySelector('.day-schedule').style.display = 'block';
      break;
  }
}


// enable using < > to move calendar to last month and next month
const monthCalDateObj = new Date(curYear, curMonthNum, 1);
document.querySelector('.js-last-month').addEventListener('click', () => {
  monthCalDateObj.setFullYear(monthCalDateObj.getFullYear(), monthCalDateObj.getMonth() - 1)
  getDatesQuantity(monthCalDateObj.getMonth());
  displayMonthCalendar(monthCalDateObj.getFullYear(), monthCalDateObj.getMonth(), monthCalDateObj.getDate(), monthCalDateObj.getDay());
})
document.querySelector('.js-next-month').addEventListener('click', () => {
  monthCalDateObj.setFullYear(monthCalDateObj.getFullYear(), monthCalDateObj.getMonth() + 1)
  getDatesQuantity(monthCalDateObj.getMonth());
  displayMonthCalendar(monthCalDateObj.getFullYear(), monthCalDateObj.getMonth(), monthCalDateObj.getDate(), monthCalDateObj.getDay());
})

// displayMonthCalendar(curYear, curMonthNum, curDate, curDay);
displayMonthCalendar(curYear, curMonthNum, curDate, curDay);
displayWeekCalendar(curYear, curMonthNum, curDate, curDay);
displayDaySchedule(curYear, curMonthNum, curDate, curDay);
selectCalendar();

// input: month(number format) 
// output: number of days in the month
function getDatesQuantity(year, month) {
  let datesCurMonth = 0;
  if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
    datesCurMonth = 31;
  } else if (month === 3 || month === 5 || month === 8 || month === 10) {
    datesCurMonth = 30;
  } else if (month === 1 && year % 4 === 0) {
    datesCurMonth = 29;
  } else if (month === 1 && year % 4 !== 0) {
    datesCurMonth = 28;
  }
  return datesCurMonth;
}


// get the day of the 1st of this month
function getDayOfFirst(date, day) {
  return ((day - (date % 7)) + 8) % 7
}

function displayMonthCalendar(year, month, date, day) {
  document.querySelector('.js-month-year').innerHTML = `${months[month]} ${year}`;
  let dateHTML = `
    <div>
      <span>Sun</span>
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
    </div>
    <div class="js-dates-row">
  `;
  for (let i = 0; i < getDayOfFirst(date, day); i++) {
    dateHTML += `
      <span class="js-month-calendar-date-element js-dates-${i}">&nbsp;</span>
    `;
  }
  for (let i = 1; i < (getDatesQuantity(year, month) + 1); i++) {
    if ((i + getDayOfFirst(date, day)) % 7 === 0) {
      dateHTML += `<span class="js-month-calendar-date-element js-dates-${i - 1 + getDayOfFirst(date, day)}">${i}</span></div>`;
    } else if ((i + getDayOfFirst(date, day)) % 7 === 1) {
      dateHTML += `<div class="js-dates-row"><span class="js-month-calendar-date-element js-dates-${i - 1 + getDayOfFirst(date, day)}">${i}</span>`;
    } else {
      dateHTML += `<span class="js-month-calendar-date-element js-dates-${i - 1 + getDayOfFirst(date, day)}">${i}</span>`;
    }
  }
  console.log(dateHTML);
  document.querySelector('.js-dates').innerHTML = dateHTML;

  // when clicking date/week in the month calendar 
  const getWeekFromMonthDateObj = new Date();
  function checkClick(event) {
    getWeekFromMonthDateObj.setFullYear(monthCalDateObj.getFullYear(), monthCalDateObj.getMonth(), event.currentTarget.index * 7 + 1 - getDayOfFirst(monthCalDateObj.getDate(), monthCalDateObj.getDay()))
    console.log(getWeekFromMonthDateObj);
    displayWeekCalendar(getWeekFromMonthDateObj.getFullYear(), getWeekFromMonthDateObj.getMonth(), getWeekFromMonthDateObj.getDate(),getWeekFromMonthDateObj.getDay())
    calendarSwitcher = 1;
    selectCalendar();
  }
  const rows = document.querySelectorAll('.js-dates-row')
  rows.forEach((row, index) => {
    row.index = index;
    row.addEventListener('click', checkClick);
  });

  const datesElements = document.querySelectorAll('.js-month-calendar-date-element');
  datesElements.forEach((datesElement, index) => {
    datesElement.addEventListener('mouseover', () => {
      rows.forEach((datasElement) => {
        datasElement.removeEventListener('click', checkClick);
      })
    })
    datesElement.addEventListener('click', () => {
      getWeekFromMonthDateObj.setFullYear(monthCalDateObj.getFullYear(),monthCalDateObj.getMonth(),index + 1 - getDayOfFirst(monthCalDateObj.getDate(),monthCalDateObj.getDay()));
      console.log(getWeekFromMonthDateObj);
      displayDaySchedule(getWeekFromMonthDateObj.getFullYear(),getWeekFromMonthDateObj.getMonth(),getWeekFromMonthDateObj.getDate(),getWeekFromMonthDateObj.getDay())
      calendarSwitcher = 2;
      selectCalendar();
    })
    datesElement.addEventListener('mouseout', () => {
      rows.forEach((row, index) => {
        row.index = index;
        row.addEventListener('click', checkClick);
      });
    })
  });
}


// enable using < > to move calendar to last week and next week
const weekCalDateObj = new Date();
document.querySelector('.js-last-week').addEventListener('click', () => {
  weekCalDateObj.setFullYear(weekCalDateObj.getFullYear(), weekCalDateObj.getMonth(), weekCalDateObj.getDate() - 7);
  console.log(weekCalDateObj);
  displayWeekCalendar(weekCalDateObj.getFullYear(), weekCalDateObj.getMonth(), weekCalDateObj.getDate(), weekCalDateObj.getDay());
})
document.querySelector('.js-next-week').addEventListener('click', () => {
  weekCalDateObj.setFullYear(weekCalDateObj.getFullYear(), weekCalDateObj.getMonth(), weekCalDateObj.getDate() + 7);
  console.log(weekCalDateObj);
  displayWeekCalendar(weekCalDateObj.getFullYear(), weekCalDateObj.getMonth(), weekCalDateObj.getDate(), weekCalDateObj.getDay());
})

// determine the start and the end of the week, and display week calendar
function displayWeekCalendar(year, month, date, day) {
  const theSunday = new Date();
  theSunday.setFullYear(year, month, date - day);
  const theSaturday = new Date();
  theSaturday.setFullYear(year, month, date - day + 6);
  // console.log(theSaturday);
  document.querySelector('.js-date-month-year-range').innerHTML = `${theSunday.getDate()} ${months[theSunday.getMonth()]} ${theSunday.getFullYear()} ~ ${theSaturday.getDate()} ${months[theSaturday.getMonth()]} ${theSaturday.getFullYear()}`;
  let html = `
    <div>
      <span>Sun</span>
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
    </div>
    <div class="js-week-calendar-row">
  `;
  const oneDay = new Date();
  for (let i = 0; i < 7; i++) {
    oneDay.setFullYear(theSunday.getFullYear(), theSunday.getMonth(), theSunday.getDate() + i);
    html += `<span class="js-week-calendar-date-element">${oneDay.getDate()}</span>`;
  }
  html += `</div>`
  document.querySelector('.js-week-calendar-dates').innerHTML = html;
  document.querySelectorAll('.js-week-calendar-date-element').forEach((weekCalendarDateElement, index) => {
    weekCalendarDateElement.addEventListener('click', () => {
      oneDay.setFullYear(theSunday.getFullYear(), theSunday.getMonth(), theSunday.getDate() + index);
      displayDaySchedule(oneDay.getFullYear(),oneDay.getMonth(),oneDay.getDate(),oneDay.getDay());
      calendarSwitcher = 2;
      selectCalendar();
    })
  })
}


// enable using < > to move day schedule to last day and next day
const dayScheduleDateObj = new Date();
document.querySelector('.js-last-day').addEventListener('click', () => {
  dayScheduleDateObj.setFullYear(dayScheduleDateObj.getFullYear(), dayScheduleDateObj.getMonth(), dayScheduleDateObj.getDate() - 1);
  console.log(dayScheduleDateObj);
  displayDaySchedule(dayScheduleDateObj.getFullYear(), dayScheduleDateObj.getMonth(), dayScheduleDateObj.getDate(), dayScheduleDateObj.getDay());
})
document.querySelector('.js-next-day').addEventListener('click', () => {
  dayScheduleDateObj.setFullYear(dayScheduleDateObj.getFullYear(), dayScheduleDateObj.getMonth(), dayScheduleDateObj.getDate() + 1);
  console.log(dayScheduleDateObj);
  displayDaySchedule(dayScheduleDateObj.getFullYear(), dayScheduleDateObj.getMonth(), dayScheduleDateObj.getDate(), dayScheduleDateObj.getDay());
})

// display day schedule
function displayDaySchedule(year, month, date, day) {
  document.querySelector('.js-day-of-day-schedule').innerHTML = `${date} ${months[month]} ${year}`;
}