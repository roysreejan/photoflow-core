// Global Error Handling for Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception! Shutting down...");
  console.error(err.name, err.message);
  process.exit(1);
});

// Load Environment Variables
require("dotenv").config();

// Validate required env variables
if (!process.env.DB || !process.env.PORT) {
  console.error("❌ Missing required environment variables (DB or PORT)");
  process.exit(1);
}

// Import Dependencies
const mongoose = require("mongoose");
const app = require("./app");

// MongoDB Connection
mongoose.connect(process.env.DB, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 30000,
  maxPoolSize: 10,
  retryWrites: true,
  w: "majority",
  appName: "photoflow-core"
})
.then(() => {
  console.log("✅ MongoDB connected successfully");
  console.log(`📂 Using database: ${mongoose.connection.name}`);
})
.catch((err) => {
  const sanitizedError = err.message.replace(/:\/\/.*?:.*?@/, "://*****:*****@");
  console.error("❌ MongoDB connection failed:", sanitizedError);

  if (process.env.NODE_ENV === "development") {
    console.error("🛠️ Full error:", {
      code: err.code,
      reason: err.reason?.message,
      stack: err.stack,
    });
  }

  process.exit(1);
});

// Start Express Server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

// Graceful shutdown for unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection! Shutting down...");
  console.error(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
