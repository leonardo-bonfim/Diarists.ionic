import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http: HttpClient) { }

  postRequest(url, body: any) {
    this.http.post(url, body).toPromise().then(() => {
      console.log('gravado');
    });
  }

  getRequest(url) {
    return this.http.get(url, this.addHeaders()).toPromise();
  }

  private addHeaders() {
    var access_token = localStorage.getItem('token');
    return { headers: new HttpHeaders().set("Authorization", `Bearer ${access_token}`), responseType: 'text' as 'json'};
  }

}
