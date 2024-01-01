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
function selectCalendar(calendarSwitcher) {
  switch (calendarSwitcher) {
    case 'month':
      document.querySelector('.month-calendar').style.display = 'block';
      document.querySelector('.week-calendar').style.display = 'none';
      document.querySelector('.day-schedule').style.display = 'none';
      break;
    case 'week':
      document.querySelector('.month-calendar').style.display = 'none';
      document.querySelector('.week-calendar').style.display = 'block';
      document.querySelector('.day-schedule').style.display = 'none';
      break;
    case 'day':
      document.querySelector('.month-calendar').style.display = 'none';
      document.querySelector('.week-calendar').style.display = 'none';
      document.querySelector('.day-schedule').style.display = 'block';
      break;
  }
}


// enable using < > to move calendar to last month and next month
const calendarDateObject = new Date(curYear, curMonthNum, curDate);
document.querySelector('.js-last-month').addEventListener('click', () => {
  calendarDateObject.setFullYear(calendarDateObject.getFullYear(), calendarDateObject.getMonth() - 1)
  getDatesQuantity(calendarDateObject.getMonth());
  displayMonthCalendar(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate(), calendarDateObject.getDay());
})
document.querySelector('.js-next-month').addEventListener('click', () => {
  calendarDateObject.setFullYear(calendarDateObject.getFullYear(), calendarDateObject.getMonth() + 1)
  getDatesQuantity(calendarDateObject.getMonth());
  displayMonthCalendar(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate(), calendarDateObject.getDay());
})

// displayMonthCalendar(curYear, curMonthNum, curDate, curDay);
displayMonthCalendar(curYear, curMonthNum, curDate, curDay);
// displayWeekCalendar(curYear, curMonthNum, curDate, curDay);
// displayDaySchedule(curYear, curMonthNum, curDate, curDay);
selectCalendar('month');

// input: month(number format) 
// output: number of days in the month
function getDatesQuantity(year, month) {
  if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
    return 31;
  } else if (month === 3 || month === 5 || month === 8 || month === 10) {
    return 30;
  } else if (month === 1 && year % 4 === 0) {
    return 29;
  } else if (month === 1 && year % 4 !== 0) {
    return 28;
  }
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
    <div class="js-month-calendar-dates-row">
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
      dateHTML += `<div class="js-month-calendar-dates-row"><span class="js-month-calendar-date-element js-dates-${i - 1 + getDayOfFirst(date, day)}">${i}</span>`;
    } else {
      dateHTML += `<span class="js-month-calendar-date-element js-dates-${i - 1 + getDayOfFirst(date, day)}">${i}</span>`;
    }
  }
  document.querySelector('.js-month-calendar-dates').innerHTML = dateHTML;


  const rows = document.querySelectorAll('.js-month-calendar-dates-row')
  rows.forEach((row, index) => {
    row.index = index;
    row.addEventListener('click', clickToWeekOrDate);
  });

  const datesElements = document.querySelectorAll('.js-month-calendar-date-element');
  datesElements.forEach((datesElement, index) => {
    datesElement.addEventListener('mouseover', () => {
      rows.forEach((datasElement) => {
        datasElement.removeEventListener('click', clickToWeekOrDate);
      })
    })
    datesElement.addEventListener('click', () => {
      calendarDateObject.setFullYear(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), index + 1 - getDayOfFirst(calendarDateObject.getDate(), calendarDateObject.getDay()));
      displayDaySchedule(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate(), calendarDateObject.getDay())
    })
    datesElement.addEventListener('mouseout', () => {
      rows.forEach((row, index) => {
        row.index = index;
        row.addEventListener('click', clickToWeekOrDate);
      });
    })
  });
  selectCalendar('month');
  displayEvents(year, month, date, year, month, getDatesQuantity(year, month), 'month');
  console.log(calendarDateObject);
}


// when clicking date/week in the month calendar 
function clickToWeekOrDate(event) {
  calendarDateObject.setFullYear(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate());
  calendarDateObject.setFullYear(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), event.currentTarget.index * 7 + 1 - getDayOfFirst(calendarDateObject.getDate(), calendarDateObject.getDay()))
  displayWeekCalendar(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate(), calendarDateObject.getDay())
}


// enable using < > to move calendar to last week and next week
document.querySelector('.js-last-week').addEventListener('click', () => {
  calendarDateObject.setFullYear(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate() - 7);
  console.log(calendarDateObject);
  displayWeekCalendar(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate(), calendarDateObject.getDay());
})
document.querySelector('.js-next-week').addEventListener('click', () => {
  calendarDateObject.setFullYear(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate() + 7);
  console.log(calendarDateObject);
  displayWeekCalendar(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate(), calendarDateObject.getDay());
})

