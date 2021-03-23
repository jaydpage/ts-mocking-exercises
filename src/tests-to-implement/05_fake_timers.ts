export function generateDayMessage() {
  const today = new Date()
  const day = today.getDay()
  const dayName = getDays()[day]
  return `[${today.toLocaleTimeString('en-ZA')}]: Today is ${dayName}`
}

function getDays() {
  return [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
}
