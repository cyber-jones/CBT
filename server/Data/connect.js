import mongoose from "mongoose";



const connectDb = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log('connected to OMS_AuthService DB');
    } catch (err) {
        throw err
    }
}

export default connectDb;