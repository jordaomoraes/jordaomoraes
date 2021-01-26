import { Request, Response } from "express";
import db from "../database/connection";

export default class CriaFazendas {
  async create(request: Request, response: Response) {
    const { razao, cnpj, endereco, regiao } = request.body;
    console.log("chegou - " + razao);
    try {
      await db("fazendas").insert({ razao, cnpj, endereco, regiao });
    } catch (error) {
      return response.status(400).json({
        error: "Erro ao criar Fazenda",
      });
    }
    return response.send();
  }

  async single(req: Request, res: Response) {
    const id_fazenda = req.params.id;
    const fazenda = await db("fazendas")
      .select("*")
      .from("fazendas")
      .where("id", id_fazenda);
    return res.json(fazenda);
  }

  async listaTodas(request: Request, response: Response) {
    const faz = await db("fazendas").timeout(1000);
    return response.json(faz);
  }

  async listaTodas2(request: Request, response: Response) {
    const faz = await db("fazendas").timeout(1000);
    return response.json(faz);
  }

  async del(request: Request, response: Response) {
    const id_fazenda = request.params.id;
    await db("fazendas").where("fazendas.id", "=", id_fazenda).del();
    return response.json({ Message: "Fazenda Deletada com Sucesso" });
  }

  async atualiza(request: Request, response: Response) {
    const { razao, cnpj, endereco, regiao, id } = request.body;
    try {
      await db("fazendas")
        .update({ razao, cnpj, endereco, regiao })
        .where("id", id);
    } catch (error) {
      return response.status(400).json({
        error: "Erro ao criar Fazenda",
      });
    }
    return response.json({
      Message: "Fazenda Atualiza com Sucesso!",
    });
  }
}
