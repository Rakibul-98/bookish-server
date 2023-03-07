const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


// middle wires
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.orrv34p.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {
        const categoryCollection = client.db('bookish').collection('categories');

        app.get('/categories', async(req, res)=>{
            const query ={}
            const cursor = categoryCollection.find(query);
            const categories = await cursor.toArray();
            res.send(categories);
        })

        app.get('/categories/:id', async(req, res)=>{
            const id=req.params.id;
            const query ={ _id: new ObjectId(id)};
            const category = await categoryCollection.findOne(query);
            res.send(category);
        })
    } 
    finally{
        
    }
}
run().catch(err=>console.error(err));

app.get('/', (req,res)=>{
    res.send("Server is running");
})

app.listen(port, ()=>{
    console.log(`server is running on ${port}`);
})
