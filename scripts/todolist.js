const theList = JSON.parse(localStorage.getItem('theList'));
const dateObj = new Date();

console.log(theList);



const eventInput = document.querySelector('.js-event-input');
const dateTimeInput = document.querySelector('.js-date-input');
// const timeInput = document.querySelector('.js-time-input');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

displayList();

// console.log(document.querySelector('.js-add-button'));

// add event into theList when clicking add button
let id = 0;
document.querySelector('.js-add-button').addEventListener('click', () => {
  dateObj.setTime(dateTimeInput.valueAsNumber + dateObj.getTimezoneOffset() * 60000);
  console.log(dateObj);
  if (theList.length === 0) {
    id = 0;
  } else {
    id = theList[theList.length - 1].id + 1;
  }
  theList.push({
    id: id,
    name: eventInput.value,
    datetime: dateObj.getTime()
  })
  setTheList();
  displayList();
})

// display the events of theList
function displayList() {
  let html = '';
  if (theList.length === 0) {
    document.querySelector('.js-to-do-list').innerHTML = html;
  } else {
    theList.forEach((event) => {
      const date = new Date(event.datetime)
      
      html += `
      <div class="events-element">${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${String("0" + date.getMinutes()).slice(-2)} ${event.name} <button class="remove-button">remove</button></div>
      `;
    })
    document.querySelector('.js-to-do-list').innerHTML = html;
  }
  document.querySelectorAll('.remove-button').forEach((removeButton, index) => {
    removeButton.addEventListener('click', () => {
      theList.splice(index, 1);
      setTheList();
      displayList();
    })
  })

}

// store theList into local storage, read theList from local storage
function setTheList() {
  localStorage.setItem('theList', JSON.stringify(theList));
}