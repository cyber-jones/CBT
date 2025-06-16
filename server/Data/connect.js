const mongoose = require("mongoose");



module.exports = connectDb = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log('connected to OMS_AuthService DB');
    } catch (err) {
        throw err
    }
}