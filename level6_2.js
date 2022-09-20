const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credentials = require("./demo_firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.use(express.json());

app.use(express.urlencoded({extended: true}));


const db = admin.firebase();

app.post('/create',async (req, res) => {
    try{
        console.log(req.body);
        const id = req.body.email;
        const userJson = {
            email: req.body.email,
            firstNmae: req.body.firstName,
            lastName: req.body.lastName
        };
        const reponse =await db.collection("users").add(userJson);
        res.send(response);
    }catch(error) {
        res.send(error);
    }
});


app.get('/read/all', async (req, res) => {
    try{
        const userRef = db.collection("users");
        const response = await userRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    }catch(error){
        res.send(error);
    }
});

app.get('/read/:id', async (req, res) => {
    try{
        const userRef = db.collection("users").doc(req.params.id);
        const response = await userRef.get();
        res.send(response.data());
    }catch(error){
        res.send(error);
    }
});

app.get('/update', async (req, res) => {
    try{
        const id = req.body.id;
        const newFirstNmae = "hello world";
        const userRef =await db.collection("users").doc(id);
        update({
            firstName: newFirstNmae
        });
        
        res.send(response);
    }catch(error){
        res.send(error);
    }
});

app.get('/update', async (req, res) => {
    try{
        const id = req.body.id;
        const newFirstNmae = "hello world";
        const userRef =await db.collection("users").doc(id);
        update({
            firstName: newFirstNmae
        });
        
        res.send(response);
    }catch(error){
        res.send(error);
    }
});

app.delete('/delete/:id', async (req, res) => {
    try{
        
        const response =await db.collection("users").doc(id);
        res.send(response);
    }catch(error){
        res.send(error);
    }
});





const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server is running on PORT ${PORT}.');
})