import changeCartCount from './changeCartCount.js';
import getLocalStorage from './getLocalStorage.js';

const orderModal = (data, total) => {
    const modal = document.querySelector('.modal');

    modal.innerHTML =  `<div class="modal-inner">
                            <div class="modal-dialog">
                                <div class="modal-content modal-cart">
                                    <button class="close"></button>
                                    <div class="cart-content">
                                        <h1 class="cart-title">Заказ</h1>
                                        <p class="cart-info">Ваш заказ на сумму <b>${total} ₽</b> оформлен</p>
                                    </div>
                                </div>
                            </div>
                        </div>`;

    setTimeout(() => {
        localStorage.removeItem('cart-bookshelf');
        changeCartCount();
        modal.style.zIndex = -1;
        modal.style.opacity = 0;
    }, 3000);
};

export default orderModal;