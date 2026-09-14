const schedule = [
  ['ATP','ATP','RECESS','LS&PC','LH','RECESS','MIS1','FoAI&DS(T)'],
  ['MIS1(T)','FoAI&DS','RECESS','CIS','ATP','RECESS','CISL/ITW','CISL/ITW'],
  ['CIS','FoAI&DS','RECESS','EG&CAD','EG&CAD','RECESS','SA','ATP'],
  ['CISL/ITW','CISL/ITW','RECESS','LS&PC','ATP','RECESS','LS','MIS1'],
  ['FoAI&DS','CIS','RECESS','EG&CAD','EG&CAD','MIS1']
]

const day = new Date().getDay() - 1;

function getClassHour(isFriday = false){
  const time = Number(`
    ${
      new Date().getHours()
    }${
      String(new Date().getMinutes()).padStart(2, '0')
    }
  `)
  console.log(time)

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

function updateSubject(){
  if(day == -1 || day == 5) {
    subjectDiv.textContent = 'No Class'
    return
  }
  const classHour = getClassHour()
  subject = schedule[day][classHour] === undefined ? 'No Class' : schedule[day][classHour]
  if(subjectDiv.textContent == subject) return
  subjectDiv.textContent = subject
}


updateSubject()

setInterval(updateSubject, 2000)
