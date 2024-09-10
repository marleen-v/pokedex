function renderMenuTemplate(index) {
  return `<div class="single-dish">
                            <div class="info-single-dish">
                                <h3>${menu[index].dish}</h3>
                                <span class="ingredients">${menu[index].description}</span>
                                <span class="price">${menu[index].price}</span>
                             </div>
                             <button onclick="addDishToCard(${index})" class="add-btn flex-column">
                                <img src="./assets/icons/plus-white.png" alt="" />
                            </button>
                         </div>`
};

function renderCardTemplate(i) {
  return `
        <div class="card-item">
          <h3 class="card-dish">${order[i].dish}</h3>
          <div class="amount-price-container">
            <button onclick="removeOneAmount(${i})" class="basket-btn">
              <img
                class="card-icon"
                src="./assets/icons/minus.png"
                alt="minus-icon"
              />
            </button>
            <span class="amount">${order[i].amount}</span>
            <button onclick="addOneAmount(${i})" class="basket-btn">
              <img
                class="card-icon"
                src="./assets/icons/plus.png"
                alt="plus-icon"
              />
            </button >
            <span class="single-total-price">${order[i].totalPrice}</span>
            <button onclick="removeDishFromCard(${i})" > <img
              class="card-icon basket-btn"
              src="./assets/icons/trash.png"
              alt="trash-icon"
            />
            </button>
          </div>
        </div>`
};

