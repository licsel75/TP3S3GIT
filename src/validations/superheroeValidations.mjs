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
    //debilidad
    body('debilidad')
        .optional()
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('La debilidad debe tener entre 3 y 60 caracteres'),

    // aliados (opcional, pero si viene, validar)
    body('aliados')
        .optional()
        .custom((aliados) => {
            if (!aliados) return true;

            let aliadosArray = aliados;
            if (typeof aliados === 'string') {
                aliadosArray = aliados.split(',').map(a => a.trim()).filter(a => a);
            }

            for (const aliado of aliadosArray) {
                if (aliado.length < 3 || aliado.length > 60) {
                    throw new Error('Cada aliado debe tener entre 3 y 60 caracteres');
                }
            }
            return true;
        }),

    // enemigos (opcional, pero si viene, validar)
    body('enemigos')
        .optional()
        .custom((enemigos) => {
            if (!enemigos) return true;

            let enemigosArray = enemigos;
            if (typeof enemigos === 'string') {
                enemigosArray = enemigos.split(',').map(e => e.trim()).filter(e => e);
            }

            for (const enemigo of enemigosArray) {
                if (enemigo.length < 3 || enemigo.length > 60) {
                    throw new Error('Cada enemigo debe tener entre 3 y 60 caracteres');
                }
            }
            return true;
        }),


    // poderes: requerido, array no vacío, cada elemento: trim, min 3, max 60
    body('poderes')
        .notEmpty().withMessage('Los poderes son requeridos')
        .custom((poderes) => {
            // Convertir string a array
            let poderesArray = poderes;
            if (typeof poderes === 'string') {
                poderesArray = poderes.split(',').map(p => p.trim()).filter(p => p);
            }

            if (!Array.isArray(poderesArray) || poderesArray.length === 0) {
                throw new Error('Debe tener al menos un poder');
            }

            for (const poder of poderesArray) {
                if (poder.length < 3 || poder.length > 60) {
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

        //debilidad
    body('debilidad')
        .optional()
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('La debilidad debe tener entre 3 y 60 caracteres'),

    // aliados (opcional, pero si viene, validar)
    body('aliados')
        .optional()
        .custom((aliados) => {
            if (!aliados) return true;

            let aliadosArray = aliados;
            if (typeof aliados === 'string') {
                aliadosArray = aliados.split(',').map(a => a.trim()).filter(a => a);
            }

            for (const aliado of aliadosArray) {
                if (aliado.length < 3 || aliado.length > 60) {
                    throw new Error('Cada aliado debe tener entre 3 y 60 caracteres');
                }
            }
            return true;
        }),

    // enemigos (opcional, pero si viene, validar)
    body('enemigos')
        .optional()
        .custom((enemigos) => {
            if (!enemigos) return true;

            let enemigosArray = enemigos;
            if (typeof enemigos === 'string') {
                enemigosArray = enemigos.split(',').map(e => e.trim()).filter(e => e);
            }

            for (const enemigo of enemigosArray) {
                if (enemigo.length < 3 || enemigo.length > 60) {
                    throw new Error('Cada enemigo debe tener entre 3 y 60 caracteres');
                }
            }
            return true;
        }),

    body('poderes')
        .notEmpty().withMessage('Los poderes son requeridos')
        .custom((poderes) => {
            // Convertir string a array
            let poderesArray = poderes;
            if (typeof poderes === 'string') {
                poderesArray = poderes.split(',').map(p => p.trim()).filter(p => p);
            }

            if (!Array.isArray(poderesArray) || poderesArray.length === 0) {
                throw new Error('Debe tener al menos un poder');
            }

            for (const poder of poderesArray) {
                if (poder.length < 3 || poder.length > 60) {
                    throw new Error('Cada poder debe tener entre 3 y 60 caracteres');
                }
            }
            return true;
        }),
    body('debilidad')
        .optional()
        .trim()
        .isLength({ min: 3, max: 60 }).withMessage('La debilidad debe tener entre 3 y 60 caracteres')


];