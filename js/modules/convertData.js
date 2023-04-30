import correctTime from './correctTime.js';

export const convertData = data => {

    let ID = 1;
    const titles = data[0];
    const booksArray = [];

    for (let i = 1; i < data.length - 1; i++) {
        
        const newObj = {};
    
        newObj.bookID = `book${ID}`;

            if (data[i].length > 0) {

                newObj.content = `${data[i][1]} ${data[i][2]} ${data[i][8]} ${data[i][4]}`;

                for (let n = 0; n < data[i].length; n++) {

                    if (titles[n] != 'seria') {

                        newObj[titles[n]] = data[i][n];

                        if (titles[n] == 'shelf' || titles[n] == 'web') {
                            if (data[i][n]) {
                                newObj[titles[n]] = data[i][n].split(' ');
                            } else {
                                newObj[titles[n]] = [];
                            }
                        }

                        if (titles[n] == 'year' || titles[n] == 'price') {
                            if (data[i][n]) {
                                newObj[titles[n]] = +data[i][n].replace(',','.');
                            }
                        }

                        if (titles[n] == 'buyDate' || titles[n] == 'readDate') {
                            if (data[i][n]) {
                                newObj[titles[n]] = correctTime(data[i][n]);
                            }
                        }

                    }

                }
    
                booksArray.push(newObj);
                ID++;
            }
    }
    
    return booksArray;
};