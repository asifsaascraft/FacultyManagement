// new server file
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import checkInDetailRoutes from "./routes/checkInDetailRoutes.js";

await connectDB();

const app = express();

/* -------------------------------
   FIXED CORS (iPhone + Vercel)
--------------------------------*/
const allowedOrigins = [
  "http://localhost:3000",
  "https://aroicon-checkin.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      console.log("❌ CORS blocked:", origin);
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // fix safari
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("AROICON Faculty Management Backend is running...");
});

app.use("/api/users", authRoutes);
app.use("/api", checkInDetailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);




// old server file
// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import cors from "cors";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";

// import authRoutes from "./routes/authRoutes.js";
// import checkInDetailRoutes from "./routes/checkInDetailRoutes.js";


// await connectDB();

// const app = express();

// // =======================
// // CORS setup for multiple frontend
// // =======================
// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://aroicon-checkin.vercel.app",
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if(allowedOrigins.includes(origin)){
//       callback(null, true);
//     } else {
//       console.log("Blocked by cors:", origin);
//       callback(new Error("Not allowed by CORS"), false)
//     }
//   },
//   credentials: true,
// };


// app.use(express.json());
// app.use(cors(corsOptions));
// app.use(cookieParser()); // Needed to read cookies (refresh token)
// app.use(morgan("dev"));

// // =======================
// // Health check
// // =======================
// app.get("/", (req, res) => {
//   res.send("AROICON Faculty Management Backend is running ..... ");
// });

// // =======================
// // API Routes
// // =======================
// app.use("/api/users", authRoutes);
// app.use("/api", checkInDetailRoutes);


// // =======================
// // Start server
// // =======================


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
