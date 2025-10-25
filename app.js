const express = require("express");
const app = express();
const PORT = 8090
const pathFile = "./produtos.json";

const fs = require("fs");

app.use(express.json());

app.post("/produtos", (req, res)=>{
    try {
        const {nome, preco} = req.body;
        if (nome == undefined || nome == "" || isNaN(nome) || preco == undefined || preco == "" || isNaN(preco)){
            return res.status(400).send(`Campos obrigatórios não preenchidos`)}

        const produto = {
            nome: nome,
            preco: preco
        }

        const data = fs.readFileSync(pathFile,"utf-8");
        const produtos = JSON.parse(data);

        produtos.push(produto);

        fs.writeFileSync(pathFile, JSON.stringify(produtos, null, 4));

        res.status(201).json({
            message: "Produto cadastrado com sucesso!",
            produto: produto
        })
    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        res.status(500).json({error: "Erro interno no servidor ao cadastrar produto"});
    }
});

app.listen(PORT, ()=>{
    console.log(`Servidor rodando em gttp://localhost:${PORT}`);
});