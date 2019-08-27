import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

//import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  private url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  postRequest(body: any) {
    this.http.post(this.url + '/contrato', body).toPromise().then(() => {
      console.log('gravado');
    });
  }

  getRequest(url) {
    return this.http.get(url).toPromise().then(resolve => {
      return resolve;
    })
  }

}
