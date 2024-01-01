const theList = JSON.parse(localStorage.getItem('theList'));
const dateObj = new Date();

console.log(theList);
displayList();


const eventInput = document.querySelector('.js-event-input');
const dateTimeInput = document.querySelector('.js-date-input');
// const timeInput = document.querySelector('.js-time-input');


console.log(document.querySelector('.js-add-button'));

// add event into theList when clicking add button
document.querySelector('.js-add-button').addEventListener('click', () => {
  dateObj.setTime(dateTimeInput.valueAsNumber + dateObj.getTimezoneOffset() * 60000);
  console.log(dateObj);
  theList.push({
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
        ${event.name} 
        ${String("0" + date.getDate()).slice(-2)}/${String("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}
        ${date.getHours()}:${String("0" + date.getMinutes()).slice(-2)}
        <button class="remove-button">remove</button><br>
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