const date = new Date();
let curYear = date.getFullYear();
let curMonthNum = date.getMonth();
let curDate = date.getDate();
let curDay = date.getDay();

// enable months[curMonthNum] to change month format
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


// enable using < > to move calendar to last month and next month
document.querySelector('.js-last-month').addEventListener('click', () => {
  if (curMonthNum === 0) {
    curMonthNum = 11;
    curYear--;
  } else {
    curMonthNum--;
  }
  const newDate = new Date(curYear,curMonthNum,1)
  curYear = newDate.getFullYear();
  curMonthNum = newDate.getMonth();
  curDate = newDate.getDate();
  curDay = newDate.getDay();
  getDates(curMonthNum);
  displayCalendar();
})
document.querySelector('.js-next-month').addEventListener('click', () => {
  if (curMonthNum === 11) {
    curMonthNum = 0;
    curYear++;
  } else {
    curMonthNum++;
  }
  const newDate = new Date(curYear,curMonthNum,1)
  curYear = newDate.getFullYear();
  curMonthNum = newDate.getMonth();
  curDate = newDate.getDate();
  curDay = newDate.getDay();
  displayCalendar();
})

displayCalendar();


// input: month(number format) 
// output: number of days in the month
function getDates(month) {
  let datesCurMonth = 0;
  if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
    datesCurMonth = 31;
  } else if (month === 3 || month === 5 || month === 8 || month === 10) {
    datesCurMonth = 30;
  } else if (month === 1 && curYear % 4 === 0) {
    datesCurMonth = 29;
  } else if (month === 1 && curYear % 4 !== 0) {
    datesCurMonth = 28;
  }
  return datesCurMonth;
}


// get the day of the 1st of this month
function getDayOfFirst(date, day) {
  return ((day - (date % 7)) + 8) % 7
}


// generate calendar month and year, generate html inside the grid
function displayCalendar() {
  document.querySelector('.js-month-year').innerHTML = `${months[curMonthNum]} ${curYear}`;
  let dateHTML = `
  <div>Sun</div>
  <div>Mon</div>
  <div>Tue</div>
  <div>Wed</div>
  <div>Thu</div>
  <div>Fri</div>
  <div>Sat</div>
  ${'<div></div>'.repeat(getDayOfFirst(curDate, curDay))}
  `;
  for (let i = 1; i < (getDates(curMonthNum) + 1); i++) {
    dateHTML += `<div>${i}</div>`
  }
  document.querySelector('.js-dates').innerHTML = dateHTML;
}

