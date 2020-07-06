import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Secao } from './class/secao';
import { Produto } from './class/produto';
import { Pedido } from './class/pedido';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  constructor() { }

  ngOnInit() {      

  }
}
