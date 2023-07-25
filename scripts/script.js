import Inputmask from "inputmask";
import {
  isValid,
  isExpirationDateValid,
  isSecurityCodeValid,
  getCreditCardNameByNumber,
} from "creditcard.js";
import { el, mount } from "redom";

//поиск по DOM

const card = document.getElementById("card");
const cardZone = document.getElementById("card-zone");

const buyBtn = document.getElementById("buy-btn");

const arrOfSides = document.querySelectorAll(".active-background");
let activeSide;

let cardNum = document.getElementById("card-number");
const rootDarkGreen = "#396092c4";
const rootLightGreen = "#5290c09e";


// слушатели
card.addEventListener("mousemove", (e) => {
  activeSide = document.querySelector(".active-background--true");
  transformationOfCard(card, e, 5);
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



//функции логики
//--маска

let numMask = new Inputmask("9999 9999 9999 9999", {
  placeholder: " ",
  clearMaskOnLostFocus: true,
});
numMask.mask(cardNum);

let cardHolder = document.getElementById("card-holder");
let holderMask = new Inputmask({ regex: "[A-Za-z ]*" });
holderMask.mask(cardHolder);

let cardDate = document.getElementById("expiration-date");
let dateMask = new Inputmask("99/99");
dateMask.mask(cardDate);

let cardCode = document.getElementById("CVV");
let codeMask = new Inputmask("999");
codeMask.mask(cardCode);

let email = document.getElementById("email");
console.log(email);
let emailMask = new Inputmask("email");
emailMask.mask(email);

let cardNumFocused = false;
let cardHolderFocused = false;
let cardDateFocused = false;
let cardCVV = false;
let emailFocused = false;
let isbutterflyOpen = false;

let cardNumError = true;
let cardHolderError = true;
let cardDateError = true;
let CVVError = true;
let emailError = true;

const allInputs = document.querySelectorAll('input');

allInputs.forEach(inputElement => {
  inputElement.addEventListener('focus', checkAllInputs);
});

cardNum.addEventListener("blur", () => {
  cardNumFocused = false;
  if (!isValid(cardNum.value.replace(/\s+/g, ""))) {
    document.getElementById("card-number-error").classList.add("error");
    document.getElementById("card-number").classList.add("error-input");
    cardNumError = true;
  } else {
    cardNumError = false;
  }
  checkAndExecuteFlipBack();
  checkPaymentSys();
  checkAllInputs();

});

cardNum.addEventListener("input", () => {
  cardNumFocused = true;
  document.getElementById("card-number-error").classList.remove("error");
  document.getElementById("card-number").classList.remove("error-input");
  cardNumError = false;
});

email.addEventListener("input", () => {
  emailFocused = true;
  document.getElementById("email-error").classList.remove("error");
  document.getElementById("email").classList.remove("error-input");
  emailError = false;
});
email.addEventListener("blur", () => {
  emailFocused = false;
  
  if (email.value.trim() == "") {
    email.setAttribute("placeholder", "Ваш email");
    email.textContent = "Для получения чека введите ваш email-адресс";
    document.getElementById("email-error").classList.remove("error");
    return;
  }

  if (!isValidEmail(email.value)) {
    document.getElementById("email-error").classList.add("error");
    document.getElementById("email").classList.add("error-input");
    email.textContent = "Проверьте ваш email-aдресс";
    emailError = true;
  } else {
    email.textContent = "Для получения чека введите ваш email-адресс";
    emailError = false;
  }
  buyBtnSwitch();
  
});

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

email.addEventListener("focus", function () {
  // Когда элемент получает фокус, удаляем значение атрибута placeholder
  this.removeAttribute("placeholder");
});

cardHolder.addEventListener("blur", () => {
 
  console.log("blur");
  cardHolderFocused = false;
  if (!/^[A-Za-z]+\s[A-Za-z]+$/.test(cardHolder.value)) {
    document.getElementById("card-holder-error").classList.add("error");
    document.getElementById("card-holder").classList.add("error-input");
    cardHolderError = true;
  } else {
    cardHolderError = false;
  }
  checkAndExecuteFlipBack();
  checkAllInputs();
});

cardHolder.addEventListener("input", () => {
  cardHolderFocused = true;
  document.getElementById("card-holder-error").classList.remove("error");
  document.getElementById("card-holder").classList.remove("error-input");
  
  // cardHolderError = false;
});

cardDate.addEventListener("blur", () => {
  cardDateFocused = false;
  const buffDate = cardDate.value.split("/");
  if (!isExpirationDateValid(buffDate[0], `20${buffDate[1]}`)) {
    document.getElementById("expiration-date-error").classList.add("error");
    document.getElementById("expiration-date").classList.add("error-input");
    cardDateError = true;
  } else {
    cardDateError = false;
  }
  checkAndExecuteFlipBack();
  checkAllInputs();
});

cardDate.addEventListener("input", () => {
  cardDateFocused = true;
  document.getElementById("expiration-date-error").classList.remove("error");
  document.getElementById("expiration-date").classList.remove("error-input");
  cardDateError = false;
});

const CVVCode = document.getElementById("CVV");

CVVCode.addEventListener("blur", () => {
  cardCVVFocused = false;
  const CVV = CVVCode.value.trim();

  if (!isSecurityCodeValid(cardNum.value.replace(/\s+/g, ""), CVV)) {
    document.getElementById("cvv-error").classList.add("error");
    document.getElementById("CVV").classList.add("error-input");
    CVVError = true;
  } else {
    CVVError = false;
  }
  checkAllInputs();
  //
});

CVVCode.addEventListener("input", () => {
  cardCVVFocused = true;
  document.getElementById("cvv-error").classList.remove("error");
  document.getElementById("CVV").classList.remove("error-input");
  CVVError = false;
});


//функции анимация и прочего
function transformationOfCard(objClass, event, resistanceForce) {
  event.stopPropagation();
  if (isbutterflyOpen) resistanceForce *= 3;
  // console.log(isbutterflyOpen);

  const rect = objClass.getBoundingClientRect();
  const cardCenterX = rect.left + rect.width / 2;
  const cardCenterY = rect.top + rect.height / 2;
  const mouseX = event.clientX;
  const mouseY = event.clientY;
  const deltaX = mouseX - cardCenterX;
  const deltaY = mouseY - cardCenterY;

  const gradientAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) - 90;

  if (!isbutterflyOpen)
    activeSide.style.background = `linear-gradient(${gradientAngle}deg, ${rootDarkGreen},${rootLightGreen})`;

  card.style.transform = `rotateX(${-deltaY / resistanceForce}deg) rotateY(${
    deltaX / (3 * resistanceForce)
  }deg)`;
}

function checkAndExecuteFlipBack() {
  if (
    !cardNumFocused &&
    !cardHolderFocused &&
    !cardDateFocused &&
    cardNumError + cardHolderError + cardDateError <= 0
  ) {
    // Если все три поля не в фокусе и не содержат ошибок, выполнить функцию FlipBack()
    flip();
  }
}

function flip() {
  card.classList.toggle("card--open");
  for (const side of arrOfSides) {
    side.classList.toggle("active-background--true");
  }
}
function checkPaymentSys() {
  const name = getCreditCardNameByNumber(cardNum.value.replace(/\s+/g, ""));
  let logoBlock = document.querySelector(".system__logo");
  let imagePath;
  logoBlock.innerHTML = "";
  switch (name) {
    case "Credit card is invalid!":
      return;
    case "Visa":
      imagePath = new URL("../src/Visa.png", import.meta.url).href;

      let vb = el("img", { src: imagePath, alt: "Visa", class: "logo-pic" });
      mount(logoBlock, vb);
      break;
    case "Mastercard":
      imagePath = new URL("../src/MC.png", import.meta.url).href;

      let mcb = el("img", {
        src: imagePath,
        alt: "MasterCard",
        class: "logo-pic",
      });
      mount(logoBlock, mcb);
      break;
    default:
      let bank = el("div", name + "");
      bank.classList.add("bank-txt");
      document.querySelector(".system__logo").style.cssText =
        "width:max-content;";
      mount(logoBlock, bank);
  }
  console.log(name);
}
function checkAllInputs() {
 
  if (
    !cardNumFocused &&
    !cardHolderFocused &&
    !cardDateFocused &&
    !cardCVV &&
    cardNumError + cardHolderError + cardDateError + CVVError <= 0
  ) {
    // Если все три поля не в фокусе и не содержат ошибок, выполнить функцию FlipBack()
    
    
    butterflyOpen();

    document.querySelector(".contact").classList.add("contact--active");
  }
  buyBtnSwitch();
}
function butterflyOpen() {
  if (isbutterflyOpen) return;
  card.classList.add("card--test");
  isbutterflyOpen = true;
}


function buyBtnSwitch() {
  buyBtn.disabled = true;
  console.log(
    cardNumError,
    cardHolderError,
    cardDateError,
    CVVError,
    emailError +
      " " +
      (cardNumError + cardHolderError + cardDateError + CVVError + emailError)
  );
  if (
    cardNumError + cardHolderError + cardDateError + CVVError + emailError <=
    0
  ) {
    buyBtn.disabled = false;
    return;
  }
  
}
buyBtn.addEventListener('click',()=>{alert('Все ушли денюжки')})
