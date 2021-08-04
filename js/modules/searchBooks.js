import debounce from './debounce.js';
import hideSearch from './hideSearch.js';
import pagination from './pagination.js';

const searchBooks = data => {
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.querySelector('.search-input');
    const sectionBooks = document.querySelector('.section-books');
    const paginationNav = document.querySelector('.pagination-nav');

    searchBtn.onclick = () => {
        searchInput.classList.toggle('show-input');
        if (!searchInput.classList.contains('show-input')) {
            hideSearch();
        }
    };

    const renderSearchResult = value => {
        const searchResult = data.filter(book => book.content.toLowerCase().includes(value.toLowerCase().trim()));

        if (searchResult.length) {
            pagination(searchResult.length, 12, 1, searchResult);
        } else {
            sectionBooks.innerHTML = `<p>По вашему запросу: <b> ${value} </b> ничего не найдено...</p>`;
            paginationNav.textContent = '';
        }
    };
    
    const showSearchResult = debounce(renderSearchResult, 400);
    
    searchInput.addEventListener('input', () => {
        const value = searchInput.value;
        showSearchResult(value);
    });

};

export default searchBooks;