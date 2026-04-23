

class IRepository {
  obtenerPorId(id) {
    throw new Error("Método 'obtenerPorId()' error");
  }
  obtenerTodos() {
    throw new Error("Método 'obtenerTodos()' error");
  }
  buscarPorAtributo(atributo, valor) {
    throw new Error("Método 'buscarPorAtributo()' error");
  }
  obtenerMayoresDe30() {
    throw new Error("Método 'obtenerMayoresDe30()' error");
  }
}

export default IRepository;