import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerSuperheroePorId(id) {
  return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
  return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
  return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
  return await superHeroRepository.obtenerMayoresDe30();
}







//nuevas funciones 
// Crear nuevo superhéroe
export async function crearSuperheroe(data) {
    return await superHeroRepository.crear(data);
}

export async function actualizarSuperheroe(id, data) {
    return await superHeroRepository.actualizar(id, data);
}

export async function eliminarSuperheroePorId(id) {
    return await superHeroRepository.eliminarPorId(id);
}

export async function eliminarSuperheroePorNombre(nombre) {
    return await superHeroRepository.eliminarPorNombre(nombre);
}