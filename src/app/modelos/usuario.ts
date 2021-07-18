import { Cliente } from "./cliente";

export class Usuario {

    id: number;
    correo: string; 
    contrasenia: string;
    duenio: Cliente;
    rol: string;
    activo: boolean;

    constructor() {}
}