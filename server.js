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
productos.get('/', (req, res) => {
    prods.getAll().then(resp => res.send(resp))
})


//Id por prodcuto

productos.get('/:id', (req, res) => {
    prods.getById(req.params.id).then(resp => res.send(resp))
})



//Agrega un producto 


productos.post('/', (req, res) => {
    const nuevoprod = req.body
    prods.save(nuevoprod)
    res.send({ Productos: 'Guardados' })
})



//Actualiza producto 

// productos.put('/:id', (req, res) => {
//     const prodmodificado = req.body
//     prods.modifyById(req.body)
//     res.send({ obj: 'Producto modificado!' })
// })

// productos.put('/:id',(req, res)=>{
//     const {id} = req.params
//     let productoNuevo = req.body
//     let resp = producto.updateProduct(parseInt(id),productoNuevo)
//     res.json(resp)
// })

//Elimina segun su id


productos.delete('/:id', (req, res) => {
    prods.getById(req.params.id).then(resp => res.send(`Se elimino el producto id: ${req.params.id}`))
    
})


app.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto ${port}`);
})


