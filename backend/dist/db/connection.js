import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        throw new Error("Cannot connect to MongoDB");
    }
}
async function disconecctFromDatabase() {
    try {
        await disconnect();
    }
    catch (error) {
        throw new Error("Cannot connect to MongoDB");
    }
}
export { connectToDatabase, disconecctFromDatabase };
//# sourceMappingURL=connection.js.map