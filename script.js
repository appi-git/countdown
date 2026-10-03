const schedule = [
  ['ATP','ATP','RECESS','LS&PC','LH','RECESS','MIS1','FoAI&DS(T)'],
  ['MIS1(T)','FoAI&DS','RECESS','CIS','ATP','RECESS','CISL/ITW','CISL/ITW'],
  ['CIS','FoAI&DS','RECESS','EG&CAD','EG&CAD','RECESS','SA','ATP'],
  ['CISL/ITW','CISL/ITW','RECESS','LS&PC','ATP','RECESS','LS','MIS1'],
  ['FoAI&DS','CIS','RECESS','EG&CAD','EG&CAD','MIS1']
]

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday']

const array = [
    // 2026,9,9,8,54
]

if(!localStorage.getItem('view-mode')){
  localStorage.setItem('view-mode','hours')
}

function getClassHour(toNow, isFriday = false){
  const time = Number(`
    ${
      toNow.getHours()
    }${
      String(toNow.getMinutes()).padStart(2, '0')
    }
  `)

  const delay = isFriday ? 5 : 0

  if(time>1240&&isFriday) return 8

  switch (true) {
    case time<800:
      return -1
    case time>=800 && time<855:
      return 0
    case time>=855 && time<945+delay:
      return 1
    case time>=945+delay && time<1005+delay:
      return 2
    case time>=1005+delay && time<1055+delay:
      return 3
    case time>=1055+delay && time<1145+delay:
      return 4
    case time>=1145+delay && time<1200+delay*8:
      return 5
    case time>=1200 && time<1250:
      return 6
    case time>=1250 && time<1340:
      return 7
    case time>=1340:
      return 8
  }
}

function setupTable(isPortrait){
  const tableContainer = document.getElementById('table-div-table-div')
   
  tableContainer.replaceChildren()

  const table = document.createElement('table')
  const todayToNow = new Date(...array)
  const today = todayToNow.getDay()-1

  for(let i=0; i<5; i++){
    const row = document.createElement('tr')
    const dayCell = document.createElement('td')
    dayCell.textContent = days[i]
    row.dataset.day = days[i].toLowerCase()
    row.appendChild(dayCell)
    if(today===i) {row.classList.add('today-table');row.classList.add('selected-table')}
    else if((today===-1||today===5)&&i===0) row.classList.add('selected-table')

    for(let j=0; j<8; j++){
      const cell = document.createElement('td')
      cell.textContent = schedule[i][j] === undefined ? 'No Class' : schedule[i][j]
      if(
        getClassHour(todayToNow)===j
        &&today===i
        &&schedule[i]
        &&schedule[i][j]
      ){cell.classList.add('tonow')}
      row.appendChild(cell)
    }
    table.appendChild(row)

  }
  tableContainer.appendChild(table)
}
setupTable()

function setupNavButtons(){
  const navButtonContainer = document.getElementById('nav-buttons-div')
  const today = new Date(...array).getDay()-1

  for(const day of days){
    const div = document.createElement('div')
    div.classList.add('nav-button')
    div.dataset.day=day.toLowerCase()
    if(days[today]===day){
      div.classList.add('today-nav','selected-nav')
    } else if((today===-1||today===5)&&day==='Monday'){
      div.classList.add('selected-nav')
    }
    navButtonContainer.appendChild(div)
  }

  navButtonContainer.addEventListener('click',(event)=>{
    const selectedTable = document.querySelector('.selected-table')
    const selectedNav = document.querySelector('.selected-nav')
    const tableContainer = document.getElementById('table-div-table-div')
    const rows = tableContainer.querySelectorAll('tr')
    rows.forEach(row=>{
      if(row.dataset.day===event.target.dataset.day){
        selectedTable.classList.remove('selected-table')
        row.classList.add('selected-table')
        selectedNav.classList.remove('selected-nav')
        event.target.classList.add('selected-nav')
      }
    })
  })
}
setupNavButtons()

document.getElementById('main-container').addEventListener('click',(event)=>{
  if(event.target.classList.contains('nav-button')||event.target.id==='nav-buttons-div') return
  if(localStorage.getItem('view-mode')=='table'){
    document.getElementById('hours-div').style.display = 'flex';
    document.getElementById('table-div').style.display = 'none';
    localStorage.setItem('view-mode','hours')
  } else if(localStorage.getItem('view-mode')=='hours'){
    document.getElementById('hours-div').style.display = 'none';
    document.getElementById('table-div').style.display = 'flex';
    localStorage.setItem('view-mode','table')
  }
  updateSubject()
})

document.addEventListener('keydown',(event)=>{
  if(event.key==='s') document.getElementById('main-container').click() 
})


function updateHour(){
  const subjectDiv = document.getElementById('sub')
  const subjectTwoDiv = document.getElementById('sub-two')

  const todayToNow = new Date(...array);
  const day = todayToNow.getDay() - 1;
  const classHour = getClassHour(todayToNow, day===4)
  const nowDule = {now:{},next:{}}
  nowDule.now.day=day;

  if(schedule[day]&&schedule[day][classHour]){
    nowDule.now.subject = schedule[day][classHour];
  } else{
    nowDule.now.subject = 'No Class'
  }

  const classHourTwo = classHour === 8 ? 0 : classHour + 1;
  if(classHourTwo===0&&classHour===8){
    nowDule.next.day = day<=3 ? day + 1 : 0
  } else{
    nowDule.next.day = day
  }

  if(schedule[nowDule.next.day]&&schedule[nowDule.next.day][classHourTwo]){
    nowDule.next.subject = schedule[nowDule.next.day][classHourTwo];
  } else{
    nowDule.next.subject = 'No Class'
  }

  if(subjectDiv.textContent===nowDule.now.subject&&subjectTwoDiv.textContent===nowDule.next.subject) return

  subjectDiv.textContent = nowDule.now.subject
  subjectTwoDiv.textContent = nowDule.next.subject
}

function updateTable(){
  const todayToNow = new Date(...array)
  const classHour = getClassHour(todayToNow)+1
  const tableContainer = document.getElementById('table-div-table-div')
  const isPortrait = window.matchMedia('(orientation:portrait)').matches

  const today = tableContainer.querySelector('.today-table') ?? -1

  if(today===-1) return

  const toNow = today.querySelector('.tonow') ?? -1

  if(toNow===today.children[classHour]) return
  setupTable(isPortrait)
}




function updateSubject(){
  const viewMode = localStorage.getItem('view-mode')
  if(viewMode==='table'){
    document.getElementById('hours-div').style.display = 'none';
    document.getElementById('table-div').style.display = 'flex';
  } else if(viewMode==='hours'){
    document.getElementById('hours-div').style.display = 'flex';
    document.getElementById('table-div').style.display = 'none';
  }
  if(viewMode=='table') updateTable()
  else if (viewMode==='hours') updateHour()

}

updateSubject()

setInterval(updateSubject, 2000)
