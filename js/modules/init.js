import renderSlider from './renderSlider.js';
import renderTags from './renderTags.js';
import searchBooks from './searchBooks.js';
import checkStorage from './checkStorage.js';
import renderContent from './renderContent.js';
import pagination from './pagination.js';
import getLocalStorage from './getLocalStorage.js';
import changeCartCount from './changeCartCount.js';
import setLocalStorage from './setLocalStorage.js';
import prettify from './prettify.js';
import renderCart from './renderCart.js';
import orderModal from './orderModal.js';
import hideSearch from './hideSearch.js';
import renderFilter from './renderFilter.js';

const init = response => {

    const modal = document.querySelector('.modal');
    const cart = document.querySelector('.cart');
    const filterBtn = document.querySelector('.filter-btn');

    response.sort((a, b) => b.buyDate - a.buyDate);

    renderSlider(response);
    renderTags(response);
    searchBooks(response);
    // console.log(renderFilters(response));
    checkStorage(response);

    const categoriesList = document.querySelector('.categories__list');

    const changeTotal = data => {
        const goods = getLocalStorage();
        const totalValue = document.querySelector('.cart-item__total');
        const orderBtn = document.querySelector('.order-btn');
        let total = 0;

        if (goods.length)  {
    
            data.forEach(good => {
                for (let elem of goods) {
                    if (good.bookID === elem.id) {
                        total += good.price * elem.count;
                    }
                }
            });
    
            totalValue.dataset.total = total.toFixed(2);
            orderBtn.dataset.total = total.toFixed(2);
            totalValue.innerHTML = `<b>${prettify(total.toFixed(2))} ₽</b>`;
        }
    };

    changeCartCount();

    const removeFromStorage = id => {
        const data = getLocalStorage();
        const newArr = data.filter(good => good.id !== id);

        setLocalStorage(newArr);
        renderCart(response);
    };

    const changeCart = (id, change) => {
        const data = getLocalStorage();
        const newArr = []; 
        const good = data.filter(item => item.id === id);

        let currentCount = good[0].count;

        const item = document.querySelector(`.cart-item__count[data-book-id="${id}"`);

        if (change === 'minus' && currentCount === 1) {
            removeFromStorage(id);
            changeTotal(response);
            return;
        }

        data.forEach(element => {
            if (good[0].id === element.id) {

                if (change === 'plus') {
                    currentCount++;
                } 
                if (change === 'minus' && currentCount > 1) {
                    currentCount--;
                }

                item.querySelector('span').textContent = `${currentCount} шт.`;
                item.nextElementSibling.textContent = `${prettify((+item.nextElementSibling.getAttribute('data-cost') * currentCount).toFixed(2))} ₽`;
                
                newArr.push({count: currentCount, id});

            } else {
                newArr.push(element);
            }

        });

        setLocalStorage(newArr);
        changeTotal(response);
    };

    categoriesList.onclick = event => {
        const tag = event.target.closest('.categories__item');
        if (tag) {

            const category = tag.firstElementChild.textContent;
            hideSearch();

            if (category === 'Все книги') {
                renderContent(response);
                pagination(response.length, 12, 1, response);
            } else if (category === 'Прочитанные') {
                const readBooks = response.filter(item => item.readDate);
                pagination(readBooks.length, 12, 1, readBooks);
            } else if (category === 'Только бумажные книги') {
                const paperBooks = response.filter(item => {
                    if ((item.web.length === 0 || (item.web.length === 1 & item.web[0] === 'pdf')) & !item.shelf.includes('wishlist')) {
                        return item;
                    }
                });
                pagination(paperBooks.length, 12, 1, paperBooks);
            } else if (category === 'Нет в электронном виде') {
                const notBooks = response.filter(item => {
                    if (item.web.length === 0 & item.shelf.includes('wishlist')) {
                        return item;
                    }
                });
                pagination(notBooks.length, 12, 1, notBooks);
            } else if (category === 'Только аудио') {
                const audioBooks = response.filter(item => {
                    if (item.web.length > 0 & item.web.includes('mp3') & !item.web.includes('fb2')) {
                        return item;
                    }
                });
                pagination(audioBooks.length, 12, 1, audioBooks);
            } else if (category === 'Только электронные') {
                const fb2Books = response.filter(item => {
                    if (item.web.length > 0 & !item.web.includes('mp3') & item.web.includes('fb2')) {
                        return item;
                    }
                });
                pagination(fb2Books.length, 12, 1, fb2Books);
            } else if (category === 'Без категории') {
                const booksNoTags = response.filter(item => item.shelf == '');
                pagination(booksNoTags.length, 12, 1, booksNoTags);                 
            } else {
                const dataCategory = response.filter(item => item.shelf.includes(category));
                pagination(dataCategory.length, 12, 1, dataCategory);      
            }
        }
    };

    cart.onclick = event => {
        event.preventDefault();
        renderCart(response);
    };

    filterBtn.onclick = event => {
        event.preventDefault();
        renderFilter(response);
    }

    modal.onclick = event => {

        if (!event.target.closest('.modal-content') || event.target.closest('.close')) {
            modal.style.zIndex = -1;
            modal.style.opacity = 0;
        }

        if (event.target.closest('.book-tag')) {
            event.preventDefault();
            hideSearch();
            const filtered = response.filter(item => item.shelf.includes(event.target.textContent.slice(1)));

            modal.style.zIndex = -1;
            modal.style.opacity = 0;

            pagination(filtered.length, 12, 1, filtered);
        }

        if (event.target.closest('.add-to-cart-btn')) {

            const addToCartBtn = document.querySelector('.add-to-cart-btn');
            addToCartBtn.textContent = `В корзине 1 шт.`;

            let data = getLocalStorage();

            const id = event.target.closest('.add-to-cart-btn').dataset.bookId;

                if (data.length === 0) {
                    const cartItem = {count: 1, id};
                    data.push(cartItem);
                    setLocalStorage(data);
                } else {
                    const elem = data.filter(element => element.id === id);

                    if (elem.length === 1) {
                        const newArr = [];
                        elem[0].count++;

                        data.forEach(element => {
                            if (elem[0].id === element.id) {
                                element.count = elem[0].count;
                                newArr.push({count: elem[0].count, id});
                            } else {
                                newArr.push(element);
                            }
                        });
                        addToCartBtn.textContent = `В корзине ${elem[0].count} шт.`;
                        setLocalStorage(newArr);
                    } else {
                        const cartItem = {count: 1, id};
                        data.push(cartItem);
                        setLocalStorage(data);
                    }
                }     
        }

        if (event.target.closest('.cart-item__delete')) {
            const id = event.target.closest('.cart-item__delete').dataset.bookId;
            removeFromStorage(id);
        }

        if (event.target.closest('.cart-item__count--minus')) {
            const id = event.target.closest('.cart-item__count--minus').parentNode.dataset.bookId;
            changeCart(id, 'minus');
        }

        if (event.target.closest('.cart-item__count--plus')) {
            const id = event.target.closest('.cart-item__count--plus').parentNode.dataset.bookId;
            changeCart(id, 'plus');
        }

        if (event.target.closest('.order-btn')) {
            orderModal(response, event.target.closest('.order-btn').dataset.total);
        }

        changeCartCount();
    };

};

export default init;