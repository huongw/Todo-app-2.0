export default function escapeXSS(task) {
  const span = document.createElement("span");
  span.appendChild(document.createTextNode(task));

  return span.innerHTML;
};

