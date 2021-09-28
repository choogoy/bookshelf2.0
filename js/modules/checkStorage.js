import changeCartCount from './changeCartCount.js';
import getLocalStorage from './getLocalStorage.js';

const checkStorage = data => {
    const goods = getLocalStorage();

    if (goods.length)  {
        data.forEach(good => {
            for (let elem of goods) {
                if (good.bookID === elem.id) {
                    if (!good.price) {
                        localStorage.removeItem('cart-bookshelf');
                        return;
                    }
                }
            }
        });
    }

    changeCartCount();
};

export default checkStorage;