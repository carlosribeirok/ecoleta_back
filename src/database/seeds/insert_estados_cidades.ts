import { Knex } from "knex";
import axios from "axios";

export async function seed(knex: Knex): Promise<void> {
    await knex("states").del();
    await knex("cities").del();
    
    const api_estados: string = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
    const response = await axios.get(api_estados);
    
    for(let x in response.data){
        const id_estado = await knex("states").insert(
            {
                id: response.data[x].id,
                uf: response.data[x].sigla,
                name: response.data[x].nome
            }
        );
        await insertCidades(knex, id_estado[0], response.data[x].sigla);
    }
};

async function insertCidades(knex: Knex, id_estado: Number, sigla: String): Promise<void> {
    const api_municipios: string = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`;
    const response = await axios.get(api_municipios);

    for(let x in response.data){
        await knex("cities").insert(
            {
                id: response.data[x].id,
                name: response.data[x].nome,
                state_id: id_estado
            }
        );
    }
}
