exports.getDate = () => {
    let today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);
    return day;
}

exports.getDay = () => {
    let today = new Date();
    const options = {
        weekday: "long",
        
    };
    let day = today.toLocaleDateString("en-US", options);
    return day;
}