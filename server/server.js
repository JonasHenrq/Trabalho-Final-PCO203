const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});


//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);  // requisições que chegam na raiz devem ser enviadas para o router

//inicia o servidor
app.listen(port);
console.log('API funcionando!');

router.get('/menu', (req, res) =>{
    var db = require("./db");
    
    var secao = db.Mongoose.model('secaocollection', db.SecaoSchema, 'secaocollection');
    secao.aggregate([
        {
           $lookup:
            {
                from: 'produtoscollection',
                localField: 'codigo_produtos',
                foreignField: 'codigo',
                as: 'produtos'
            }
        }
    ]).exec((e,docs) => {res.json(docs);})
    
});

router.get('/produto/:id?', (req, res) =>{

    var db = require("./db");

    var Produto = db.Mongoose.model('produtoscollection', db.ProdutoSchema, 'produtoscollection');
    Produto.find({_id: req.params.id}).lean().exec(
        function (e, docs) {
            res.json(docs);
        });
});

router.get('/produtos-com-opcoes', (req, res) =>{

    var db = require("./db");

    var Produto = db.Mongoose.model('produtoscollection', db.ProdutoSchema, 'produtoscollection');
    Produto.find({temOpcoes: true}).lean().exec(
        function (e, docs) {
            res.json(docs);
        });
});

router.post('/atualiza-opcoes-pedidos', (req, res) => {
    
    var db = require("./db");

    const _id = req.body._id;
    const opcoes = req.body.opcoes;

    var Produto = db.Mongoose.model('produtoscollection', db.ProdutoSchema, 'produtoscollection');
    Produto.findOneAndUpdate({ _id: _id}, {opcoes: opcoes}).lean().exec();

    res.json("Sucesso!");

})

router.put('/produto/:id?', (req, res) => {

    var db = require("./db");

    const novas_opcoes = req.body.novas_opcoes;

    var Produto = db.Mongoose.model('produtoscollection', db.ProdutoSchema, 'produtoscollection');
    Pedido.updateOne({ _id: req.params.id}, { opcoes: novas_opcoes });

    res.json("Sucesso!");
});

router.post('/pedido', (req, res) => {

    var db = require("./db");

    const data = new Date();
    const itemPedidos = req.body.itemPedidos;
    const valor_total = req.body.valor_total;
    const nome= req.body.nome;
    const endereco_entrega= req.body.endereco_entrega;

    var Pedido = db.Mongoose.model('pedidoscollection', db.PedidoSchema, 'pedidoscollection');
    var pedido = new Pedido({data: data,
        status: "em entrega",
        valor: valor_total,
        Produtos: itemPedidos,
        nome: nome,
        endereco_entrega: endereco_entrega
    });

    pedido.save(function(err){
        if (err) {
            console.log("Error! " + err.message);
            return res.json(err);
        }
        else {
            console.log("Post saved");
            return res.json(pedido._id);
        }
    });
    
});

router.get('/pedidos-nao-entregue', (req, res) =>{

    var db = require("./db");
    var data = new Date();
    data.setHours(0,0,0,0);

    var Pedido = db.Mongoose.model('pedidoscollection', db.PedidoSchema, 'pedidoscollection');
    Pedido.find({status: "em entrega", data: {$gt: data}}).lean().exec(
        function (e, docs) {
            res.json(docs);
        });
});

router.get('/pedidos-do-dia', (req, res) =>{

    var db = require("./db");
    var data = new Date();
    data.setHours(0,0,0,0);

    var Pedido = db.Mongoose.model('pedidoscollection', db.PedidoSchema, 'pedidoscollection');
    Pedido.find({data: {$gt: data}}).lean().exec(
        function (e, docs) {
            res.json(docs);
        });
});

router.post('/informar-pedido-entregue', (req, res) =>{

    var db = require("./db");

    const _id= req.body._id;

    var Pedido = db.Mongoose.model('pedidoscollection', db.PedidoSchema, 'pedidoscollection');
    Pedido.findOneAndUpdate({ _id: _id}, {status: "entregue"}).lean().exec();

    res.json("Sucess!");
});