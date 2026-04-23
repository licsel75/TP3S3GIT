import { validationResult } from 'express-validator';

export const manejarErroresValidacion = (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'Error de validación',
            errores: errors.array().map(error => ({
                campo: error.path,
                mensaje: error.msg
            }))
        });
    }
    
    next();
};