import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get(url).toPromise().then(resolve => {
      return resolve;
    });
  }

}
