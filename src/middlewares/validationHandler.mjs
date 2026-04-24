// import { validationResult } from 'express-validator';

// export const manejarErroresValidacion = (req, res, next) => {
//     const errors = validationResult(req);
    
//     if (!errors.isEmpty()) {
//         return res.status(400).json({
//             status: 'error',
//             mensaje: 'Error de validación',
//             errores: errors.array().map(error => ({
//                 campo: error.path,
//                 mensaje: error.msg
//             }))
//         });
//     }
    
//     next();
// };

import { validationResult } from 'express-validator';

export const manejarErroresValidacion = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        // Guardar errores en variables locales para mostrar en el formulario
        res.locals.errors = errors.array();
        res.locals.oldData = req.body;
        return res.status(400).render('addSuperhero', {
            error: errors.array()[0]?.msg,
            oldData: req.body
        });
    }
    
    next();
};