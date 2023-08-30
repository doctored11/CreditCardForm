import { el, mount } from "redom";
import '../css/normalize.css'
import "../css/anim.css"
import"../css/style.css"

export const cardZone = document.getElementById("card-zone");

//front

 const imagePath = new URL("../source/icons8-nfc-96.png", import.meta.url).href;
const cardHead = el("div.card__head", [
  el("div.card__logo.logo"),
  el("h3.card__bank-name"),
  el("div.card__system.system", [
    el("div.system__main-part", [
      el("div.system__chip.chip"),
      el("img.system__nfc", { src: imagePath, alt: "" }),
    ]),
    el("div.system__logo.logo"),
  ]),
]);

export const cardNum = el("input.card__input.input", {
  type: "text",
  id: "card-number",
  placeholder: "Номер карты",
  required: true,
});
const cardNumberBox = el("div.front__input-box#card-number--box", [
  el("span.front__error#card-number-error", "проверьте номер карты"),
  cardNum,
]);
const cardHolderBox = el("div.front__input-box", [
  el("input.card__input.input", {
    type: "text",
    id: "card-holder",
    placeholder: "Владелец карты",
    required: true,
  }),
  el("span.front__error#card-holder-error", "проверьте имя"),
]);
const expirationDateBox = el("div.front__input-box", [
  el("input.card__input.input", {
    type: "text",
    id: "expiration-date",
    placeholder: "MM/ГГ",
    required: true,
  }),
  el("span.front__error#expiration-date-error", "проверьте дату"),
]);

const cardFront = el("div.card__front.front#front", [
  el("div.front__active-background.active-background.active-background--true", [
    cardHead,
    el("form.card__form", [cardNumberBox, cardHolderBox, expirationDateBox]),
  ]),
]);

//back
const cardBack = el("div.card__back.back#back", [
  el("div.back__active-background.active-background", [
    el("div.back__input-box", [
      el("div.back__magnetic-stripe"),
      el("input.card__input.input.CVV-input", {
        type: "text",
        id: "CVV",
        placeholder: "CVC/CVV",
        required: true,
      }),
      el("span.back__error#cvv-error", "проверьте код"),
    ]),
  ]),
]);
//карта
export const card = el("div.card.card--open#card", [cardFront, cardBack]);
mount(cardZone, card);
// поле почты + оплаты
const emailErrorEl = el(
  "p.contact__txt.txt.contact__error#email-error",
  "Для получения чека введите ваш email-адресс"
);

const emailInput = el("input.card__input.input.email-input", {
  type: "email",
  id: "email",
  placeholder: "Ваша почта",
  required: true,
});
export const buyBtn = el("button.pay-button#buy-btn[disabled]", "Оплатить");

const contactZone = el("div.card-zone__contact.contact", [
  emailErrorEl,
  el("div.contact_email-block", [emailInput, buyBtn]),
]);

//
mount(cardZone, contactZone);
export const arrOfSides = document.querySelectorAll(".active-background");
//
