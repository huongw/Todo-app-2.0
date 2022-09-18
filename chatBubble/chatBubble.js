export function insertChatBubbleText(isComplete) {
  const chatBubbleText = document.querySelector(".cb__text");

  if (!isComplete) return chatBubbleText.innerHTML = "...";

  const complimentsArr = ["Good work there!", "Keep it up!", "Doing so good!", "Let's do this!", "Hard work pays off!", "Nice job, friend!", "Wonderful job!", "Awesome job!", "Amazing work!", "You're the best!"];
  const randomNum = Math.floor(Math.random() * 10);

  switch(randomNum) {
    case 0:
      chatBubbleText.innerHTML = complimentsArr[0];
      break;
    case 1:
      chatBubbleText.innerHTML = complimentsArr[1];
      break;
    case 2:
      chatBubbleText.innerHTML = complimentsArr[2];
      break;
    case 3:
      chatBubbleText.innerHTML = complimentsArr[3];
      break;
    case 4:
      chatBubbleText.innerHTML = complimentsArr[4];
      break;
    case 5:
      chatBubbleText.innerHTML = complimentsArr[5];
      break;
    case 6:
      chatBubbleText.innerHTML = complimentsArr[6];
      break;
    case 7:
      chatBubbleText.innerHTML = complimentsArr[7];
      break;
    case 8:
      chatBubbleText.innerHTML = complimentsArr[8];
      break;
    case 9:
      chatBubbleText.innerHTML = complimentsArr[9];
  }
};