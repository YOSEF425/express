import express from "express"

const PORT = 5050


const server = express();


server.get('/greet',(req,res) => {
    res.send(JSON.stringify({message:`hi from get endpoint, ${new Date().toLocaleTimeString()}`}))
})




server.listen(PORT,() => {
    console.log(`express server listening on port: ${PORT}`);
})