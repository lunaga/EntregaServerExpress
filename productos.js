const {promises: fs} = require('fs');

class Contenedor{
    constructor(archivo){
        this.archivo = archivo;
    }

    async save(obj){
        const objs = await this.getAll()
        let newId 
        if (objs.length == 0){
            newId = 1
        } else{
            newId = objs[objs.length - 1].id +1
        }
        const newObj = {...obj, id: newId}
        objs.push(newObj)
        try{
            await fs.writeFile(this.archivo,JSON.stringify(objs,null,4));
            return newId;
        } catch(err){
            console.log('Error',err)
        }
    }

    async getById(id){
        const objs = await this.getAll()
        const buscarId= objs.find(obs => obs.id == id)
        return buscarId
    }

    async getAll(){
        try{
            const objs = await fs.readFile(this.archivo,'utf-8')
            return JSON.parse(objs)
        }
        catch(err){
            return "Error, no se encuentran los prod"
        }
    }

    async deleteById(id){
        try {
            const cont = await fs.readFile(this.archivo, 'utf-8');

            if (cont === "") {
                return "Empty list";
            } else {
                const products = JSON.parse(cont);
                const newProducts = products.filter((item) => item.id !== id)
                await fs.writeFile(this.archivo, JSON.stringify(newProducts));
            }
        } catch (err) {
            console.log('Error',err)
        }
    }
    

    async deleteAll(){
        try{
            await fs.promises.writeFile(`./${this.archivo.toString()}.txt`,"")
            console.log("Se elimino el contenido")
        }
        catch(err){
            console.log('Error',err)
        }
    }

    // async updateProduct(id,productoNuevo){
    //     try{
    //         const productos = this.getAll()
    //         const index = productos.findIndex(prod => prod.id === id)
    //         if(productoNuevo.name){productos[index].name= productoNuevo.name}
    //         if(productoNuevo.price){productos[index].price=productoNuevo.price}
    //         if(productoNuevo.thumbnail){productos[index].thumbnail=productoNuevo.thumbnail}
    //         return `El producto ${productoNuevo.name} fue actualizado correctamente`
    //     } catch(error){
    //         throw new Error(error,"Error al actualizar el producto")
    //     }
    // }

    // async modifyById(){
    //     try{
    //         await fs.promises.writeFile
    //     }
    // }
}

module.exports = Contenedor