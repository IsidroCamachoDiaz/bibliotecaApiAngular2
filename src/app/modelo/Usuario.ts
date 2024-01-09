import { Acceso } from "./Acceso";

export interface Usuario{
    idUsuario: number;
    apellidosUsuario: string;
    claveUsuario: string;
    dniUsuario: string;
    emailUsuario: string;
    estaBloqueadoUsuario: boolean;
    fchAltaUsuario?: string; // timestamp without time zone
    fchBajaUsuario?: string; // timestamp without time zone
    fchFinBloqueo?: string; // timestamp without time zone
    nombreUsuario: string;
    tlfUsuario: string;
    id_acceso?:number,
    acceso?:Acceso;
}