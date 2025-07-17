import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helment from "helmet";
import connectDb from "./Data/connect.js";
import authRoutes from "./routes/auth.js";
import examRoutes from "./routes/exam.js";
import feedbackRoutes from "./routes/feedback.js"; 
import studentRoutes from "./routes/student.js";
import staffRoutes from "./routes/staff.js";
import courseRoutes from "./routes/course.js";
import refreshRoutes from "./routes/refresh.js";
import departmentRoutes from "./routes/department.js";
import collegeRoutes from "./routes/college.js";
import __dirname from "./config/directoryConfig.js";
import errorHandler from "./config/errorHandler.js";
import { corsOptions } from "./config/corsOption.js";
import { credentials } from "./middlewares/corsCredentials.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(helment());
app.use(express.json());
app.use(cookieParser());
const URI = process.env.MONGOOSE_PRODUCTION_URI;

// Connect to MongoDB
connectDb(URI);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/college", collegeRoutes);
app.use("/api", refreshRoutes);

app.get("/", (req, res) => {
  res.send("CBT System Backend");
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
