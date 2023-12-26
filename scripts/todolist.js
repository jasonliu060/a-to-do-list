const theList = JSON.parse(localStorage.getItem('theList'));

console.log(theList);
displayList();


const eventInput = document.querySelector('.js-event-input');
const dateInput = document.querySelector('.js-date-input');
const timeInput = document.querySelector('.js-time-input');


console.log(document.querySelector('.js-add-button'));

// add event into theList when clicking add button
document.querySelector('.js-add-button').addEventListener('click', () => {
  theList.push({
    name: eventInput.value,
    date: dateInput.value,
    time: timeInput.value
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
      html += `${event.name} ${event.date} ${event.time}
        <button class="remove-button">remove</button><br>`;
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