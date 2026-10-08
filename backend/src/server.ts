import express, {type Request,type Response,type NextFunction } from "express"

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

const reactions = [
    {id:1,name:"like", user: "sigmagoon"},
    {id:2,name:"heart", user: "alphagoon"},
    {id:3,name:"dislike", user: "basicuser"}
]


app.get("/", (req: Request, res: Response) => {
    res.send("Töötab?")
})

app.get("/reactions", (req: Request, res: Response) => {
    const result = reactions.map(reaction =>({id: reaction.id,name: reaction.name}));
    res.send(result);
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})