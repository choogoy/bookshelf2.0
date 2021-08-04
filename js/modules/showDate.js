import addZero from './addZero.js';

const showDate = date => {
    const buyYear = new Date(date).getFullYear();
    const buyMonth = new Date(date).getMonth() + 1;
    const buyDay = new Date(date).getDate();
    return `${addZero(buyDay)}.${addZero(buyMonth)}.${buyYear}`;
};

export default showDate;