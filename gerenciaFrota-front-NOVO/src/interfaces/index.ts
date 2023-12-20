export interface ICar {
    id?: number;
    model: string;
    plate: string;
    color: string;
    buyDate: null | Date;
    isRented?: Boolean;
}

export interface IClient {
    id: number;
    name: string;
    address: string;
    telephone: string;
}

export interface IDriver {
    id: number;
    name: string;
    birthdate: null | Date;
    licenseNumber: string;
    isAvailable?: Boolean;
}

export interface ITipoAtivo {
    id: number;
    nome: string;
    slug: string;
}

export interface IAtivo {
    id: number;
    ticker: string;
    nome: string;
    setor: string;
    precoFechamento: number;
    tipoAtivo?: ITipoAtivo;
    idTipoAtivo?: string | number | undefined;
    dyAnualizado: number;
}

export interface IItemCarrinho {
    id: number;
    quantidade: number;
    idAtivo: number;
    ativo: IAtivo;
    idCarrinho: number;
}