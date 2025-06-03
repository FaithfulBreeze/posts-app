import { logEvents } from "./middlewares/logEvents"; //imports logEvents function
import { startServer } from "./services/databaseConnection";
import express from "express"; //express
import cookieParser from "cookie-parser"; //For cookies
import rootRoutes from "./routes/root";
import apiRoutes from "./routes/api/api";
import { join } from "path";
export const app = express(); //express

startServer();

app.use(express.urlencoded({ extended: false })); //For post requests from forms
app.use(express.static(join(__dirname, "public")));
app.use(logEvents.logRequest); //Logging requests on logs folder
app.use(cookieParser());

app.use("/", rootRoutes); //Routes for pages
app.use("/api", apiRoutes); //Routes for api
