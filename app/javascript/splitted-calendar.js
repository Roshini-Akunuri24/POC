currentDate = document.querySelector(".month-indicator"),
dategridTag = document.querySelector(".date-grid"),
PrevNextIcon = document.querySelectorAll(".icons span"),
todayButton = document.querySelector(".todayBtn"),
eventDay = document.querySelector(".event-day"),
eventDate = document.querySelector(".event-Date"),
eventsContainer = document.querySelector(".events");

date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
let activeDay;



months = ["January", "February", "March", "April","May","June","July",
          "August", "September","October","November","December"]

//default event array
eventsArr = [
  {
    firstDayofMonth: 09, //date
    currMonth: 01,
    currYear: 2023,
    events: {
      title: "Event 1",
      time: "10:00 AM",
    },
    title: "Event 2 ",
    time: "11:00 AM",
  },
  {
    firstDayofMonth: 24, //date
    currMonth: 05,
    currYear: 2023,
    events: {
      title: "My Birthday",
      time: "10:00 AM",
    }
  }
]
  
renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
  lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
  lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
  lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let buttonTag = "";

  for(let i = firstDayofMonth; i > 0; i--){
    buttonTag +=  `<div class = "inactive" >${lastDateofLastMonth - i + 1}</div>`;
  }

  for(let i = 1; i <= lastDateofMonth; i++){
    let event = false;
    eventsArr.forEach((eventObj) => {
      if(eventObj.firstDayofMonth === i && eventObj.currMonth === currMonth + 1 && eventObj.currYear === currYear )
      {
        event = true ;
      }
    });

    if( i === new Date().getDate() && currYear === new Date().getFullYear() && currMonth === new Date().getMonth() )
    {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);

      if(event) {
        buttonTag +=  `<button class="firstDayofMonth date event active" >${i}</button>`; //event date , added active
      } 
      else {
        buttonTag +=  `<button class="firstDayofMonth date active" >${i}</button>`; //present date, added active
      }
    } 
    //add remaining as it is
    else {
      if(event) {
        buttonTag +=  `<button class="firstDayofMonth event" >${i}</button>`;
      } else {
        buttonTag +=  `<button class="active" >${i}</button>`;
      }
    }    
  }

  for(let i = lastDayofMonth; i < 6; i++){
    buttonTag +=  `<button class="inactive" >${i - lastDayofMonth + 1}</button>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  dategridTag.innerHTML = buttonTag;
}
renderCalendar();


PrevNextIcon.forEach(icon => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if(currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});


todayButton.addEventListener("click", () => {
  date = new Date();
  currMonth = date.getMonth();
  currYear = date.getFullYear();
  renderCalendar();
});

addEventBtn = document.querySelector(".add-event"),
addEventContainer = document.querySelector(".add-event-wrapper"),
addEventCloseBtn = document.querySelector(".close"),
addEventTitle = document.querySelector(".event-name"),
addEventFrom = document.querySelector(".event-time-from"),
addEventTo = document.querySelector(".event-time-to");


addEventBtn.addEventListener("click", () => {
  addEventContainer.classList.toggle("active");
});
addEventCloseBtn.addEventListener("click", () => {
  addEventContainer.classList.remove("active");
});

document.addEventListener("click", (e) => {
  //clicko outside the add even will be closed.
  if(e.target !== addEventBtn && !addEventContainer.contains(e.target)){
    addEventContainer.classList.remove("active");
  }
});

//allow only 50chars on the title.
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 50);
});

//time format from 
addEventFrom.addEventListener("input", (e) => {
  //remove extra or any number
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  //if 2 number entered auto add 
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  //dont let user add more than 5 char
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

//time format from 
addEventTo.addEventListener("input", (e) => {
  //remove extra or any number
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  //if 2 number entered auto add 
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  //dont let user add more than 5 char
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventFrom.value.slice(0, 5);
  }
});


jQuery(document).ready(function($) {

  if (window.history && window.history.pushState) {

    window.history.pushState('forward', null);

    $(window).on('popstate', function() {
      alert('Back button was pressed.');
    });
  }
});


function addListner() {
  buttonTag = document.querySelectorAll(".firstDayofMonth");
  buttonTag.forEach((firstDayofMonth) => {
   firstDayofMonth.addEventListener("click", (e) => {

    activeDay = Number(e.target.innerHTML);

     getActiveDay(e.target.innerHTML);
     updateEvents(e.target.innerHTML)
     //remove active
     buttonTag.forEach((firstDayofMonth) => {
       firstDayofMonth.classList.remove("active");
     });
     //if clicked prev-date or next-date switch to that month
     if (e.target.classList.contains("inactive")) {
       prevMonth();
       //add active to clicked day after the month is change
       setTimeout(() => {
         //add active where no prev-date or next-date
         const buttonTag = document.querySelectorAll(".firstDayofMonth");
         buttonTag.forEach((firstDayofMonth) => {
           if (
             !firstDayofMonth.classList.contains("inactive") &&
             firstDayofMonth.innerHTML === e.target.innerHTML
           ) {
             firstDayofMonth.classList.add("active");
           }
         });
       }, 100);
     } else if (e.target.classList.contains("inactive")) {
       nextMonth();
       //add active to clicked day afte month is changed
       setTimeout(() => {
         const buttonTag = document.querySelectorAll(".firstDayofMonth");
         buttonTag.forEach((firstDayofMonth) => {
           if (
             !firstDayofMonth.classList.contains("inactive") &&
             firstDayofMonth.innerHTML === e.target.innerHTML
           ) {
             firstDayofMonth.classList.add("active");
           }
         });
       }, 100);
     } else {
       e.target.classList.add("active");
     }
   });
 });
}

function getActiveDay(currentDate) {
  firstDayofMonth = new Date(currYear, currMonth, currentDate);
  firstDayofMonthName = firstDayofMonth.toString().split(" ")[0]; 
  eventDay.innerHTML = firstDayofMonthName;
  eventDate.innerHTML = `${currentDate} ${months[currMonth]} ${currYear}`;
 }

function updateEvents(currentDate) {
  events = "";
  eventsArr.forEach((event) => {
    if( currentDate === event.firstDayofMonth && currMonth === event.currMonth && currYear === event.currYear)
    {
      event.events.forEach((event) => {
        events +=`
        <div class="event">
          <div class="title">
            <i class="fas fa-circle"></i>
            <h3 class="event-title">${event.title}</h3>
          </div>
          <div class="event-time">${event.time}</div>
        </div>`;
      });
    }
  });
  if((events = "")){
    events = `<div class = "no-events">
              <h3> No events </h3>
            </div>`;
  }
  console.log(events);
  eventsContainer.innerHTML = events;
};