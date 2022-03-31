const fs = require ('fs')


class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    }



    async save(objeto){
        try {
            for(let i=0; i< objeto.length;i++){
                objeto[i].id= 1+ i
            }
            console.table(objeto)
            await fs.promises.writeFile(this.archivo,JSON.stringify(objeto))
        } catch (error) {
            throw new Error(error,'Error no se puede guardar el producto')
        }
    }


    async getById(id){
        try{
            const contenido = await this.getAll()
            let idencontrado = contenido.find(prod => prod.id === id)
            console.table(idencontrado)
        }catch(error){
            throw new Error(error,"Error no se encuentra dicho producto")
        }
    }


    async getAll(){
        try{
            let contenido = await fs.promises.readFile(this.archivo, "utf8");
            return JSON.parse(contenido)
        } catch(error){
            throw new Error(error,"Error al leer el archivo")
        }
    }


    async deleteById(id){
        try{
            const contenido = await this.getAll()
            const deleted = contenido.filter(producto => producto.id !== id)
            await fs.promises.writeFile(this.archivo, JSON.stringify(deleted,null,4))
            console.log('Elemento eliminado')
            console.table(deleted)
        }catch(error){
            throw new Error(error,"Error al borrar el producto")
        }
    }


    async deleteAll(){
        try{
            await fs.promises.writeFile(this.archivo, []);
            console.log("Contenido borrado")
        } catch(error){
            throw new Error(error,"Error al borrar todo")
        }
    }
}

module.exports = Contenedor;
