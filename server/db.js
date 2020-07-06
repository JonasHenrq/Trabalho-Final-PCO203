var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/trab_final');

class Produto {
    constructor(codigo,descricao,valor_unit,desconto){
        this.codigo = codigo;
        this.descricao = descricao,
        this.valor_unit = valor_unit,
        this.desconto = desconto
    }
}

var SecaoSchema = new mongoose.Schema({
    nome: String,
    codigo_produtos: Array
   }, { collection: 'secaocollection' }
   );

var ProdutoSchema = new mongoose.Schema({
    codigo: Number,
    nome: String,
    descricao: String,
    imagem: String,
    preco: Number,
    temOpcoes: Boolean,
    opcoes: Array
    }, { collection: 'produtoscollection' }
);

var PedidoSchema = new mongoose.Schema({
    data: Date,
    status: String,
    valor: Number,
    Produtos: Array,
    nome: String,
    endereco_entrega: String,
}, { collection: 'pedidoscollection' }
);

   module.exports = { Mongoose: mongoose, SecaoSchema: SecaoSchema, ProdutoSchema: ProdutoSchema, PedidoSchema: PedidoSchema}