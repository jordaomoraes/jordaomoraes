import express, { response } from "express";
import CriaCafesCru from "./controllers/criacafescru";
import CriaFazendas from "./controllers/criafazenda";

import db from "./database/connection";
const routes = express.Router();

const criaFazendas = new CriaFazendas();
const criaCafesCru = new CriaCafesCru();

routes.get("/", (req, res) => {
  const fazendas = [
    { nome: "fazenda 1", tamanho: "Bem grande" },
    { nome: "fazenda 2", tamanho: "menor" },
  ];
  return res.json([fazendas]);
});

routes.post("/fazendas",criaFazendas.create)
routes.get("/fazendas",criaFazendas.listaTodas)
routes.get("/fazendas2/:id",criaFazendas.single)
routes.delete("/fazendas/:id",criaFazendas.del)
routes.put("/fazendas",criaFazendas.atualiza)


routes.post("/cafescrus",criaCafesCru.create)
routes.get("/cafescrus",criaCafesCru.index)
routes.delete("/cafescrus",criaCafesCru.del)
routes.put("/cafescrus",criaCafesCru.atualiza)



export default routes;
