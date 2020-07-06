import { Produto } from './produto'

export class Pedido {
    _id: string
    data: Date
    valor_total: number
    nome: string
    status: string
    endereco_entrega: string
    itemPedidos: {produto: Produto, quantidade: number}[]
}