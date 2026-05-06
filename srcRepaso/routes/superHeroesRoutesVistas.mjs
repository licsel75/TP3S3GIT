import express from 'express';
import {
    dashboardController,
    showAddFormController,
    createSuperheroeController,   
    showEditFormController,
    updateSuperheroeController,
    deleteSuperheroeController
} from '../controllers/superheroesController.mjs';

import { validateSuperheroe } from '../validations/superheroeValidations.mjs';

const router = express.Router();

// Dashboard
router.get('/', dashboardController);

// Agregar
router.get('/agregar', showAddFormController);
router.post('/agregar', validateSuperheroe, createSuperheroeController);

// Editar
router.get('/editar/:id', showEditFormController);

router.put('/editar/:id', validateSuperheroe, updateSuperheroeController);

// Eliminar (desde form o fetch)
router.post('/eliminar/:id', deleteSuperheroeController);

export default router;