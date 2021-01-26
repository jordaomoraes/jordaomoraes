import { Request, Response } from "express";
import db from "../database/connection";

export default class CriaCafesCru {
  async index(request: Request, response: Response) {
    const filters = request.query;
    const id_cafe = filters.id_cafe as string;
    if (!filters.id_cafe) {
      return response.status(400).json({
        error: "Sem parametros",
      });
    }
    const faz = await db("cafes_cru")
      .where("cafes_cru.id", "=", id_cafe)
      .join("fazendas", "cafes_cru.fazenda_id", "=", "fazendas.id")
      .select(["cafes_cru.*", "fazendas.razao"]);
    return response.json(faz);
  }

  async del(request: Request, response: Response) {
    const filters = request.query;
    const id_cafe = filters.id_cafe as string;
    if (!filters.id_cafe) {
      return response.status(400).json({
        error: "Sem parametros",
      });
    }
    const faz = await db("cafes_cru").where("cafes_cru.id", "=", id_cafe).del();

    return response.json(faz);
  }

  async create(request: Request, response: Response) {
    const { tipo, qtd_atual, qtd_minima, fazenda_id } = request.body;
       console.log(request.body)
    try {
      await db("cafes_cru").insert({ tipo, qtd_atual, qtd_minima, fazenda_id });
    } catch (error) {
      return response.status(400).json({
        error: "Erro ao criar Café Cru",
      });
    }
    return response.json({
      msg: "cafe criado com sucesso",
    });
  }

  async atualiza(request: Request, response: Response) {
    const { tipo, qtd_atual, qtd_minima, fazenda_id,id } = request.body;

    try {
      await db("cafes_cru")       
        .update({ 
          tipo, 
          qtd_atual, 
          qtd_minima, fazenda_id })
        .where('id', id);


    } catch (error) {
      return response.status(400).json({
        error: "Erro ao criar Café Cru",
      });
    }
    return response.json({
      msg: "cafe criado com sucesso",
    });
  }
}
