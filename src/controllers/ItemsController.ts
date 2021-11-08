import { Request, Response } from 'express';
import Knex from '../database/connection';

class ItemsController {
    async index(request: Request, response: Response) {
        const items = await Knex('items').select('*');
        const baseUrl = request.protocol + '://' + request.get('host');
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `${baseUrl}/uploads/${item.image}`,
            };
        });
    
        return response.json(serializedItems);
    }
}

export default ItemsController;