import showDate from './showDate.js';
import getLocalStorage from './getLocalStorage.js';

const modal = data => {
    const modal = document.querySelector('.modal');
    const { bookID, img, author, book, readDate, buyDate, year, publisher, shelf, price } = data;

    const storage = getLocalStorage();

    const elem = storage.filter(good => good.id === bookID);

    let shelfs = '';
    shelf.forEach(tag => {
        shelfs += `<a class="book-tag" href="#">#${tag}</a>`;
    });

    modal.style.zIndex = 1;
    modal.style.opacity = 1;

    modal.innerHTML = ` <div class="modal-inner">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="close"></div>
                                    <div class="modal-content__img"><img src="${img ? img : '../images/no-cover.jpg'}" alt="${author} - ${book}"></div>
                                    <div class="modal-content__text">
                                        <p>${author}</p>
                                        <p><b>${book}</b></p>
                                        ${year ? `<p>Год: ${year}</p>` : ''}
                                        ${publisher ? `<p>Издательство: ${publisher}</p>` : ''}
                                        ${buyDate ? `<p>Дата покупки: ${showDate(buyDate)}</p>` : ''}
                                        ${readDate ? `<p>Прочитано: ${showDate(readDate)}</p>` : ''}
                                        ${price ? `<p>Цена: ${price} ₽</p>` : ''}
                                        ${shelf != '' ? `<p>${shelfs}</p>` : ''}
                                        ${price ? `<button class="add-to-cart-btn" data-book-Id="${bookID}">${elem[0] ? `В корзине ${elem[0].count} шт.` : 'Добавить в корзину'}</button>` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>`;
};

export default modal;