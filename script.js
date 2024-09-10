function init() {
  getFromLocalStorage();
  renderMenu();
  renderCard();
  updateTobasketCounter(); 
}

function renderMenu() {
  for (let index = 0; index < menu.length; index++) {
    const menuRef = document.getElementById("menu-container");

    menuRef.innerHTML += renderMenuTemplate(index);

    formattingPriceMenu(index);
  }
}

function addDishToCard(index) {
  const cardRef = document.getElementById("cardDish-container");
  const totalPriceRef = document.getElementById("total-price-container");
  const singleDish = menu[index];

  if (order.length < 1) {
    order.push({
      dish: singleDish.dish,
      amount: 1,
      price: singleDish.price,
      totalPrice: singleDish.price,
    });
    cardRef.innerHTML = "";
    totalPriceRef.innerHTML = "";
    renderCard();
  } else {
    searchForDishInCard(singleDish, totalPriceRef, cardRef);
  }
}

function searchForDishInCard(singleDish, totalPriceRef, cardRef) {
 
  const searchItem = singleDish.dish;
    const containsObject = order.some((obj) => obj.dish === searchItem);

    if (containsObject) {
      let i = order.findIndex((obj) => obj.dish === searchItem);
      addOneAmount(i);
    } else {
      order.push({
        dish: singleDish.dish,
        amount: 1,
        price: singleDish.price,
        totalPrice: singleDish.price,
      });
      cardRef.innerHTML = "";
      totalPriceRef.innerHTML = "";

      renderCard();
      
    }
}

function renderCard() {
  if (order.length == 0) {
    const cardRef = document.getElementById("cardDish-container");
    const totalPriceContainerRef = document.getElementById(
      "total-price-container"
    );
    cardRef.innerHTML =
      '<p style="text-align:center; padding: 40px 20px">Zur Zeit befindet sich nichts in deinem Warenkorb</p>';
    totalPriceContainerRef.innerHTML = "";
  } else {
    for (let i = 0; i < order.length; i++) {
      const cardRef = document.getElementById("cardDish-container");

      cardRef.innerHTML += renderCardTemplate(i);
      formattingPriceCard(i);
    }
    calculateTotalPrice();
  }
  updateTobasketCounter(); 
  saveToLocalStorage();
}

function calculateTotalPrice() {
  const totalPriceContainerRef = document.getElementById(
    "total-price-container"
  );

  let subPrice = 0;
  let totalPrice;

  //Berechnung der Zwischensumme
  for (let i = 0; i < order.length; i++) {
    const singleDish = order[i];
    subPrice += singleDish.totalPrice;
  }

  totalPrice = subPrice + deliveryPrice;

  totalPriceContainerRef.innerHTML = "";

  renderTotalPrice(subPrice, totalPrice);
  formattingTotalPrices(subPrice, totalPrice);
}

function renderTotalPrice(subPrice, totalPrice) {
  const totalPriceRef = document.getElementById("total-price-container");
  if (order.length > 0) {
    totalPriceRef.innerHTML += renderTotalPriceTemplate(subPrice, totalPrice);
  }
}

function addOneAmount(index) {
  const cardRef = document.getElementById("cardDish-container");

  if (order[index].amount < 12) {
    order[index].amount += 1;

    order[index].totalPrice += order[index].price;

    cardRef.innerHTML = "";
    renderCard();
  }
}

function removeOneAmount(index) {
  const cardRef = document.getElementById("cardDish-container");
  if (order[index].amount > 1) {
    order[index].amount -= 1;

    order[index].totalPrice -= order[index].price;

    cardRef.innerHTML = "";
    renderCard();
  } else if ((order[index].amount = 1)) {
    removeDishFromCard(index);
  }
}

function removeDishFromCard(index) {
  const cardRef = document.getElementById("cardDish-container");
  order.splice([index], 1);

  cardRef.innerHTML = "";
  renderCard();
}

function submit() {
  order = [];
  const cardRef = document.getElementById("cardDish-container");
  const totalPriceContainerRef = document.getElementById(
    "total-price-container"
  );
  cardRef.innerHTML =
    '<div style="text-align:center; padding: 40px 20px"><p>Vielen Dank für deine Bestellung. Aufgrund von Personalmangel kann es zu Verzögerungen kommen.</p> <p>Wartezeit aktuell: 2 Jahre </p>';
  totalPriceContainerRef.innerHTML = "";
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("myOrder", JSON.stringify(order));
}

function getFromLocalStorage() {
  const savedOrder = JSON.parse(localStorage.getItem("myOrder"));
  if (savedOrder != null) {
    order = savedOrder;
  }
}

function updateTobasketCounter() {
  const basketCounterRef = document.querySelector(".basket-counter");
  let totalCount = 0;

  if(order.length != 0) {
    for (let i = 0; i < order.length; i++) {
      totalCount += order[i].amount;
      
    }
    basketCounterRef.innerHTML = totalCount;
  } else {
    basketCounterRef.innerHTML ="";
  }

  
}