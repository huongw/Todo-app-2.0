export default function validateDate(inputDateValue) {
  const inputDate = new Date(`${inputDateValue} 23:59:59`).getTime();
  const currentDate = new Date().getTime();
  const diffInTime = inputDate - currentDate;

  if (diffInTime < 0) return false;

  return true
}