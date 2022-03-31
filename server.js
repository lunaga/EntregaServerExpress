const express = require('express');
const app = express();
const {Router} = express;
const productos= Router();
const port = 8080 || process.env.port;


const Contenedor = require('./productos.js')
const prods = new Contenedor('./productos.txt')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos',productos)
app.use('/static', express.static('public'))

//Muestra los productos
app.get('/', (req, res) => {
    prods.getAll().then(resp => res.send(resp))
})


//Id por prodcuto

app.get('/:id', (req, res) => {
    prods.getById(req.params.id).then(resp => res.send(resp))
})



//Agrega un producto 

app.post('/', (req, res) => {
    const addedProduct = req.body
    prods.push(addedProduct)
    res.send(prods)
})



//Actualiza producto 

app.put('/:id', (req, res) => {  
})



//Elimina segun su id


app.delete('/:id', (req, res) => {
    prods.getById(req.params.id).then(resp => res.send(`Se elimino el producto id: ${req.params.id}`))
    
})



app.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
})
