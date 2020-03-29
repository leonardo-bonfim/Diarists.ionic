import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Endereco } from '../models/endereco';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
  jwtPayload: any;
  jwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient,
  ) {
    this.carregarToken();
    console.log(this.jwtPayload);
  }

  async login(usuario: string, senha: string): Promise<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic aW9uaWM6MTIzMzIx'
    });
    const body = `username=${usuario}&password=${senha}&grant_type=password`;
    try {
      const response = await this.http.post<any>(this.oauthTokenUrl, body, { headers })
        .toPromise();
      this.armazenarDados(response);
      console.log(response);
    } catch (error) {
      if (error.status === 400) {
        if (error.error.error === 'invalid_grant') {
          return Promise.reject(['Usuário ou senha inválida!']);
        }
      }
      if (error.status === 0) {
        return Promise.reject(['O servidor está desconectado!']);
      }
      return Promise.reject([error]);
    }
  }
  private armazenarDados(response: any): void {
    localStorage.setItem('nome', response.nome);
    this.jwtPayload = this.jwtHelperService.decodeToken(response.access_token);
    localStorage.setItem('token', response.access_token);
    localStorage.setItem('email', this.jwtPayload.user_name);
    localStorage.setItem('endereco', JSON.stringify(response.endereco));
  }
  obterDadosDeUsuarioLogado(): {
    nome: string,
    token: string,
    email: string,
    endereco: Endereco
  } {
    return {
      nome: localStorage.getItem('nome'),
      token: localStorage.getItem('token'),
      email: localStorage.getItem('email'),
      endereco: JSON.parse(localStorage.getItem('endereco')) as Endereco
    };
  }
  private armazenarToken(token: string): void {
    this.jwtPayload = this.jwtHelperService.decodeToken(token);
    localStorage.setItem('token', token);
  }
  private carregarToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.armazenarToken(token);
    }
  }

}
