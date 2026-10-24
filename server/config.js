import "dotenv/config";

export const config = {
  port: Number(process.env.PORT) || 5001,
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/yatrawise",
  exportDir: process.env.EXPORT_DIR || "server/exports",
  logDir: process.env.LOG_DIR || "server/logs",
  adminApiKey: process.env.ADMIN_API_KEY || "",
  isProduction: process.env.NODE_ENV === "production",
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173"
};
