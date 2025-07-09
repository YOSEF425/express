import express from 'express';
import * as a from fs


const server = express();


server.get('/',(req,res) => {
    res.send("hello from server")
})


server.post('/',async(req,res) => {
    try{
    const fileData = await fs.readFile('file.txt','utf8')
    const data = (fileData)? JSON.parse(fileData):[];
    if(!data) res.status(500).send('server internal error')    
    data.push(req.body);
    await fs.writeFile('file.txt',JSON.stringify(data))
    res.status(201).send('success')
    }catch(err){
        res.status(err.status || 500).send(err.message || "server internal error")
    }
})


server.listen(3000,() => console.log('listening on port 3000'))


