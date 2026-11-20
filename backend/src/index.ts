import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express"
import swaggerDoc from "./docs/swagger.json" with {type:"json"}
import { sync } from "./db.ts"
import cookieParser from "cookie-parser";

import appRoutes from "./routes/appRoutes.ts";

const port = process.env.PORT || 3000;
const host = "localhost";

const app = express();

const frontendURL = process.env.FRONTEND_URL;

if(!process.env.JWT_SECRET || !frontendURL){
    throw new Error ("SIRE! CONFIGURE THE TOKEN SECRET AND FRONT END ADDRESS")
}

app.use(cors({
    origin: frontendURL,
    credentials: true
}))
app.use(express.json())
app.use(express.json())
app.use(cookieParser())

app.use((req,res,next) => {
    if (["GET","HEAD","OPTIONS"].includes(req.method)){
        return next();
    }
    const origin = req.get("Origin")
    //if(origin !== frontendURL){
    //    return res.status(403).send({error: "Request origin not allowed"})
    //}
    next();
})


app.use("/docs/openapi.json", (req, res)=>{
    res.json(swaggerDoc)
})

app.use("/docs",swaggerUI.serve,swaggerUI.setup(swaggerDoc))
appRoutes(app);
//TODO: installi swaggerile vajalikud paketid
app.listen(port, async () => {
    if (process.env.SYNC === "true") {
        await sync();
    }
    console.log(`api jookseb aadressil http://${host}:${port}`)
})