const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/user.js");

dotenv.config({ path: "./config/.env" });

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB Connected");
};

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminExists = await User.findOne({ role: "admin" });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }


    const admin = await User.create({
      name: "Super Admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });

    console.log("Admin created:", admin.email);
    process.exit();
  } catch (error) {
    console.error("Seeder Error:", error);
    process.exit(1);
  }
};

seedAdmin();