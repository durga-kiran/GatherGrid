
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import User from "../models/User.js";

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminEmail = "admin@example.com";

    const existingAdmin = await User.findOne({
      email: adminEmail
    });

    if (existingAdmin) {
      console.log("Admin account already exists.");

      // Ensure the existing account has admin privileges.
      existingAdmin.role = "admin";
      existingAdmin.emailVerified = true;
      await existingAdmin.save();

      console.log("Admin account updated successfully.");
      return;
    }

    await User.create({
      name: "Platform Admin",
      email: adminEmail,
      password: "Admin@12345",
      role: "admin",
      emailVerified: true
    });

    console.log("Admin account created successfully!");
    console.log("Email:", adminEmail);
    console.log("Password: Admin@12345");

  } catch (error) {
    console.error("Error creating admin:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
