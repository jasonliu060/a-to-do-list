const today = new Date();
const curYear = today.getFullYear();
const curMonthNum = today.getMonth();
const curDate = today.getDate();
const curDay = today.getDay();

// enable months[curMonthNum] to change month format
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


// enable using < > to move calendar to last month and next month
const monthCalDateObj = new Date(curYear, curMonthNum, 1);
document.querySelector('.js-last-month').addEventListener('click', () => {
  monthCalDateObj.setFullYear(monthCalDateObj.getFullYear(), monthCalDateObj.getMonth() - 1)
  getDates(monthCalDateObj.getMonth());
  displayMonthCalendar(monthCalDateObj.getFullYear(), monthCalDateObj.getMonth(), monthCalDateObj.getDate(), monthCalDateObj.getDay());
})
document.querySelector('.js-next-month').addEventListener('click', () => {
  monthCalDateObj.setFullYear(monthCalDateObj.getFullYear(), monthCalDateObj.getMonth() + 1)
  getDates(monthCalDateObj.getMonth());
  displayMonthCalendar(monthCalDateObj.getFullYear(), monthCalDateObj.getMonth(), monthCalDateObj.getDate(), monthCalDateObj.getDay());
})

displayMonthCalendar(curYear, curMonthNum, curDate, curDay);
displayWeekCalendar(curYear, curMonthNum, curDate, curDay);

// input: month(number format) 
// output: number of days in the month
function getDates(year, month) {
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


// generate calendar month and year, generate html inside the grid
function displayMonthCalendar(year, month, date, day) {
  document.querySelector('.js-month-year').innerHTML = `${months[month]} ${year}`;
  let dateHTML = `
  <div>Sun</div>
  <div>Mon</div>
  <div>Tue</div>
  <div>Wed</div>
  <div>Thu</div>
  <div>Fri</div>
  <div>Sat</div>
  ${'<div></div>'.repeat(getDayOfFirst(date, day))}
  `;
  for (let i = 1; i < (getDates(year, month) + 1); i++) {
    dateHTML += `<div>${i}</div>`
  }
  document.querySelector('.js-dates').innerHTML = dateHTML;
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
  let html = '';
  for (let i = 0; i < 7; i ++){
    const oneDay = new Date();
    oneDay.setFullYear(theSunday.getFullYear(),theSunday.getMonth(),theSunday.getDate() + i);
    html += `<th>${oneDay.getDate()}</th>`;
  }
  document.querySelector('.js-week-calendar-date').innerHTML = html;
}