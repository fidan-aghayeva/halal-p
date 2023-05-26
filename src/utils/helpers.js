import moment from 'moment/moment';

export const renderedSlides = (arr, div) => {
    const result = [];

    for (let i = 0; i < arr.length; i += div) {
        const newArr = arr.slice(i, i + div);

        result.push(newArr);
    }

    return result;
};

export const getDate = (date, format = 'DD MMMM YYYY') => {
    return moment(date).format(format);
};
