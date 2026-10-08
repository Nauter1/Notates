import express, {type Request,type Response,type NextFunction } from "express"
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

const posts = [
    { id: 1, title: "String Theory", content: "FilePath1", description: "Here is my song!"},
    { id: 2, title: "Never Gonna Give You Up", content: "FilePath2", description: "Hah, Gotem"},
    { id: 3, title: "Meridian", content: "FilePath3", description: "Song time! !"},
]

app.get("/", (req: Request, res: Response) => {
    res.send("Töötab?")
})

app.get("/posts", (req: Request, res: Response) => {
    const result = posts.map(post=>({id: post.id, title: post.title, description: post.description}))
    res.send(result)
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})