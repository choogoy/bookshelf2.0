import addToCart from './addToCart.js';
import changeCartCount from './changeCartCount.js';
import modal from './modal.js';
import renderCart from './renderCart.js';
import showDate from './showDate.js';

const renderCard = data => {
    const { bookID, img, year, author, book, readDate, publisher, buyDate, shelf, price } = data;

    const card = document.createElement('div');
    card.dataset.bookId = bookID;
    card.className = `books__item${shelf.includes('wishlist') ? ' item-false' : ' item-true'}${readDate ? ' books__item--read' : ''}`;

    card.innerHTML = `        
        <div class="books__item-img"><img src="${img ? img : '../images/no-cover.jpg'}" alt="${author} - ${book}"></div>
        <p>${author}</p>
        <p class="book-name">${book}</p>
        ${readDate ? `<p>${showDate(readDate)}</p>` : ''}
        ${price ? `<p class="book-price">${price} ₽</p>` : ''}
        <div class="book-footer">
            ${price ? `<p class="book-add-to-cart"><img src="./images/shopping-bag.svg"></p>` : ''}
        </div>`;

    card.onclick = event => {

        if (event.target.closest('.book-add-to-cart')) {
            addToCart(card.dataset.bookId);
            changeCartCount();
        } else {
            modal(data);
        }

    };

    return card;
};

export default renderCard;