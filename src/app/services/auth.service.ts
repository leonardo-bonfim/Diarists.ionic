import { JwtHelperService } from '@auth0/angular-jwt';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
      'Authorization': 'Basic aW9uaWM6MTIzMzIx'
    });
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    try {
      const response = await this.http.post<any>(this.oauthTokenUrl, body, { headers })
        .toPromise();
      this.armazenarToken(response.access_token);
    }
    catch (response_1) {
      if (response_1.status === 400) {
        if (response_1.error.error === 'invalid_grant') {
          return Promise.reject(['Usuário ou senha inválida!']);
        }
      }
      if (response_1.status === 0) {
        return Promise.reject(['O servidor está desconectado!']);
      }
      return Promise.reject([response_1]);
    }
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelperService.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if(token) {
      this.armazenarToken(token);
    }
  }

}
