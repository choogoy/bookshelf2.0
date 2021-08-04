const getLocalStorage = () => JSON.parse(localStorage.getItem('cart-bookshelf')) || [];

export default getLocalStorage;