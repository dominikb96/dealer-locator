import express from "express";
import cors from "cors";
import dealersRouter from "./routes/dealers.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/dealers", dealersRouter);

app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});
