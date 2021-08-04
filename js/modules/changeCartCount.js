import getLocalStorage from './getLocalStorage.js';

const changeCartCount = () => {
    const cartCount = document.querySelector('.cart-count');
    const data = getLocalStorage();
    const res = data.reduce((acc, elem) => acc + elem.count, 0);

    cartCount.textContent = res;
};

export default changeCartCount;