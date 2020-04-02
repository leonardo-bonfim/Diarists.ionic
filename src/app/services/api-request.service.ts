import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

// import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http: HttpClient, private router: Router) { }

  async postRequest(url: string, body: any) {
    await this.http.post(url, body, this.addHeaders()).toPromise()
      .then(() => {
        return Promise.resolve();
      })
      .catch(data => {
        if (data.error.errors) {
          return Promise.reject(data.error.errors);
        }
        return Promise.reject(['O servidor está desconectado!']);
      });
  }

  async getRequest(url: string, isString?: boolean): Promise<any> {
    return await this.http.get(url, this.addHeaders(isString)).toPromise()
      .then(async (result) => {
        return result;
      })
      .catch(async (error) => {
        if (error.status === 401 || error.status === '401') {
          this.router.navigate(['/login']);
        }
      });
  }

  private addHeaders(isString?: boolean): { headers: HttpHeaders } {
    var access_token = localStorage.getItem('token');
    let data = { headers: new HttpHeaders().set("Authorization", `Bearer ${access_token}`) };

    if (isString) {
      Object.assign(data, { responseType: 'text' as 'json' })
    }

    return data;
  }

}
