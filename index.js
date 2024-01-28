// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q=ghatal&appid=ed933036b1742e5819eb041550a0d671
const express = require("express");
const ejs = require("ejs");

const app = express();

app.set("view engine" , "ejs");
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 8000;
app.get("/",(req, res) => {
        res.status(200).render("home")
    }
)
// app.get("/home.css",(req,res)=>{
//     res.status(200).render("home.css");
// })

// app.get("/home.js",(req,res)=>{
//     res.status(200).render("home.js")
// })

app.use((req,res,next)=>{
    res.send('<h1> Error 404 <\h1>');
})

app.listen(port, () => {
        console.log(`Server is listening on ${port}`);
});
