const Joi = require('joi');

const nombre = Joi.string().min(3).max(100);


const createAlumnoSchema = Joi.object({
    nombre : nombre.required(),
});

const updateAlumnoSchema = Joi.object({
    nombre : nombre.required(),
})

module.exports = {createCuroSchema,updateCursoSchema}