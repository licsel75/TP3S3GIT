import express from 'express';
import {
  obtenerSuperheroePorIdController,
  obtenerTodosLosSuperheroesController,
  buscarSuperheroesPorAtributoController,
  obtenerSuperheroesMayoresDe30Controller,
  //importar nuevos controladores
  crearSuperheroeController,
  actualizarSuperheroeController,
  eliminarSuperheroePorIdController,
  eliminarSuperheroePorNombreController,
  //  nueva ruta la del dashboard
  mostrarDashboardController,
  mostrarAgregarController,
  agregarSuperheroeController,
  mostrarEditarController,
  editarSuperheroeController
} from '../controllers/SuperHeroesController.mjs';

// Importar validaciones
import { validarSuperheroe, validarActualizacion } from '../validations/superheroeValidations.mjs';
import { manejarErroresValidacion } from '../middlewares/validationHandler.mjs';

const router = express.Router();

// router.get('/heroes', obtenerTodosLosSuperheroesController);
// router.get('/heroes/:id', obtenerSuperheroePorIdController);
// router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
// router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);

//  invierto el orden de las rutas para que no tome mayores-30 como  el valro de :id

router.get('/heroes/dashboard', mostrarDashboardController);// coloco esta ruta antes de las que usan parámetros 
router.get('/heroes/agregar', mostrarAgregarController);
router.post('/heroes/agregar', validarSuperheroe(), manejarErroresValidacion, agregarSuperheroeController);//con validacion y manejo de errores
router.get('/heroes/editar/:id', mostrarEditarController);
router.post('/heroes/editar/:id',validarSuperheroe(), manejarErroresValidacion, editarSuperheroeController);//con validacion y manejo de errores





router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/:id', obtenerSuperheroePorIdController);
router.get('/heroes', obtenerTodosLosSuperheroesController);



// NUEVAS RUTAS 
// router.post('/heroes', crearSuperheroeController);  ruta antes de la validación 
router.post('/heroes', validarSuperheroe(), manejarErroresValidacion, crearSuperheroeController
);//validarSuperheroe() se agraga validación , manejarErroresValidacion y manejo de errores


//router.put('/heroes/:id', actualizarSuperheroeController); ruta de actualización antes de validar

router.put('/heroes/:id',
  validarActualizacion(), manejarErroresValidacion, actualizarSuperheroeController
);//validarSuperheroe() se agraga nuevamente  validación , manejarErroresValidacion y  manejo de errores



router.delete('/heroes/:id', eliminarSuperheroePorIdController);
router.delete('/heroes/nombre/:nombre', eliminarSuperheroePorNombreController);

export default router;