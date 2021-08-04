import renderCard from './renderCard.js';
import pagination from './pagination.js';

const renderContent = data => {
    const sectionBooks = document.querySelector('.section-books');
    const contentBooks = data.sort((a,b) => b.buyDate - a.buyDate);
    
    sectionBooks.textContent = '';
    pagination(contentBooks.length, 12, 1, contentBooks);

    contentBooks.forEach(book => sectionBooks.append(renderCard(book)));    
};

export default renderContent;