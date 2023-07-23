const card = document.getElementById("card");
const cardZone = document.getElementById("card-zone");

const arrOfSides = document.querySelectorAll(".active-background");
let activeSide;
const rootDarkGreen = "#3a9239c4";
const rootLightGreen = "#5bc0529e";
card.addEventListener("mousemove", (e) => {
  activeSide = document.querySelector(".active-background--true");
  transformationOfCard(card, e, 5);
});
card.addEventListener("click", () => {
  card.classList.toggle("card--open");
  
  for (const side of arrOfSides) {
    side.classList.toggle("active-background--true");
  }
});
cardZone.addEventListener("mousemove", (e) => {
  activeSide = document.querySelector(".active-background--true");
  transformationOfCard(cardZone, e, 15);
});

cardZone.addEventListener("mouseout", () => {
  activeSide = document.querySelector(".active-background--true");
  card.classList.add("return");
  activeSide.style.background = `linear-gradient(-48deg, ${rootDarkGreen},${rootLightGreen})`;
  card.style.transform = "none";
});

cardZone.addEventListener("mouseenter", () => {
  activeSide = document.querySelector(".active-background--true");
  activeSide.style.background = `linear-gradient(-48deg, ${rootDarkGreen},${rootLightGreen})`;
  card.classList.remove("return");
});

function transformationOfCard(objClass, event, resistanceForce) {
  event.stopPropagation();
  console.log(objClass);
  const rect = objClass.getBoundingClientRect();
  const cardCenterX = rect.left + rect.width / 2;
  const cardCenterY = rect.top + rect.height / 2;
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const deltaX = mouseX - cardCenterX;
  const deltaY = mouseY - cardCenterY;

  const gradientAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - 90;

  activeSide.style.background = `linear-gradient(${gradientAngle}deg, ${rootDarkGreen},${rootLightGreen})`;

  card.style.transform = `rotateX(${-deltaY / resistanceForce}deg) rotateY(${
    deltaX / (3 * resistanceForce)
  }deg)`;
}
