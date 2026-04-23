import { body } from 'express-validator';

// Validaciones para crear 

export const validarSuperheroe = () => [
    // nombreSuperHeroe: requerido, trim, min 3, max 60
    body('nombreSuperHeroe')
        .notEmpty().withMessage('El nombre del superhéroe es requerido')
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('El nombre del superhéroe debe tener entre 3 y 60 caracteres'),
    
    // nombreReal: requerido, trim, min 3, max 60
    body('nombreReal')
        .notEmpty().withMessage('El nombre real es requerido')
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres'),
    
    // edad: requerido, numérico, trim, mínimo 0
    body('edad')
        .notEmpty().withMessage('La edad es requerida')
        .trim()
        .isNumeric().withMessage('La edad debe ser un número')
        .isInt({ min: 0 }).withMessage('La edad no puede ser negativa'),
    
    // poderes: requerido, array no vacío, cada elemento: trim, min 3, max 60
    body('poderes')
        .notEmpty().withMessage('Los poderes son requeridos')
        .isArray({ min: 1 }).withMessage('Los poderes deben ser un array con al menos un elemento')
        .custom((poderes) => {
            for (const poder of poderes) {
                if (typeof poder !== 'string') {
                    throw new Error('Cada poder debe ser un texto');
                }
                const trimmedPoder = poder.trim();
                if (trimmedPoder.length < 3 || trimmedPoder.length > 60) {
                    throw new Error('Cada poder debe tener entre 3 y 60 caracteres');
                }
            }
            return true;
        })
];

// Validaciones para actualizar 

export const validarActualizacion = () => [
    body('nombreSuperHeroe')
        .optional()
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('El nombre del superhéroe debe tener entre 3 y 60 caracteres'),
    
    body('nombreReal')
        .optional()
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('El nombre real debe tener entre 3 y 60 caracteres'),
    
    body('edad')
        .optional()
        .trim()
        .isNumeric().withMessage('La edad debe ser un número')
        .isInt({ min: 0 }).withMessage('La edad no puede ser negativa'),
    
    body('poderes')
        .optional()
        .isArray({ min: 1 }).withMessage('Los poderes deben ser un array con al menos un elemento')
        .custom((poderes) => {
            if (!poderes) return true;
            for (const poder of poderes) {
                if (typeof poder !== 'string') {
                    throw new Error('Cada poder debe ser un texto');
                }
                const trimmedPoder = poder.trim();
                if (trimmedPoder.length < 3 || trimmedPoder.length > 60) {
                    throw new Error('Cada poder debe tener entre 3 y 60 caracteres');
                }
            }
            return true;
        })
];