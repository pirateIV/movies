export function formatTime(minutes) {
  const seconds = minutes * 60;
  let secondsLeft = seconds;

  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft = secondsLeft % 3600;

  const mins = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft % 60;

  return `${hours ? `${hours}h` : ""} ${mins}min`;
}

export const { format: formatVote } = Intl.NumberFormat("en-GB", {
  notation: "compact",
  maximumFractionDigits: 1,
});

/**
 * Format minutes into hours and mins
 */
// export function formatTime(minutes) {
//   // seconds
//   const seconds = minutes * 60;
//   let secondsLeft = seconds;

//   // hours
//   const hours = Math.floor(secondsLeft / 3600);
//   secondsLeft = secondsLeft % 3600;

//   // mins
//   const mins = Math.floor(secondsLeft / 60);
//   secondsLeft = secondsLeft % 60;

//   return `${hours ? `${hours}h` : ""} ${mins}min`;
// }

export function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(num % 1000 !== 0 ? 1 : 0) + "K";
  }
  return num;
}

export function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function numberWithCommas(number) {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function findPerson(mediaDetails, job) {
  return mediaDetails?.credits?.crew.find((person) => person?.job === job);
}

// export const convertImageToWebP = async (imageURL, callback) => {
//   const img = new Image();
//   img.crossOrigin = "Anonymous";
//   img.src = imageURL;

//   img.onload = () => {
//     const canvas = document.createElement("canvas");
//     canvas.width = img.width;
//     canvas.height = img.height;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);
//     const webpURL = canvas.toDataURL("image/webp");
//     callback(webpURL);
//   };
// };
