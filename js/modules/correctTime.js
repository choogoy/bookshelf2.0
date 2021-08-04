const correctTime = time => {
    let timeArray = time.split('.');
    return (Date.parse(`${timeArray[2]}-${timeArray[1]}-${timeArray[0]}`));
};

export default correctTime;