const express = reqaire("express");
const app = express();
const staticPath = 'client/build';
app.use(express.static(path.join(__dirname, staticPath)));

app.get("*", (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
});
const PORT = process.env.PORT | 1000;
app.listen(PORT);