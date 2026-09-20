const schedule = [
  ['ATP','ATP','RECESS','LS&PC','LH','RECESS','MIS1','FoAI&DS(T)'],
  ['MIS1(T)','FoAI&DS','RECESS','CIS','ATP','RECESS','CISL/ITW','CISL/ITW'],
  ['CIS','FoAI&DS','RECESS','EG&CAD','EG&CAD','RECESS','SA','ATP'],
  ['CISL/ITW','CISL/ITW','RECESS','LS&PC','ATP','RECESS','LS','MIS1'],
  ['FoAI&DS','CIS','RECESS','EG&CAD','EG&CAD','MIS1']
]

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday']

const array = [
  // 2026,8,18,12,39
]

if(!localStorage.getItem('view-mode')){
  localStorage.setItem('view-mode','hours')
}


function setupTable(){
  const tableContainer = document.getElementById('table-div')
  const table = document.createElement('table')
  const today = new Date().getDay() - 1

  for(let i=0; i<5; i++){
    const row = document.createElement('tr')
    const dayCell = document.createElement('td')
    dayCell.textContent = days[i]
    row.appendChild(dayCell)
    if(today===i) row.classList.add('today')

    for(let j=0; j<8; j++){
      const cell = document.createElement('td')
      cell.textContent = schedule[i][j] === undefined ? 'No Class' : schedule[i][j]
      row.appendChild(cell)
    }
    table.appendChild(row)

    if(localStorage.getItem('view-mode')=='table'){
      document.getElementById('hours-div').style.display = 'none';
      tableContainer.style.display = 'block';
    } else if(localStorage.getItem('view-mode')=='hours'){
      document.getElementById('hours-div').style.display = 'flex';
      tableContainer.style.display = 'none';
    }
  }


  tableContainer.appendChild(table)
}

setupTable()

document.getElementById('hours-div').addEventListener('click',()=>{
  document.getElementById('hours-div').style.display = 'none';
  document.getElementById('table-div').style.display = 'block';
  localStorage.setItem('view-mode','table')
})
document.getElementById('table-div').addEventListener('click',()=>{
  document.getElementById('hours-div').style.display = 'flex';
  document.getElementById('table-div').style.display = 'none';
  localStorage.setItem('view-mode','hours')
})


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

  return time 
}

const subjectDiv = document.getElementById('sub')
const subjectTwoDiv = document.getElementById('sub-two')



function updateSubject(){
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

  console.log(todayToNow)
  console.log(classHour, classHourTwo)
  console.log(nowDule)

  if(subjectDiv.textContent===nowDule.now.subject&&subjectTwoDiv.textContent===nowDule.next.subject) return

  subjectDiv.textContent = nowDule.now.subject
  subjectTwoDiv.textContent = nowDule.next.subject
}


updateSubject()

// setInterval(updateSubject, 5000)
