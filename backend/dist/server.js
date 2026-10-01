import express, {} from "express";
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Töötab?");
});
app.listen(PORT, () => {
    console.log(`Server is running on https://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map