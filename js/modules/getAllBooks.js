import getData from './getData.js';
import correctTime from './correctTime.js';

const getAllBooks = () => {
    const URL = 'https://spreadsheets.google.com/feeds/list/1_-Ps7Ef7SUZku9GYCCnV7aQ20EhtHDMjKqEpO9SViqw/od6/public/values?alt=json';  
    return getData(URL)
        .then(response => response.feed.entry)
        .then(data => {
            const BooksArray = [];

            data.forEach(({
                gsx$author      : { $t: author },
                content         : { $t: content },
                gsx$book        : { $t: book },
                gsx$buydate     : { $t: buyDate },
                gsx$id          : { $t: id },
                gsx$img         : { $t: img },
                gsx$price       : { $t: price },
                gsx$publisher   : { $t: publisher },
                gsx$readdate    : { $t: readDate },
                gsx$shelf       : { $t: shelf },
                gsx$year        : { $t: year },
                id              : { $t: bookID },
            }) => {
                const newBook = {
                    "id": id,
                    "author": author,
                    "book": book,
                    "year": year ? +year : '',
                    "buyDate": buyDate ? correctTime(buyDate) : '',
                    "readDate": readDate ? correctTime(readDate) : '',
                    "price": +price.replace(',', '.'),
                    "publisher": publisher,
                    "shelf": shelf.split(' '),
                    "img": img,
                    "bookID": bookID.split('https://spreadsheets.google.com/feeds/list/1_-Ps7Ef7SUZku9GYCCnV7aQ20EhtHDMjKqEpO9SViqw/od6/public/values/')[1],
                    "content": content
                };
                BooksArray.push(newBook);
            });
            return BooksArray;
        });
};

export default getAllBooks;