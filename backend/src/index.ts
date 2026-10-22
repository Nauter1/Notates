import "dotenv/config"
import express from "express";
import cors from "cors";
import { sync, connect } from "../db.ts";
import appRoutes from "../routes/appRoutes.ts"

const post = process.env.PORT
const host = "localhost";

const app = express();

app.use(cors())
app.use(express.json());

appRoutes(app);

app.listen(port, async())=> {
    if (process.env.SYNC === "true") {
        await sync();
    }
    console.log(`API töötab aadressil http://${host}:${port}`)
}


//bro fak tis cood