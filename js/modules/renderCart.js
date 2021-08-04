import getLocalStorage from './getLocalStorage.js';
import changeCartCount from './changeCartCount.js';
import prettify from './prettify.js';

const renderCart = data => {
    const modal = document.querySelector('.modal');
    const goods = getLocalStorage();
    changeCartCount();
    let html = '';
    let total = 0;

    modal.style.zIndex = 1;
    modal.style.opacity = 1;

    if (goods.length)  {

        data.forEach(good => {
            for (let elem of goods) {
                if (good.bookID === elem.id) {

                    html += `<div class="cart-item">
                                <div class="cart-item__book">
                                    <div class="cart-item__img"><img src="${good.img ? good.img : '../images/no-cover.jpg'}"></img></div>                            
                                    <div class="cart-item__name">${good.author} - ${good.book}</div>                            
                                </div>                
                                <div class="cart-item__count" data-book-id="${good.bookID}">
                                    <button class="cart-item__count--minus">-</button><span>${elem.count} шт.</span><button class="cart-item__count--plus">+</button>
                                </div>
                                <div class="cart-item__cost" data-cost="${(good.price).toFixed(2)}">${prettify((good.price * elem.count).toFixed(2))} ₽</div>
                                <button class="cart-item__delete" data-book-id="${good.bookID}"><img src="../images/close.svg"></button>
                            </div>`;
    
                    total += good.price * elem.count;
                }
            }
        });
    
        modal.innerHTML =  `<div class="modal-inner">
                                <div class="modal-dialog">
                                    <div class="modal-content modal-cart">
                                        <button class="close"></button>
                                        <div class="cart-content">
                                            <h1 class="cart-title">Корзина</h1>
                                            ${html}
                                            <div class="cart-total">
                                                <div>Итог:</div>
                                                <div class="cart-item__cost cart-item__total" data-total="${total.toFixed(2)}"><b>${prettify(total.toFixed(2))} ₽</b></div>                         
                                            </div>
                                            <button class="order-btn" data-total="${total.toFixed(2)}">Оформить заказ</button>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
    } else {

        modal.innerHTML =  `<div class="modal-inner">
                                <div class="modal-dialog">
                                    <div class="modal-content modal-cart">
                                        <button class="close"></button>
                                        <div class="cart-content">
                                            <h1 class="cart-title">Корзина</h1>
                                            <p class="cart-info">Добавьте товары в корзину</p>
                                        </div>
                                    </div>
                                </div>
                            </div>`;

    }
};

export default renderCart;