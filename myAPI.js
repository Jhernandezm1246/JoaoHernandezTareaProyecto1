//connectar a mongo express y body parser
//estas son las dependencias

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port =5555;

//defiinir un modelo de coneccion

//mongodb+srv://user1:Welcome1@cluster0.6znww1o.mongodb.net/?retryWrites=true&w=majority
mongoose.connect("mongodb+srv://user1:Welcome1@cluster0.6znww1o.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser:true});
const db =  mongoose.connection;

//modelo de datos

const User = mongoose.model("User",{
    name:String,
    email:String,
});

//Middleware para pasar datos

app.use(bodyParser.urlencoded({extended:true}));


//Send HTML como resultado

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});


//Manejo del envio de formulario

app.post("/add", async (req,res) => {
    const { name, email } = req.body;

    const newUser = new User({ name, email});

    try {
        await newUser.save();
        console.log("Usuario agregado exitosamente");
        res.redirect("/");
    }catch (err) {
        console.error("Error insertando el documente:", err);
        res.status(500).send("Error agregando usuario"); 
    }
});

    //newUser.save((err)=>{
        //if(err){
            //console.error("Error insertando el documento");
            //res.status(500).send("Error agregnado usuario");
        //}else{
           //console.log("Usuario agregado exitosamente");
           // res.redirect("/");
       // }
   // })
//})

//Escuchar el servidor

app.listen(port,() => {
    console.log(`server is running on port ${port}`);
});