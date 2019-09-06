import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http: HttpClient) { }

  async postRequest(url, body: any) {
    await this.http.post(url, body, this.addHeaders()).toPromise().then(() => {
      console.log('gravado');
    });
  }

  async getRequest(url, isString?: boolean) {
    return await this.http.get(url, this.addHeaders(isString)).toPromise();
  }

  private addHeaders(isString?: boolean) {
    var access_token = localStorage.getItem('token');
    let data = { headers: new HttpHeaders().set("Authorization", `Bearer ${access_token}`)};

    if(isString) {
      Object.assign(data, {responseType: 'text' as 'json'})
    }

    return data;
  }

}
