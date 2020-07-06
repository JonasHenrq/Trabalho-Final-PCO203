# Trabalho Final PCO203
Este projeto simula um site de pedidos de um restaurante.

## Estrutura
- Na pasta /server você encontra a API em Express
- Na pasta /client você encontra o projeto em Angular
- Na pasta /server/data você encontra os arquivos do mongo

## Executando SERVER
Siga os seguintes passos para iniciar o servidor:
```
cd path/do/diretorio/com/o/server

npm install

npm start

```

## Executando CLIENT
Siga os seguintes passos para iniciar o servidor:
```
cd path/do/diretorio/com/o/client

npm install

ng serve

```

## Executando Mongo
Você pode utilizar o mongodb de duas formas:
- Utilizar o mongodb já existestente no projeto, na pasta /server/data, através do mongod.
- Utilizar o mongodb já iniciado em sua máquina

### Utilizando o mongod
Está opção só deve ser utilizada caso não exista um banco mongo iniciado na maquina.
```
cd path/para/bin/do/mongo

./mongod.exe --dbpath path/do/diretorio/com/o/server/data

```

### Utilizando o mongodb já iniciado em sua maquina
```
mongo

use trab_final

insert_produtos = [{
	"codigo" : 01,
	"nome": "Refeição Delivery 450G",
	"descricao": "Nesta modalidade de refeição é obrigatório pedir arroz ou feijão",
	"imagem": "https://http2.mlstatic.com/adesivo-comida-prato-restaurante-food-marmita-alta-resoluco-D_NQ_NP_626146-MLB29512330088_022019-F.jpg",
	"preco": 20.00,
	"temOpcoes" : true,
	"opcoes": [{
		"nome": "Arroz e Feijão",
		"num_minimo_escolha": 1,
		"num_maximo_escolha": 2,
		"valores": ["Arroz Branco", "Arroz Integral", "Feijão Carioca"]
	},{
		"nome": "Carnes",
		"num_minimo_escolha": 1,
		"num_maximo_escolha": 1,
		"valores": ["Torresmo de Tilápia", "Sobrecoxa Assada ao Chimichurri", "Bife de Ancho na Grelha com Sal de Ervas", "Não Desejo Carne"]
	},{
		"nome": "Acompanhamentos",
		"num_minimo_escolha": 1,
		"num_maximo_escolha": 4,
		"valores": ["Fusilli aos 4 queijos", "Pure Misto (Batata e Cenoura)", "Farofa de ervas", "Spaguetti de abobrinha ao pesto de manjericão com tomate grape", "Quiche de Brocules ao Alho"]
	}]
},{
	"codigo" : 02,
	"nome": "Coca Cola Lata",
	"descricao": "",
	"imagem": "https://cdn.awsli.com.br/300x300/514/514079/produto/19231133/67fe3c49dd.jpg",
	"preco": 4.50,
	"temOpcoes" : false
},{
	"codigo" : 03,
	"nome": "Fanta Lata",
	"descricao": "",
	"imagem": "https://static.carrefour.com.br/medias/sys_master/images/images/hdd/h7d/h00/h00/12175674507294.jpg",
	"preco": 4.50,
	"temOpcoes" : false
},{
	"codigo" : 04,
	"nome": "Sprite Lata",
	"descricao": "",
	"imagem": "https://casafiesta.fbitsstatic.net/img/p/refrigerante-sprite-lata-350ml-67111/233979.jpg",
	"preco": 4.50,
	"temOpcoes" : false
},{
	"codigo" : 05,
	"nome": "Torta de nozes",
	"descricao": "",
	"imagem": "https://image.freepik.com/fotos-gratis/pedaco-de-bolo-de-cafe-com-cobertura-de-nozes-de-fatia_66869-485.jpg",
	"preco": 8.99,
	"temOpcoes" : false
},{
	"codigo" : 06,
	"nome": "Bolo de Cenoura",
	"descricao": "",
	"imagem": "https://cdn.guiadacozinha.com.br/wp-content/uploads/2019/11/bolo-de-cenoura.jpg",
	"preco": 2.50,
	"temOpcoes" : false
},
{
	"codigo" : 07,
	"nome": "Água Mineral",
	"descricao": "",
	"imagem": "https://drogariasp.vteximg.com.br/arquivos/ids/396715-1000-1000/agua-mineral-crystal-acqualia-sem-gas-500ml-Drogaria-SP-681482.jpg",
	"preco": 1.80,
	"temOpcoes" : false
}
];

db.produtoscollection.insert(insert_produtos)

insert_secao = [{
	"nome": "Refeições",
	"codigo_produtos": [01]
},{
	"nome": "Bebidas",
	"codigo_produtos": [02,03,04,07]
},{
	"nome": "Sobremesas",
	"codigo_produtos": [05,06]
}];

db.secaocollection.insert(insert_secao)

```
