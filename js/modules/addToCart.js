import getLocalStorage from './getLocalStorage.js';
import setLocalStorage from './setLocalStorage.js';

const addToCart = id => {
    let data = getLocalStorage();

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
            setLocalStorage(newArr);
        } else {
            const cartItem = {count: 1, id};
            data.push(cartItem);
            setLocalStorage(data);
        }
    }

};

export default addToCart;