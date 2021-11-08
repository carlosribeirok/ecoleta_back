import { Request, Response } from 'express';
import Knex from '../database/connection';

class StatesController {
    async index(request: Request, response: Response) {
        const states = await Knex('states').select('*').orderBy('uf');

        return response.json(states);
    }
}

export default StatesController;