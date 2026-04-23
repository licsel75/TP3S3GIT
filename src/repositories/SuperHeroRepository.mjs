import SuperHero from '../models/superHero.mjs';
import IRepository from '../repositories/IRepository.mjs';

class SuperHeroRepository extends IRepository {
  
  
   
  
  async obtenerPorId(id) {
    return await SuperHero.findById(id);
  }


  async obtenerTodos() {
    return await SuperHero.find({});
  }




  async buscarPorAtributo(atributo, valor) {
    // buscar por cualquier atributo con su valor
    const query = {};
    query[atributo] = valor;
    return await SuperHero.find(query);
  }






  async obtenerMayoresDe30() {
    // encontrar superhéroes con edad > 30

    const mayores = await SuperHero.find({ edad: { $gt: 30 } });
  console.log(' REPOSITORIO: Mayores de 30 encontrados:', mayores.length);
  
  return mayores;

  }



  //AGREGADOS

async crear(data) {
    const nuevoHeroe = new SuperHero(data);  
    await nuevoHeroe.save();
    return nuevoHeroe;
  }
  
  async actualizar(id, data) {
    return await SuperHero.findByIdAndUpdate(id, data, { new: true });  
  }
  
  async eliminarPorId(id) {
    return await SuperHero.findByIdAndDelete(id);  
  }
  
  async eliminarPorNombre(nombre) {
    return await SuperHero.findOneAndDelete({ nombreSuperHeroe: nombre });  
  }
}


  


export default new SuperHeroRepository();