import express from "express"

const PORT = 5050


const server = express();


function logger(req,res,next){
    console.log(`got req to: ${req.method}, url: ${req.url}`);
    req.isOk = true;
    next()
}


server.use(logger);
server.use(express.json());


server.get('/greet',(req,res) => {
    console.log(`is ok? ${req.isOk}`)
    res.send(JSON.stringify({message:`hi from get endpoint, ${new Date().toLocaleTimeString()}`}))
})

server.get('/greet/:name',(req,res) => {
    const name = req.params.name
    console.log(`i got name: ${name}`)
    res.send(JSON.stringify({message: `got name ${name}`}))
})


server.post('/action',async(req,res) => {
    const chosenAction = req.body.name;
    if(chosenAction !== "joke" && chosenAction !== "cat fact"){
        res.status(404) 
        res.json({message:"body is malformed"})

    }
    if(chosenAction === "joke"){
        const response = await fetch("https://official-joke-api.appspot.com/random_joke")
        const data = await response.json()
        server.send(data)
    
        

        
        
    }

    



})































server.listen(PORT,() => {
    console.log(`express server listening on port: ${PORT}`);
})