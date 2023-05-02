import express from "express";
import {ProductManager} from "./Desafio Clase 4.js";

const app = express();
const port = 3000;

const PM = new ProductManager("./DBProductManager.txt");

app.listen(port, ()=> {
    console.log('Server up in http://localhost:'+port)
});

app.get('/products', async (req,res) =>{
    const filter = req.query.filter;
    let productsTemp = await PM.getProducts();
    let products = productsTemp;

    if(filter != null){
        if(!isNaN(filter)){
            products = productsTemp.slice(0,filter);
        }
    }

    res.json(products);

});

app.get('/products/:id', async (req,res) =>{
    let id = req.params.id;
    console.log(id);
    
    if(!isNaN(id)){
        let product = await PM.getProductByID(id);
        res.json(product);
    }
    
});