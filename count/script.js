const countdownElement = document.getElementById('countdown');

const dday = new Date(2030,7,10).getTime();

console.log(new Date())

const units = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];

function timeUntilDday() {

  const now = new Date().getTime();

  const diff = dday - now;


  const time = {}

  time.years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  time.months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) % 12;
  time.days = Math.floor(diff / (1000 * 60 * 60 * 24)) % 30;
  time.hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  time.minutes = Math.floor(diff / (1000 * 60)) % 60;
  time.seconds = Math.floor(diff / 1000) % 60;

  return time;
}

function updateCountdown() {
  const time = timeUntilDday();
  units.forEach(unit => {
    countdownElement.children[unit].children[0].textContent = time[unit]
  })
}

updateCountdown();

setInterval(() => {
  updateCountdown();
}, 1000);

