import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	forgotPasswordToken: String,
	forgotPasswordTokenExpiry: Date,
	verifyToken: String,
	verifyTokenExpiry: Date,
});

/*
const User=mongoose.model("User", userSchema);
export default User;
*/

// here UserSchema is stored as users in MongoDb
// we used to write the above code to create a model and export it but now we will use the below code to create a model and export it
// because next js uses edge computing
// it has no idea whether it is making th econnection first time or the model is already created

// so we are checking that the model is already created or not , if it is created then give the reference of that model
// if not created then create the model and give the reference of that model

const User = mongoose.models.users || mongoose.model("users", userSchema);
// just for consistency, we are using the same name as the collection name in the database

export default User;
