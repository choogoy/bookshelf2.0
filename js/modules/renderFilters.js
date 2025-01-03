import pagination from './pagination.js';

const renderFilters = (data, obj) => {

    const filters = document.querySelector('.filters');

    const filterArr = arr => {

        if (arr.length) {

            let start = arr[0];
    
            for (let i = 0; i < arr.length - 1; i++) {
                const match = start.filter( el => arr[i+1].indexOf( el ) > -1 );
                start = match;
            }
        
            return data.filter(elem => start.includes(elem.bookID));
        } else return []

    };

    const resultCheckArr = arr => {

        let resultArr = [];

        for (let i = 0; i < arr.length; i++) {
            arr[i].forEach(item => {
                if (!resultArr.includes(item)) {
                    resultArr.push(item);
                }
            });
        }

        return data.filter(elem => resultArr.includes(elem.bookID));
    };

    filters.addEventListener('change', () => {

        let checkList = [];
        let radioList = [];

        let radioArr = [];
        let checkArr = new Set();
    

        for (let i = 0; i < filters.elements.length; i++) {
            if (filters.elements[i].checked && filters.elements[i].type == "radio") {
                radioList.push(filters.elements[i].value);
            }

            if (filters.elements[i].checked && filters.elements[i].type == "checkbox") {
                checkList.push(filters.elements[i].value);
            }
        }

        for (let i = 0; i < radioList.length; i++) {
            radioArr.push(obj[radioList[i]]);
        }

        for (let i = 0; i < checkList.length; i++) {
            checkArr.add(obj[checkList[i]]);
        }

        console.log();
            // console.log(filterArr([...radioArr, [...checkArr]]));

        pagination(filterArr(radioArr.concat([...checkArr])).length, 12, 1, filterArr(radioArr.concat([...checkArr])));


        // console.log(filterArr(radioArr), resultCheckArr([...checkArr]));


        // console.log(radioArr, resultCheckArr([...checkArr]));

    
    });

};

export default renderFilters;