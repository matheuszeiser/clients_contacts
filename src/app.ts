import "reflect-metadata";
import express from "express";
import clientsRouter from "./routes/clients";
import { loginRouter } from "./routes/login";


const app = express();
app.use(express.json());

app.use("/clients", clientsRouter)
app.use("/clients/login", loginRouter)

export default app;
