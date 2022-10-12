export default function updateDaysLeftText(daysLeft) {
  if (daysLeft < 0) {
    return "(Overdue)"
  } 
  if (daysLeft === null) {
    return ""
  }
  if (daysLeft > 1) {
    return "(" + daysLeft + " days left)"
  } 
  if (daysLeft === 0) {
    return "(Due Today)"
  }
  if (daysLeft === 1) {
    return "(Due Tomorrow)"
  }
}