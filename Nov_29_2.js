import express from "express";

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Welcome to express JS');
})

app.get('/api',(req,res)=>{
    res.send('Welcome to API Page');
})

app.get('/api/about',(req,res)=>{
    res.send(`Hello I am ${req.query.name}`);
})

app.get("/products", (req, res) => {
    res.send(`Finding the product: ${req.query.product}`);
});

app.get("/contact/:fname",(req,res)=>{
    res.send(`<html><body>I am <b>${req.params.fname}</b></body></html>`);
})

app.get("/introduction",(req,res)=>{
    res.sendFile("D:/Infosys EdgeVerve/Node js/Day-3/index.html")
})

app.post("/api",(req,res)=>{
    res.json({
        id:1,
        name:req.body.name
    })
})

// PUT replaces the whole content and patch replaces what the content we change
app.patch("/api",(req,res)=>{ 
    res.send("PUT Request");
})

app.delete("/api",(req,res)=>{
    res.send('DELETE Request');
})

app.listen(8080,()=>{
    console.log('connected');
})