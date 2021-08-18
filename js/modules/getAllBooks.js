import getData from './getData.js';
import correctTime from './correctTime.js';

const getAllBooks = () => {
    return getData('DB/data.json')
        .then(response => response.books)
        .then(data => {
            const BooksArray = [];
            for (let i = 0; i < data.length; i++) {
                const { id, author, book, year, buyDate, readDate, price, publisher, shelf, img } = data[i];
                const newBook = {
                    "id": id ? id : '',
                    "author": author ? author : '',
                    "book": book ? book : '',
                    "year": year ? +year : '',
                    "buyDate": buyDate ? correctTime(buyDate) : '',
                    "readDate": readDate ? correctTime(readDate) : '',
                    "price": price ? +price : '',
                    "publisher": publisher ? publisher : '',
                    "shelf": shelf ? shelf.split(' ') : [],
                    "img": img ? img : '',
                    "bookID": `book${i}`,
                    "content": `${author} ${book} ${year} ${publisher} ${year}`
                };
                BooksArray.push(newBook);
            }
            return BooksArray;
        });
};

export default getAllBooks;