import { Request, Response } from 'express';
import Knex from '../database/connection';

class CitiesController {

    async index(request: Request, response: Response) {
        const { state_id } = request.query;
        const cities = await Knex('cities').select('*').where({state_id});
        
        return response.json(cities);
    }

}

export default CitiesController;