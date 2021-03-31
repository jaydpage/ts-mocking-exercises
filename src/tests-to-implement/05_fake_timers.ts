export function generateDayMessage() {
  const today = new Date()
  const day = today.getDay()
  const dayName = getDays()[day]
  const time = today.toLocaleTimeString("en-ZA", { hour12: true }).toUpperCase()
  return `[${time}]: Today is ${dayName}`
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
