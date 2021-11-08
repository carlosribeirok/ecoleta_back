import { Request, Response } from 'express';
import Knex from '../database/connection';

class PointsController {

    async index(request: Request, response: Response) {
        const { city_id, state_id } = request.query;
        const baseUrl = request.protocol + '://' + request.get('host');

        const points = await Knex('points')
        .select('points.*')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .distinct()
        .where((qb) => {
            if(city_id) qb.where('city_id', Number(city_id))
            if(state_id) qb.where('state_id', Number(state_id))
        })

        const city = await Knex('cities')
        .where('id', Number(city_id))
        .first();

        const serializedPoints = await Promise.all(points.map(async point => {
                const point_items = await Knex('items')
                .join('point_items', 'items.id', '=', 'point_items.item_id')
                .where('point_items.point_id', point.id)
                .select('items.title');
                return {
                    ...point,
                    image_url: `${baseUrl}/uploads/${point.image}`,
                    items: point_items

                };
            }
        ));
        return response.json({
            'points': serializedPoints,
            'city_name': city.name
        });
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        const baseUrl = request.protocol + '://' + request.get('host');

        const point = await Knex('points').where('id', id).first();
        
        if ( !point ) {
            return response.status(400).json({ message: 'point not found.' });
        }

        const serializedPoint = {
            ...point,
            image_url: `${baseUrl}/uploads/${point.image}`,
        
        };

        const items = await Knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');

        return response.json({ point: serializedPoint, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city_id,
            state_id,
            items
        } = request.body
    
        const trx = await Knex.transaction();

        const point = {
            name,
            image: request.file.filename,
            email,
            whatsapp,
            city_id,
            state_id,
            latitude,
            longitude
        }

        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
            return{
                item_id,
                point_id,
            };
        });
    
        await trx('point_items').insert(pointItems);
     
        await trx.commit();

        return response.json({ 
            id: point_id,
            ...point
        });
    }
  
}

export default PointsController;