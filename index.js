const express = require("express");
const path = require("path");
const app = express();

const publicDir = 'client/build'
app.use(express.static(path.join(__dirname,publicDir)));

app.get("*",(_,res)=>{
    res.sendFile(path.join(publicDir,'index.html'));
});

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
});