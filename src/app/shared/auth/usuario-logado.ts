import { Role } from "./role";

export class UsuarioLogado {
    
    public static getToken(): string{
        return localStorage.getItem('access_token');
    }
   
    public static getUsuarioLogado(): string{
        return JSON.parse(localStorage.getItem('access_token_perfil'));
    }

    public static getUsuarioLogadoPerfil(): string{
        return String(UsuarioLogado.getUsuarioLogado()['perfis'][0]['nome']).toLocaleLowerCase().replace('role_', '');
    }

    public static getUsuarioLogadoPerfilCliente(): boolean{
        return (UsuarioLogado.getUsuarioLogadoPerfil() === Role.CLIENTE);
    }

    public static getUsuarioLogadoPerfilAdministrador(): boolean{
        return (UsuarioLogado.getUsuarioLogadoPerfil() !== Role.CLIENTE);
    }

    public static getUsuarioLogadoId(): Number{
        return Number(UsuarioLogado.getUsuarioLogado()['id']);
    }

    public static setToken(token: string){
       localStorage.setItem('access_token', token);
    }

    public static setUsuarioLogado(data: string){
        localStorage.setItem('access_token_perfil', data);
    }

    public static clearStorage(): void {
        localStorage.clear();
    }

}