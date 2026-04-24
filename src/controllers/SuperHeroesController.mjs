import {
    obtenerSuperheroePorId,
    obtenerTodosLosSuperheroes,
    buscarSuperheroesPorAtributo,
    obtenerSuperheroesMayoresDe30

    //importar nuevas funciones

    , crearSuperheroe,
    actualizarSuperheroe,
    eliminarSuperheroePorId,
    eliminarSuperheroePorNombre
} from '../services/SuperHeroesService.mjs';

import {
    renderizarSuperheroe,
    renderizarListaSuperheroes
} from '../views/responseView.mjs';




//http://localhost:3005/api/heroes/69b854d4d620b72eaec693b5
export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const superheroe = await obtenerSuperheroePorId(id);
        if (!superheroe) {
            return res.status(404).json({ mensaje: 'Superhéroe no encontrado' });
        }
        const superheroeFormateado = renderizarSuperheroe(superheroe);
        res.status(200).json(superheroeFormateado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el superhéroe', error: error.message });
    }
}


//http://localhost:3005/api/heroes/
export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}


//http://localhost:3005/api/heroes/buscar/edad/30
export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;
        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
        if (superheroes.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron superhéroes con ese atributo' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar los superhéroes', error: error.message });
    }
}






//http://localhost:3005/api/heroes/mayores-30
export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        if (superheroes.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }
        const superheroesFormateados = renderizarListaSuperheroes(superheroes);
        console.log(superheroesFormateados);
        res.status(200).json(superheroesFormateados);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener superhéroes mayores de 15', error: error.message });
    }
}





//nuevos métodos 
// POST  Crear superhéroe
//id 69e77a163d5766c9c03122fe
// POST 
//69e77f503d5766c9c0312301
//http://localhost:3005/api/heroes
export async function crearSuperheroeController(req, res) {
    try {
        const nuevoHeroe = await crearSuperheroe(req.body);
        res.status(201).json(nuevoHeroe);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear superhéroe', error: error.message });
    }
}

// PUT  Actualizar 
// id para modificar 69e782dd3d5766c9c0312308
// http://localhost:3005/api/heroes/69e782dd3d5766c9c0312308
export async function actualizarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const heroeActualizado = await actualizarSuperheroe(id, req.body);

        if (!heroeActualizado) {
            return res.status(404).json({ mensaje: 'Superhéroe no encontrado' });
        }

        res.status(200).json(heroeActualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar superhéroe', error: error.message });
    }
}

// http://localhost:3005/api/heroes/69e785053d5766c9c031230d
//                                       ELIMNABLE1                   ELIMNABLE2            ELIMNABLE3
// DELETE  Eliminar superhéroe por ID  69e785053d5766c9c031230d 69e785053d5766c9c031230d  9e785423d5766c9c0312311
export async function eliminarSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;
        const heroeEliminado = await eliminarSuperheroePorId(id);

        if (!heroeEliminado) {
            return res.status(404).json({ mensaje: 'Superhéroe no encontrado' });
        }

        res.status(200).json(heroeEliminado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar superhéroe', error: error.message });
    }
}

// DELETE  Eliminar superhéroe por nombre
export async function eliminarSuperheroePorNombreController(req, res) {
    try {
        const { nombre } = req.params;
        const heroeEliminado = await eliminarSuperheroePorNombre(nombre);

        if (!heroeEliminado) {
            return res.status(404).json({ mensaje: 'Superhéroe no encontrado' });
        }

        res.status(200).json(heroeEliminado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar superhéroe por nombre', error: error.message });
    }
}

// MOSTRAR DASHBOARD (renderiza la vista)
export async function mostrarDashboardController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();
        const mensaje = req.query.mensaje;
        const error = req.query.error;

        res.render('dashboard', {
            superheroes: superheroes,
            mensaje: mensaje,
            error: error
        });
    } catch (error) {
        res.status(500).render('dashboard', {
            superheroes: [],
            error: 'Error al cargar el dashboard'
        });
    }
}


// MOSTRAR FORMULARIO DE AGREGAR
export async function mostrarAgregarController(req, res) {
    res.render('addSuperhero');
}

// AGREGAR SUPERHÉROE (desde el formulario)
export async function agregarSuperheroeController(req, res) {
    try {
        const datos = req.body;

        // Convertir strings a arrays
        if (datos.poderes && typeof datos.poderes === 'string') {
            datos.poderes = datos.poderes.split(',').map(p => p.trim()).filter(p => p);
        }

        // NUEVOS: convertir aliados y enemigos
        if (datos.aliados && typeof datos.aliados === 'string') {
            datos.aliados = datos.aliados.split(',').map(a => a.trim()).filter(a => a);
        }

        if (datos.enemigos && typeof datos.enemigos === 'string') {
            datos.enemigos = datos.enemigos.split(',').map(e => e.trim()).filter(e => e);
        }

        await crearSuperheroe(datos);
        res.redirect('/api/heroes/dashboard');
    } catch (error) {
        res.render('addSuperhero', { error: error.message, oldData: req.body });
    }
}

// MOSTRAR FORMULARIO DE EDITAR (con datos precargados)
export async function mostrarEditarController(req, res) {
    try {
        const { id } = req.params;
        const heroe = await obtenerSuperheroePorId(id);

        if (!heroe) {
            return res.redirect('/api/heroes/dashboard');
        }

        res.render('editSuperhero', { heroe: heroe });
    } catch (error) {
        res.redirect('/api/heroes/dashboard');
    }
}

// ACTUALIZAR SUPERHÉROE (desde el formulario)
export async function editarSuperheroeController(req, res) {
    try {
        const { id } = req.params;
        const datos = req.body;
        
        // Convertir strings a arrays
        if (datos.poderes && typeof datos.poderes === 'string') {
            datos.poderes = datos.poderes.split(',').map(p => p.trim()).filter(p => p);
        }
        
        if (datos.aliados && typeof datos.aliados === 'string') {
            datos.aliados = datos.aliados.split(',').map(a => a.trim()).filter(a => a);
        }
        
        if (datos.enemigos && typeof datos.enemigos === 'string') {
            datos.enemigos = datos.enemigos.split(',').map(e => e.trim()).filter(e => e);
        }
        
        await actualizarSuperheroe(id, datos);
        res.redirect('/api/heroes/dashboard');
    } catch (error) {
        res.redirect(`/api/heroes/editar/${id}`);
    }
}



