import { fastify } from "fastify"

//import { databaseMemory } from "./databaseMemory.js"
import { databasePostgres } from "./database-postgres.js"

//const database = new databaseMemory()
const database = new databasePostgres()

const server = fastify()

server.post('/videos', async (req, res)=>{
    const {title, description, duration} = req.body


    await database.create({
        title:title,
        description: description,
        duration: duration,
    })

    return res.status(201).send()
})

server.get('/videos', async(req, res)=>{
    const videos = await database.list()
    console.log(videos)
    return videos
})

server.get('/videos?search=node', (req, res)=>{
    const search = req.query.search
    const videos = database.list(search)
    
    return videos 
    
})

server.put('/videos/:id', async(req, res)=>{
    const videoId = req.params.id
    const {title, description, duration} = req.body

    await database.update(videoId,{
        title:title,
        description:description,
        duration:duration
    })
    return res.status(204).send({"alteração":"ok"})
})

server.delete('/videos/:id', async(req, res)=>{
    const videoId = req.params.id
    await database.delete(videoId)

    return res.status(204).send
})

server.listen({
    port:3333,
})