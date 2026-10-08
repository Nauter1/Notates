import express, {type Request,type Response,type NextFunction } from "express"
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

const badges = [

    { id: 1, name: "JoinDate", value: Date},
    { id: 2, name: "isAdmin", value: Boolean},
    { id: 3, name: "postCount", value: Number},
    { id: 4, name: "isPlusMember", value: Boolean},
    { id: 5, name: "reactionCount", value: Number},
    { id: 6, name: "isVerifiedArtist", value: Boolean}

]
app.get("/", (req: Request, res: Response) => {
    res.send("Tööfgfdtab?")
})

app.get("/badges", (req: Request, res: Response) => {
    const result = badges.map(badge => ({id: badge.id, name: badge.name}));
    res.send(result)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})