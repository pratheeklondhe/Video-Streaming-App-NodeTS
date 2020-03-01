import Joi  from '@hapi/joi';

const genre_schema = Joi.object({
    genreId: Joi.string().min(3).required(),
    title: Joi.string().min(3).required(),
    genreTitle: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    language: Joi.string().min(2).required(),
    category: Joi.array().required(),
    year: Joi.string().required(),
    displayImg: Joi.string().required(),
    screenshots: Joi.array(),
    isSeries: Joi.boolean().required(),
    cast: Joi.string(),
    crew: Joi.string(),
    seriesId: Joi.string(),
    seasonNo: Joi.number(),
    episodeNo: Joi.number()
});

export { genre_schema as genreSchema };

