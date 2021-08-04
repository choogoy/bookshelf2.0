const hideSearch = () => {
    const searchInput = document.querySelector('.search-input');
    const sectionBooks = document.querySelector('.section-books');

    searchInput.value = '';
    searchInput.classList.remove('show-input');
    sectionBooks.textContent = '';
};

export default hideSearch;