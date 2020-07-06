import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pedido } from '../class/pedido';
import { Produto } from '../class/produto';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private http: HttpClient) { }

  modo_visualizacao: string = "gerenciar_entrega";
  pedidos_nao_entregues: Pedido[];
  pedidos_do_dia: any[];
  produtos_com_opcoes: Produto[];
  novos_itens: string[] = ["","",""];
  total_de_perdas_do_dia : {num_pedidos_nao_entregue: number, valor_total_das_perdas: number} =  {num_pedidos_nao_entregue: 0, valor_total_das_perdas: 0};
  total_de_pedidos_do_dia : {num_pedidos: number, valor_total: number} = {num_pedidos: 0, valor_total: 0};

  ngOnInit(): void {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.http.get<Pedido[]>('http://localhost:3000/pedidos-nao-entregue', httpOptions).subscribe(data => {
      this.pedidos_nao_entregues = data;
    });

    this.http.get<Produto[]>('http://localhost:3000/produtos-com-opcoes', httpOptions).subscribe(data => {
      this.produtos_com_opcoes = data;
    });

    this.http.get<any[]>('http://localhost:3000/pedidos-do-dia', httpOptions).subscribe(data => {
      this.pedidos_do_dia = data;
      this.total_de_perdas_do_dia = {num_pedidos_nao_entregue: 0, valor_total_das_perdas: 0};
      this.total_de_pedidos_do_dia = {num_pedidos: 0, valor_total: 0};
      this.pedidos_do_dia.forEach(p => {
        if(p.status == "em entrega"){
          this.total_de_perdas_do_dia.num_pedidos_nao_entregue++;
          this.total_de_perdas_do_dia.valor_total_das_perdas+=Number(p.valor);
        }
        this.total_de_pedidos_do_dia.num_pedidos++;
        this.total_de_pedidos_do_dia.valor_total+=Number(p.valor);
      })
    });
  }

  alterar_visializacao(v) {
    this.modo_visualizacao = v;

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.http.get<Pedido[]>('http://localhost:3000/pedidos-nao-entregue', httpOptions).subscribe(data => {
      this.pedidos_nao_entregues = data;
    });

    this.http.get<Produto[]>('http://localhost:3000/produtos-com-opcoes', httpOptions).subscribe(data => {
      this.produtos_com_opcoes = data;
    });

    this.http.get<Pedido[]>('http://localhost:3000/pedidos-do-dia', httpOptions).subscribe(data => {
      this.pedidos_do_dia = data;
      this.total_de_perdas_do_dia = {num_pedidos_nao_entregue: 0, valor_total_das_perdas: 0};
      this.total_de_pedidos_do_dia = {num_pedidos: 0, valor_total: 0};
      this.pedidos_do_dia.forEach(p => {
        if(p.status == "em entrega"){
          this.total_de_perdas_do_dia.num_pedidos_nao_entregue++;
          this.total_de_perdas_do_dia.valor_total_das_perdas+=Number(p.valor);
        }
        this.total_de_pedidos_do_dia.num_pedidos++;
        this.total_de_pedidos_do_dia.valor_total+=Number(p.valor);
      })
    });

  }

  informar_entrega_pedido(pedido) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.http.post<string>('http://localhost:3000/informar-pedido-entregue', pedido, httpOptions).subscribe(data => {
      this.http.get<Pedido[]>('http://localhost:3000/pedidos-nao-entregue', httpOptions).subscribe(data => {
        this.pedidos_nao_entregues = data;
      });
    });
  }

  remover_item(item, opcao, produto) {

    const index = produto.opcoes[opcao].valores.indexOf(item);
    produto.opcoes[opcao].valores.splice(index, 1);

  }

  adicionar_item(opcao, produto){
    produto.opcoes[opcao].valores.push(this.novos_itens[opcao]);
    this.novos_itens[opcao] = "";
  }

  salvar_edicao(produto : Produto){

    produto.opcoes.forEach(op => {
      op.valores.sort();
    })

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*'
      })
    };

    this.http.post<string>('http://localhost:3000/atualiza-opcoes-pedidos', produto, httpOptions).subscribe(data => {
      alert(data);
    });
  }

}
