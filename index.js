const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;




// middleware
app.use(cors());
app.use(express.json());

// college-booking
// nazMqJnM9YWz1R0f


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ojw1kya.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();




        // all API collection
        const collegeCollection = client.db("college-booking").collection("colleges");
        const reviewCollection = client.db("college-booking").collection("review");


        // get colleges data
        app.get('/colleges', async (req, res) => {
            const result = await collegeCollection.find().toArray();
            res.send(result)
        })

        // add colleges data
        app.post('/colleges', async (req, res) => {
            const item = req.body;
            console.log(item);
            const result = await collegeCollection.insertOne(item);
            res.send(result);
        })




        // get colleges data
        app.get('/review', async (req, res) => {
            const result = await reviewCollection.find().toArray();
            res.send(result)
        })

        // add colleges data
        app.post('/review', async (req, res) => {
            const item = req.body;
            console.log(item);
            const result = await reviewCollection.insertOne(item);
            res.send(result);
        })





        // Send a ping to confirm a successful connection
         client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('SIMPLE CRUD IS RUNNING')
})

app.listen(port, () => {
    console.log(`SIMPLE CRUD is running on port: ${port}`)
})