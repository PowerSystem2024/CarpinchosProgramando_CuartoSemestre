export const uniqueDates = (tasks) => {
    const unique = [];

    tasks.forEach((task) => {
        if(!unique.includes(task.date)){
            unique.push(task.date);
        }
    });
    return unique;
};

export const orderDates = (dates) => { // Ordena de más antigua a más moderna
    return dates
        .sort((a, b) => {
            // a y b vienen como YYYY-MM-DD desde el backend
            const firstDate = moment(a, "YYYY-MM-DD");
            const secondDate = moment(b, "YYYY-MM-DD");
            return firstDate - secondDate;
        })
        .map(date => moment(date, "YYYY-MM-DD").format("DD/MM/YYYY"));
};

export const orderTimes = (dates) => { // Ordena los horarios
    return dates.sort((a, b) => {
        const firstTime = moment(a, "LT");
        const secondTime = moment(b, "LT");
        return  firstTime - secondTime;
    });
};