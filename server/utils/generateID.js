const generateId = () => {
    return Math.random().toString().split(".")[1];
};


export default generateId;