/**
 * Format minutes into hours and mins
 */
export function formatTime(minutes) {
  // seconds
  const seconds = minutes * 60;
  let secondsLeft = seconds;

  // hours
  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft = secondsLeft % 3600;

  // mins
  const mins = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft % 60;

  return `${hours ? `${hours}h` : ""} ${mins}min`;
}

export function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(num % 1000 !== 0 ? 1 : 0) + "K";
  }
  return num;
}

export function formatDate(dateString) {
  console.log(dateString);
  const [year, month, day] = dateString?.split("-");
  return `${parseInt(month)}/${parseInt(day)}/${parseInt(year)}`;
}

export function numberWithCommas(number) {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function findPerson(mediaDetails, job) {
  return mediaDetails?.credits?.crew.find((person) => person?.job === job);
}
