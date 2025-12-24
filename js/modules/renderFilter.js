import renderFilters from './renderFilters.js';

const renderFilter = data => {

    const modal = document.querySelector('.modal');

    let filterBooks = data;

    let list = {};

    let obj = {
        read: [],
        noread: [],
        paper: [],
        nopaper: [],
        epub: [],
        noepub: [],
        audio: [],
        noaudio: [],
        nomatter: [],
        2020: [],
        2021: [],
        2022: [],
        2023: [],
        2024: [],
        2025: [],
        2026: []
    };

    let html = `<form class="filters">
                    <ul class="filters__list filter-list">                
                        <ul class="filters-list__radio">
                            <ul class="filters-list__radio-item">
                                Электронная версия
                                <li class="filter-list__item">
                                    <input type="radio" name="epub" value="epub">
                                    <label for="epub">есть</label>
                                </li>
                                <li class="filter-list__item">
                                    <input type="radio" name="epub" value="noepub">
                                    <label for="noepub">нет</label>
                                </li>
                                <li class="filter-list__item">
                                    <input type="radio" name="epub" value="nomatter">
                                    <label for="nomatter">не важно</label>
                                </li>
                            </ul>
                            <ul class="filters-list__radio-item">
                                Аудио версия
                                <li class="filter-list__item">
                                    <input type="radio" name="audio" value="audio">
                                    <label for="audio">есть</label>
                                </li>
                                <li class="filter-list__item">
                                    <input type="radio" name="audio" value="noaudio">
                                    <label for="noaudio">нет</label>
                                </li>
                                <li class="filter-list__item">
                                    <input type="radio" name="audio" value="nomatter">
                                    <label for="nomatter">не важно</label>
                                </li>
                            </ul>
                            <ul class="filters-list__radio-item">
                                Бумажная версия
                                <li class="filter-list__item">
                                    <input type="radio" name="paper" value="paper">
                                    <label for="paper">есть</label>
                                </li>
                                <li class="filter-list__item">
                                    <input type="radio" name="paper" value="nopaper">
                                    <label for="nopaper">нет</label>
                                </li>
                                <li class="filter-list__item">
                                    <input type="radio" name="paper" value="nomatter">
                                    <label for="nomatter">не важно</label>
                                </li>
                            </ul>
                            <ul class="filters-list__radio-item">
                                Прочитано
                                <li class="filter-list__item">
                                    <input type="radio" name="read" value="read">
                                    <label for="read">да</label>
                                </li>
                                <li class="filter-list__item">
                                    <input type="radio" name="read" value="noread">
                                    <label for="noread">нет</label>
                                </li>
                                <li class="filter-list__item">
                                    <input type="radio" name="read" value="nomatter">
                                    <label for="nomatter">не важно</label>
                                </li>
                            </ul>
                            <ul class="filters-list__radio-item">
                                Год
                                <li class="filter-list__item">
                                    <input type="radio" name="year" value="2020">
                                    <label for="2020">2020</label>
                                </li>
                                <li class="filter-list__item">
                                    <input type="radio" name="year" value="2021">
                                    <label for="2021">2021</label>
                                </li>
                                <li class="filter-list__item">
                                    <input type="radio" name="year" value="2022">
                                    <label for="2022">2022</label>
                                </li>
                                    <li class="filter-list__item">
                                    <input type="radio" name="year" value="2023">
                                    <label for="2023">2023</label>
                                </li>
                                <li class="filter-list__item">
                                    <input type="radio" name="year" value="2024">
                                    <label for="2024">2024</label>
                                </li>
                                <li class="filter-list__item">
                                    <input type="radio" name="year" value="2025">
                                    <label for="2025">2025</label>
                                </li>
                                <li class="filter-list__item">
                                    <input type="radio" name="year" value="2026">
                                    <label for="2026">2026</label>
                                </li>
                            </ul>
                        </ul>
                        <ul class="filters-list__checkbox">
                        </ul>
                    </ul>
                </form>`;

    modal.innerHTML =  `<div class="modal-inner">
                            <div class="modal-dialog">
                                <div class="modal-content modal-cart">
                                    <button class="close"></button>
                                    <div class="cart-content">
                                        <h1 class="cart-title">Фильтры</h1>
                                        ${html}
                                    </div>
                                </div>
                            </div>
                        </div>`;

    modal.style.zIndex = 1;
    modal.style.opacity = 1;
    
    filterBooks.filter(item => {

        obj.nomatter.push(item.bookID);

        if (item.readDate !== '') {
            obj.read.push(item.bookID);
        }

        if (item.readDate === '') {
            obj.noread.push(item.bookID);
        }

        if (item.web.includes('mp3')) {
            obj.audio.push(item.bookID);
        }

        if (!item.web.includes('mp3')) {
            obj.noaudio.push(item.bookID);
        }

        if (item.web.includes('fb2')) {
            obj.epub.push(item.bookID);
        }

        if (!item.web.includes('fb2')) {
            obj.noepub.push(item.bookID);
        }

        if (!item.shelf.includes('wishlist')) {
            obj.paper.push(item.bookID);
        }

        if (item.shelf.includes('wishlist')) {
            obj.nopaper.push(item.bookID);
        }

        if (item.shelf.includes('2020')) {
            obj[2020].push(item.bookID);
        }

        if (item.shelf.includes('2021')) {
            obj[2021].push(item.bookID);
        }

        if (item.shelf.includes('2022')) {
            obj[2022].push(item.bookID);
        }

        if (item.shelf.includes('2023')) {
            obj[2023].push(item.bookID);
        }

        if (item.shelf.includes('2024')) {
            obj[2024].push(item.bookID);
        }

        if (item.shelf.includes('2025')) {
            obj[2025].push(item.bookID);
        }

        if (item.shelf.includes('2026')) {
            obj[2026].push(item.bookID);
        }
    });

    const createTags = data => {

        const filterList = document.querySelector('.filters-list__checkbox');

        let listHTML = '';

        data.filter(elem => {
            elem.shelf.forEach(elemName => {
                if (!list[elemName]) {
                    list[elemName] = 1;
                } else {
                    list[elemName] +=1;
                }
            });
        });

        Object.entries(list).sort((a,b) => b[1] - a[1]).forEach(elem => {

            if (elem[0] !== 'wishlist' && elem[0] !== 'elements' && elem[0] !== '2020'
                && elem[0] !== '2021' && elem[0] !== '2022' && elem[0] !== '2023'
                && elem[0] !== '2024' && elem[0] !== '2025' && elem[0] !== '2026' && elem[1] > 37) {

                obj[elem[0]] = [];
                listHTML += `<li class="filter-list__item">
                                <input type="checkbox" name="${elem[0]}" value="${elem[0]}">
                                <label for="${elem[0]}">${elem[0]}</label>
                            </li>`;
    
                data.forEach(item => {
                    if (item.shelf.includes(elem[0])) {
                        obj[elem[0]].push(item.bookID);
                    }
                });

            }

        });

        filterList.insertAdjacentHTML('beforeend', listHTML);
    };

    createTags(data);
    renderFilters(data, obj);
}


export default renderFilter;
