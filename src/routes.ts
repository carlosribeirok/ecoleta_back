import express from 'express';
import { celebrate, Joi } from 'celebrate';


import multer from 'multer';
import multerConfig from './config/multer';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';
import StatesController from './controllers/StatesController';
import CitiesController from './controllers/CitiesController';


const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();
const statesController = new StatesController();
const citiesController = new CitiesController();



routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.get('/states', statesController.index);
routes.get('/cities', citiesController.index);

routes.post(
    '/points', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city_id: Joi.number().required(),
            state_id: Joi.number().required(),
            items: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    pointsController.create);

export default routes;