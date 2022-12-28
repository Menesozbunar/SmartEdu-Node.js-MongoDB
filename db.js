import mongoose from "mongoose";
import * as dotenv from "dotenv";

const connDb = () => {
    mongoose.connect(process.env.Db_Uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
    }).then(() => console.log('Connected!'));

}
export default connDb;