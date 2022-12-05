import "reflect-metadata";
import express from "express";
import clientsRouter from "./routes/clients";
import {loginRouter} from "./routes/login";
import phoneRouter from "./routes/phone";
import contactRouter from "./routes/contacts";

const app = express();
app.use(express.json());

app.use("/clients", clientsRouter);
app.use("/clients/login", loginRouter);
app.use("/clients/phone", phoneRouter);
app.use("/contacts", contactRouter);

export default app;
