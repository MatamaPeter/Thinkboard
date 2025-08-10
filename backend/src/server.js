import express from 'express';
import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;


app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json())


app.use(rateLimiter)


app.use('/api/notes', notesRoutes)


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







