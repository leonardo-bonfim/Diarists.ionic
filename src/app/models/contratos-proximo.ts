import { Endereco } from 'src/app/models/endereco';

export class ContratosProximo {
    data: Data;
    error: Array<any>;
}

export class Data {
    content: ContratoProximo[];
    pageable: Pageable;
    totalElements: number;
    totalPages: number;
    last: boolean;
    first: boolean;
    sort: { sorted: boolean, unsorted: boolean, empty: boolean };
    size: number;
    number: number;
    numberOfElements: number;
    empty: boolean;
}

export class ContratoProximo {
    descricao: string;
    usuarios: UsuarioMinimo[];
    distancia: number;
}

export class Pageable {
    sort: { sorted: boolean, unsorted: boolean, empty: boolean };
    pageSize: number;
    pageNumber: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export class UsuarioMinimo {
    nome: string;
    sobrenome: string;
    sexo: string;
    endereco: Endereco;
    foto: string;
}