import { theList } from "./list.js";

const eventInput =  document.querySelector('.js-event-input');
const dateInput =  document.querySelector('.js-date-input');
const timeInput =  document.querySelector('.js-time-input');

// add event into theList when clicking add button
document.querySelector('.js-add-button').addEventListener('click', () => {
  theList.push({
    name: eventInput.value,
    date: dateInput.value,
    time: timeInput.value
  })
  displayList();
})

// display the events of theList
function displayList(){
  let html = '';   
  theList.forEach((event) => { 
    html += `${event.name} ${event.date} ${event.time}
      <button class="remove-button">remove</button><br>`;
  })
  document.querySelector('.js-to-do-list').innerHTML = html;
  document.querySelectorAll('.remove-button').forEach((removeButton,index)=>{
    removeButton.addEventListener('click', () => {
      theList.splice(index,1);
      displayList();
    })
  })
}


