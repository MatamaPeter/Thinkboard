import express from 'express';
import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors'
import path from 'path'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const __dirname =path.resolve()


if (process.env.NODE_ENV !== "production") {

  app.use(
    cors({
      origin: ["http://localhost:5173"],
    })
  );
}
app.use(express.json())


app.use(rateLimiter)


app.use('/api/notes', notesRoutes)


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(" Failed to connect to DB", error);
        process.exit(1);
    }
}

startServer();







