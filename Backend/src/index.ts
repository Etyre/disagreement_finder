import { Client } from 'pg'
import express  from 'express'
import bodyParser from 'body-parser'
import bcrypt from 'bcrypt'

async function main() { 
    // We're constructing a clinet which accessing postgress database via TCP, 
    // as if it was over the internet, but it's actually on our local machine currently.
    const client = new Client()
    // This makes a connection between the current running process and the database (the one that has my username on the local machine).
    await client.connect()

    // We're making a query that we'll get back as response promise.
    const res = await client.query('SELECT $1::text as message', ['Hello world!'])
    // We're logging a part to the response that we index into.
    console.log(res.rows[0].message) // Hello world!
    // closing the connection.
    await client.end()
}

// The express function is the main event loop that takes care of incoming connection.
// App is an object, as constructed by express()
const app = express();
app.use(bodyParser.json())


// We set the port to a number we like.
app.set("port", 8080)

// app.get is the function that handles anyone making a get request to any part of the 
// server that we just set up.
// The first argument is the domain under which this function applies. By putting a "/", we're putting the root
// of the website, which means that we're counting the whole site as the domain of this function.
// req and res are in the incoming data from the user, and the outgoing data to the server.


// THE API ENDPOINTS

// Create a new user / signup
app.post ("/createuser", async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const emailAddress = req.body.emailAddress

    if (username == undefined){
        throw Error ("Username must be given")
    }
    
    if (password == undefined){
        throw Error ("Password must be given")
    }

    if (emailAddress == undefined){
        throw Error ("Password must be given")
    }

    const PGclient = new Client()    
    await PGclient.connect()
    try {
        const hashedPassword = await bcrypt.hash(password, 8)
        const placeholder = await PGclient.query('INSERT INTO users (username, email_address, password_hash) VALUES($1::text,$2::text,$3::text)',[username, emailAddress, hashedPassword])
        res.status(200)
    }catch (e){
        res.send("an error occured").status(500)
    }
    finally{
        await PGclient.end()
    }
})

// To express an opinion on a statement.

// To create a new statement.

// To list a user's opinions on statements.

// Get next 50 statements

// Change password

// Change username

//app.listen starts the server. This line never exits.
app.listen(app.get("port"));



