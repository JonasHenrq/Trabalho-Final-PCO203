import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Secao } from '../class/secao';
import { Produto } from '../class/produto';
import { Pedido } from '../class/pedido';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@Injectable()
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) { }
  title = 'Restaurante PCO203';
  menu: Secao[] = [];
  valor_total: number = 0;
  num_itens_carrinho = 0;
  modo_apresentacao="menu";
  produto: Produto;
  produto_quantidade: number = 1;
  produto_edicao_indice: number = 0;
  produto_edicao_qtd_anterior: number = 0;
  pedido: Pedido = new Pedido();
  idPedido;
  itens_secao_arroz = [];
  itens_secao_carnes = [];
  itens_secao_acompanhamentos = [];

  ngOnInit() {      
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*'
      })
    };

    this.http.get<Secao[]>('http://localhost:3000/menu', httpOptions).subscribe(data => {
        this.menu = data;
    });

    this.pedido.valor_total=0;
    this.pedido.itemPedidos= [];
    this.pedido.data = new Date();

  }

  cancelar(){

    this.modo_apresentacao="menu";
    this.produto_quantidade = 1;

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*'
      })
    };
    this.http.get<Secao[]>('http://localhost:3000/menu', httpOptions).subscribe(data => {
        this.menu = data;
    });
  }

  escolha_produto(prod){
    this.modo_apresentacao="escolha_produto";
    this.produto = prod;
    if(this.produto.temOpcoes){
      this.itens_secao_arroz =  this.produto.opcoes[0].valores;
      this.itens_secao_carnes =  this.produto.opcoes[1].valores;
      this.itens_secao_acompanhamentos =  this.produto.opcoes[2].valores;

      this.produto.opcoes.forEach(p => {
        p.valores = [];
      })
    }
  }

  secao_arroz(item){
    const found = this.produto.opcoes[0].valores.find(element => element == item);

    if(found == undefined){
      this.produto.opcoes[0].valores.push(item);
    }else{
      const index = this.produto.opcoes[0].valores.indexOf(item);
      this.produto.opcoes[0].valores.splice(index,1);
    }
  }

  secao_carnes(item){
    this.produto.opcoes[1].valores = [];
    this.produto.opcoes[1].valores.push(item);

  }

  secao_acompanhamento(item){
    const found = this.produto.opcoes[2].valores.find(element => element == item);

    if(found == undefined){
      this.produto.opcoes[2].valores.push(item);
    }else{
      const index = this.produto.opcoes[2].valores.indexOf(item);
      this.produto.opcoes[2].valores.splice(index,1);
    }
  }

  confirma_pedido(){
    this.pedido.valor_total += this.produto.preco * this.produto_quantidade;
    this.pedido.itemPedidos.push({produto: this.produto, quantidade: this.produto_quantidade});

    this.modo_apresentacao="menu";
    this.produto_quantidade = 1;

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*'
      })
    };
    this.http.get<Secao[]>('http://localhost:3000/menu', httpOptions).subscribe(data => {
        this.menu = data;
    });
  }

  visualizar_pedido(){
    this.pedido.itemPedidos
    this.modo_apresentacao="carrinho";
  }

  remover_item_pedido(item){
    const index = this.pedido.itemPedidos.indexOf(item);
    this.pedido.valor_total -= item.produto.preco * item.quantidade;
    this.pedido.itemPedidos.splice(index,1);
  }

  editar_item_pedido(item){
    this.produto_edicao_indice = this.pedido.itemPedidos.indexOf(item);
    this.produto_edicao_qtd_anterior = item.quantidade;
    this.modo_apresentacao = "editar_quantidade";
  }

  salvar_edicao_item_pedido(){
    this.pedido.valor_total += this.pedido.itemPedidos[this.produto_edicao_indice].produto.preco * (this.pedido.itemPedidos[this.produto_edicao_indice].quantidade - this.produto_edicao_qtd_anterior);
    this.produto_edicao_indice = null;
    this.produto_edicao_qtd_anterior = null;
    this.modo_apresentacao = "carrinho";
  }

  fechar_pedido(){
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Access-Control-Allow-Origin':'*'
      })
    };

    this.http.post('http://localhost:3000/pedido',this.pedido,httpOptions).subscribe(data => {
      this.idPedido = data;
      this.modo_apresentacao = "sucesso_pedido";
    });
  }

  concluir_pedido(){
    this.pedido.valor_total=0;
    this.pedido.itemPedidos= [];
    this.pedido.data = new Date();
    this.pedido.nome = null,
    this.pedido.endereco_entrega = null;
    this.cancelar();
  }

}