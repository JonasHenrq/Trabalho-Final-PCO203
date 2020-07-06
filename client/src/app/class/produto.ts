export class Produto {
    _id: number
    codigo: number
    nome: string
    descricao: string
    imagem: string
    preco: number
    temOpcoes: boolean
    opcoes: {nome: string,
    num_minimo_escolha: number,
    num_maximo_escolha: number,
    valores: string[]}[]
 }