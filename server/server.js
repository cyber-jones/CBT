const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./Data/connect.js");
const authRoutes = require("./routes/auth");
const examRoutes = require("./routes/exam");
const feedbackRoutes = require("./routes/feedback");
const studentRoutes = require("./routes/student.js");
const staffRoutes = require("./routes/staff.js");
const courseRoutes = require("./routes/course.js");
const departmentRoutes = require("./routes/department.js");
const __dirname = require("./config/directoryConfig.js");
const errorHandler = require("./config/errorHandler.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());
const URI = process.env.MONGOOSE_DEV_URI;

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

app.get("/", (req, res) => {
  res.send("CBT System Backend");
});

app.all("*", (req, res) => {
  res.status(404);

  if (req.accepts("html"))
    res.sendFile(path.join(__dirname, "views", "404.html"));
  else if (req.accepts("json"))
    res.json({ success: false, error: "404 Not found" });
  else res.type("txt").send("404 Not found");
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
