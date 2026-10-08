import express, {type Request,type Response,type NextFunction } from "express"

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

const posts = [
    { id: 1, title: "String Theory", content: "FilePath1", description: "Here is my song!"},
    { id: 2, title: "Never Gonna Give You Up", content: "FilePath2", description: "Hah, Gotem"},
    { id: 3, title: "Meridian", content: "FilePath3", description: "Song time! !"},
]
const reactions = [
    {id:1,name:"like", user: "sigmagoon"},
    {id:2,name:"heart", user: "alphagoon"},
    {id:3,name:"dislike", user: "basicuser"}
]

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

app.get("/posts", (req: Request, res: Response) => {
    const result = posts.map(post=>({id: post.id, title: post.title, description: post.description}))
    res.send(result)
})


app.get("/reactions", (req: Request, res: Response) => {
    const result = reactions.map(reaction =>({id: reaction.id,name: reaction.name}));
    res.send(result);
})

app.get("/reactions/:id",(req: Request,res:Response)=>{
    const gameId = req.params.id ?
        typeof req.params.id === "string" ? 
            parseInt(req.params.id) 
            : parseInt(req.params.id[0]!)
        : null
    const result = reactions.filter(reaction => reaction.id === gameId)[0]
    if(result == undefined){
        res.status(404).send({error:"Result is undefined"})
    }
    else if(!req.params.id!){
        res.status(400).send({error:"GET parameters required"})
    }
    res.send(result)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})