import mongoose from "mongoose";

const connectionDb = async (): Promise<void> => {
    try {
        const mongoUrl = process.env.MONGO_URl || ""; // Provide a default value if undefined
        if (!mongoUrl) {
            throw new Error("MongoDB URL not defined");
        }

        await mongoose.connect(mongoUrl);
        console.log(`Connection to MongoDB ${process.env.SC}`);
    } catch (error) {
        console.log(`MongoDB connection Error ${error}`);
    }
};

export default connectionDb;