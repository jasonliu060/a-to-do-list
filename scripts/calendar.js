const theList = JSON.parse(localStorage.getItem('theList'));
console.log(theList);

const today = new Date();
const curYear = today.getFullYear();
const curMonthNum = today.getMonth();
const curDate = today.getDate();
const curDay = today.getDay();

// enable months[curMonthNum] to change month format
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']


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
  const date = new Date();
  date.setFullYear(year, month + 1, 0);
  return date.getDate();
}

// get the day of the 1st of this month
function getDayOfFirst(date, day) {
  return ((day - (date % 7)) + 8) % 7
}

function displayMonthCalendar(year, month, date, day) {
  document.querySelector('.js-month-year').innerHTML = `${months[month]} ${year}`;
  let dateHTML = `
    <div class="js-month-calendar-dates-title">
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
  let lastMonthDates = getDatesQuantity(year, month - 1);
  for (let i = 0 - (getDayOfFirst(date, day)); i < 0; i++) {
    dateHTML += `
      <span class="js-month-calendar-dates-element js-month-calendar-dates-element-last-month js-month-calendar-dates-${i + 1}">${lastMonthDates + i + 1}</span>
    `;
  }
  for (let i = 1; i < (getDatesQuantity(year, month) + 1); i++) {
    if ((i + getDayOfFirst(date, day)) % 7 === 0) {
      dateHTML += `<span class="js-month-calendar-dates-element js-month-calendar-dates-${i - 1 + getDayOfFirst(date, day)}">${i}</span></div>`;
    } else if ((i + getDayOfFirst(date, day)) % 7 === 1) {
      dateHTML += `<div class="js-month-calendar-dates-row"><span class="js-month-calendar-dates-element js-month-calendar-dates-${i - 1 + getDayOfFirst(date, day)}">${i}</span>`;
    } else {
      dateHTML += `<span class="js-month-calendar-dates-element js-month-calendar-dates-${i - 1 + getDayOfFirst(date, day)}">${i}</span>`;
    }
  }

  let lastWeekNextMonth = 7 - (getDayOfFirst(date, day) + getDatesQuantity(year, month)) % 7;
  for (let i = 1; i < (lastWeekNextMonth + 1); i++) {
    dateHTML += `<span class="js-month-calendar-dates-element js-month-calendar-dates-element-next-month  js-month-calendar-dates-${i - 1 + getDayOfFirst(date, day) + getDatesQuantity(year, month)}">${i}</span>`;
  }
  document.querySelector('.js-month-calendar-dates').innerHTML = dateHTML;

  if (year === curYear && month === curMonthNum) {
    const theDate = document.querySelector(`.js-month-calendar-dates-${curDate}`);
    theDate.classList.add('today');
  }

  const rows = document.querySelectorAll('.js-month-calendar-dates-row')
  rows.forEach((row, index) => {
    row.index = index;
    row.addEventListener('click', clickToWeekOrDate);
  });

  const datesElements = document.querySelectorAll('.js-month-calendar-dates-element');
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
  // console.log(event.currentTarget);
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
  const theSunday = new Date(year, month, date - day);
  // theSunday.setFullYear();
  // console.log(theSunday);
  // console.log(theSunday.getTime());
  const theSaturday = new Date(year, month, date - day + 6);
  // console.log(theSaturday);
  // console.log(theSaturday.getTime());
  // theSaturday.setFullYear(year, month, date - day + 6);
  document.querySelector('.js-date-month-year-range').innerHTML = `${theSunday.getDate()} ${months[theSunday.getMonth()]} ${theSunday.getFullYear()} ~ ${theSaturday.getDate()} ${months[theSaturday.getMonth()]} ${theSaturday.getFullYear()}`;
  let html = `
    <div class="js-week-calendar-dates-title">
      <span>Sun</span>
      <span>Mon</span>
      <span>Tue</span>
      <span>Wed</span>
      <span>Thu</span>
      <span>Fri</span>
      <span>Sat</span>
    </div>
    <div class="js-week-calendar-dates-row">
  `;
  const oneDay = new Date();
  for (let i = 0; i < 7; i++) {
    oneDay.setFullYear(theSunday.getFullYear(), theSunday.getMonth(), theSunday.getDate() + i);
    html += `<span class="js-week-calendar-dates-element js-week-calendar-dates-${oneDay.getDate()}">${oneDay.getDate()}</span>`;
  }
  html += `</div>`;
  document.querySelector('.js-week-calendar-dates').innerHTML = html;
  if (theSunday.getTime() < today.getTime() && today.getTime() < theSaturday.getTime()) {
    document.querySelector(`.js-week-calendar-dates-${today.getDate()}`).classList.add('today');
  }
  document.querySelectorAll('.js-week-calendar-dates-element').forEach((weekCalendarDateElement, index) => {
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
  let html = '';
  html = `
    <div class="js-day-schedule-dates-title">
      <span>${days[day]}</span>
    </div>
    <div class="js-day-schedule-dates-row">
      <span class="js-day-schedule-dates-${date}">${date}</span>
    </div>`;
  document.querySelector('.js-day-schedule-dates').innerHTML = html;
  if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === date) {
    document.querySelector(`.js-day-schedule-dates-${date}`).classList.add('today');
  }
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
  const d = new Date(year1, month1, date1);
  let x1 = d.getTime();
  d.setFullYear(year2, month2, date2);
  let x2 = d.getTime();
  let html = '';
  const displayList = [];
  theList.forEach((event) => {
    if (x1 < event.datetime && event.datetime < x2) {
      displayList.push(event);
    } else {
      console.log('no event')
    }
    displayList.sort((a, b) => {
      if (a.datetime > b.datetime) {
        return 1;
      } else if (a.datetime < b.datetime) {
        return -1;
      } else {
        return 0;
      }
    });
  })
  displayList.forEach((event) => {
    const date = new Date(event.datetime);
    html += `<div class="month-calendar-events-element">
    ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${String("0" + date.getMinutes()).slice(-2)} ${event.name} <button class="remove-button">remove</button><div>
    `;
    switch (calendar) {
      case 'month':
        document.querySelector(`.js-month-calendar-dates-${date.getDate()}`).classList.add('event-day');
        break;
      case 'week':
        document.querySelector(`.js-week-calendar-dates-${date.getDate()}`).classList.add('event-day');
        break;
      case 'day':
        document.querySelector(`.js-day-schedule-dates-${date.getDate()}`).classList.add('event-day');
        break;
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
      const date = new Date(displayList[index].datetime);
      switch (calendar) {
        case 'month':
          document.querySelector(`.js-month-calendar-dates-${date.getDate()}`).classList.remove('event-day');
          break;
        case 'week':
          document.querySelector(`.js-week-calendar-dates-${date.getDate()}`).classList.remove('event-day');
          break;
        case 'day':
          document.querySelector(`.js-day-schedule-dates-${date.getDate()}`).classList.remove('event-day');
          break;
      }
      const theIndex = theList.findIndex(checkIndex);
      function checkIndex(event) {
        return event.id === displayList[index].id
      }
      theList.splice(theIndex, 1);
      setTheList();
      displayEvents(year1, month1, date1, year2, month2, date2, calendar);
    })
  })
}

// store theList into local storage, read theList from local storage
function setTheList() {
  localStorage.setItem('theList', JSON.stringify(theList));
}