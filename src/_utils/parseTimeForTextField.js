const parseTimeForTextField = (date, addAMPM) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  let end = "AM";
  if (hours === 0) {
    end = "AM";
    hours = 12;
  } else if (hours === 12) {
    end = "PM";
  } else if (hours > 12) {
    end = "PM";
    hours -= 12;
  }
  const parsedTime = addAMPM
    ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )} ${end}`
    : `${String(date.getHours()).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;

  return parsedTime;
};

export default parseTimeForTextField;