// determine the start and the end of the week, and display week calendar
function displayWeekCalendar(year, month, date, day) {
  const theSunday = new Date();
  theSunday.setFullYear(year, month, date - day);
  console.log(theSunday);
  const theSaturday = new Date();
  theSaturday.setFullYear(year, month, date - day + 6);
  console.log(theSaturday);
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
      displayDaySchedule(oneDay.getFullYear(), oneDay.getMonth(), oneDay.getDate(), oneDay.getDay());
      console.log(calendarDateObject);
    })
  })
  selectCalendar('week');
  displayEvents(year, month, date, year, month, date + 7, 'week');
}


// enable using < > to move day schedule to last day and next day
document.querySelector('.js-last-day').addEventListener('click', () => {
  calendarDateObject.setFullYear(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate() - 1);
  console.log(calendarDateObject);
  displayDaySchedule(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate(), calendarDateObject.getDay());
})
document.querySelector('.js-next-day').addEventListener('click', () => {
  calendarDateObject.setFullYear(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate() + 1);
  console.log(calendarDateObject);
  displayDaySchedule(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate(), calendarDateObject.getDay());
})

// display day schedule
function displayDaySchedule(year, month, date, day) {
  document.querySelector('.js-day-of-day-schedule').innerHTML = `${date} ${months[month]} ${year}`;
  calendarDateObject.setFullYear(year, month, date);
  selectCalendar('day');
  displayEvents(year, month, date, year, month, date + 1, 'day');
}


// enable getting back from week to month, from day to week, from day to month
document.querySelector('.week-to-month').addEventListener('click', () => {
  calendarDateObject.setFullYear(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), 1);
  displayMonthCalendar(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate(), calendarDateObject.getDay());
  console.log(calendarDateObject);
})
document.querySelector('.day-to-month').addEventListener('click', () => {
  calendarDateObject.setFullYear(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), 1);
  displayMonthCalendar(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate(), calendarDateObject.getDay());
  console.log(calendarDateObject);
})
document.querySelector('.day-to-week').addEventListener('click', () => {
  calendarDateObject.setFullYear(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate() - calendarDateObject.getDay());
  displayWeekCalendar(calendarDateObject.getFullYear(), calendarDateObject.getMonth(), calendarDateObject.getDate(), calendarDateObject.getDay());
  console.log(calendarDateObject);
})


// display events
function displayEvents(year1, month1, date1, year2, month2, date2, calendar) {
  const d = new Date();
  d.setFullYear(year1, month1, date1);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  let x1 = d.getTime();
  d.setFullYear(year2, month2, date2);
  let x2 = d.getTime();
  let html = '';
  theList.forEach((event) => {
    const date = new Date(event.datetime);
    if (x1 < event.datetime && event.datetime < x2) {
      console.log(x1, x2, event.datetime);
      html += `
      ${event.name} 
      ${String("0" + date.getDate()).slice(-2)}/${String("0" + date.getMonth() + 1).slice(-2)}/${date.getFullYear()}
      ${date.getHours()}:${String("0" + date.getMinutes()).slice(-2)}
      <button class="remove-button">remove</button><br>
    `;
    } else {
      console.log('no event')
    }
  })
  switch (calendar) {
    case 'month':
      document.querySelector('.month-calendar-events').innerHTML = html;
      document.querySelector('.week-calendar-events').innerHTML = '';
      document.querySelector('.day-schedule-events').innerHTML = '';
      break;
    case 'week':
      document.querySelector('.month-calendar-events').innerHTML = '';
      document.querySelector('.week-calendar-events').innerHTML = html;
      document.querySelector('.day-schedule-events').innerHTML = '';
      break;
    case 'day':
      document.querySelector('.month-calendar-events').innerHTML = '';
      document.querySelector('.week-calendar-events').innerHTML = '';
      document.querySelector('.day-schedule-events').innerHTML = html;
      break;
  }
  document.querySelectorAll('.remove-button').forEach((removeButton, index) => {
    removeButton.addEventListener('click', () => {
      theList.splice(index, 1);
      setTheList();
      displayEvents(year1, month1, date1, year2, month2, date2, calendar);
    })
  })
}

// store theList into local storage, read theList from local storage
function setTheList() {
  localStorage.setItem('theList', JSON.stringify(theList));
}