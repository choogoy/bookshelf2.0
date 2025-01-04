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

            // return start;
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

        return resultArr;
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

        if ([...checkArr].length) {
            filterArr([...radioArr, resultCheckArr([...checkArr])]);
            pagination(filterArr([...radioArr, resultCheckArr([...checkArr])]).length, 12, 1, filterArr([...radioArr, resultCheckArr([...checkArr])]));
        } else {
            filterArr(radioArr);
            pagination(filterArr(radioArr).length, 12, 1, filterArr(radioArr));
        }

        // console.log(radioArr, filterArr(radioArr));
        // console.log(checkArr, resultCheckArr([...checkArr]));

        // filterArr([...radioArr, resultCheckArr([...checkArr])]);
        // console.log();
            // console.log([...radioArr.concat([...checkArr])]);

            // console.log(radioArr);

            // console.log(checkArr);


        // console.log(filterArr(radioArr), resultCheckArr([...checkArr]));


        // console.log(radioArr, resultCheckArr([...checkArr]));

    
    });

};

export default renderFilters;