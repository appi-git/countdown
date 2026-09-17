const schedule = [
  ['ATP','ATP','RECESS','LS&PC','LH','RECESS','MIS1','FoAI&DS(T)'],
  ['MIS1(T)','FoAI&DS','RECESS','CIS','ATP','RECESS','CISL/ITW','CISL/ITW'],
  ['CIS','FoAI&DS','RECESS','EG&CAD','EG&CAD','RECESS','SA','ATP'],
  ['CISL/ITW','CISL/ITW','RECESS','LS&PC','ATP','RECESS','LS','MIS1'],
  ['FoAI&DS','CIS','RECESS','EG&CAD','EG&CAD','MIS1']
]

const days = ['Monday','Tuesday','Wednesday','Thursday','Friday']

const array = []

const day = new Date(...array).getDay() - 1;

function setupTable(){
  const tableContainer = document.getElementById('table-div')
  const table = document.createElement('table')

  for(let i=0; i<5; i++){
    console.log(i, schedule[i])
    const row = document.createElement('tr')
    const dayCell = document.createElement('td')
    dayCell.textContent = days[i]
    row.appendChild(dayCell)
    if(day==i) row.classList.add('today')

    for(let j=0; j<8; j++){
      const cell = document.createElement('td')
      cell.textContent = schedule[i][j] === undefined ? 'No Class' : schedule[i][j]
      row.appendChild(cell)
    }
    table.appendChild(row)
  }


  tableContainer.appendChild(table)
}

setupTable()

document.getElementById('hours-div').addEventListener('click',()=>{
  document.getElementById('hours-div').style.display = 'none';
  document.getElementById('table-div').style.display = 'block';
})
document.getElementById('table-div').addEventListener('click',()=>{
  console.log(document.getElementById('table-div').style.display)
  document.getElementById('hours-div').style.display = 'flex';
  document.getElementById('table-div').style.display = 'none';
})


function getClassHour(isFriday = false){
  const time = Number(`
    ${
      new Date(...array).getHours()
    }${
      String(new Date(...array).getMinutes()).padStart(2, '0')
    }
  `)

  const delay = isFriday ? 5 : 0

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
  if(day == -1 || day == 5) {
    subjectDiv.textContent = 'No Class'
    return
  }
  const classHour = getClassHour()

  const subject = schedule[day][classHour] === undefined ? 'No Class' : schedule[day][classHour]
  console.log(classHour)
  const classHourTwo = classHour === 8 ? 0 : classHour + 1
  const dayTwo = classHourTwo === 0 && classHour === 8 ? day + 1 : day

  const subjectTwo = schedule[dayTwo][classHourTwo] === undefined ? 'No Class' : schedule[dayTwo][classHourTwo]

  if(subjectDiv.textContent == subject) return

  subjectDiv.textContent = subject
  subjectTwoDiv.textContent = subjectTwo
}


updateSubject()

setInterval(updateSubject, 2000)
