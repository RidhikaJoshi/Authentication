import mongoose from 'mongoose';


export async function connectdb() {
    try{
        await mongoose.connect(process.env.MONGODB_URL || "");
        // in typesscript we need to gauranteee about the type of the object of the connection
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("Database connected successfully");
        });
        connection.on('error', (error) => {
            console.log("Something went wrong while connecting to the database.", error);
            process.exit(1);
        });

    }catch(error)
    {
        console.log("Something went wrong while connecting to the database.", error);
    }
}