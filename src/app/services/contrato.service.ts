import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { environment } from 'src/environments/environment';
import { Contrato } from '../models/contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  apiUrl: string = environment.apiUrl;

  constructor(private apiService: ApiRequestService) { }

  obterContratos(latitude: number, longitude: number, range: number): Promise<any> {
    let url = `${this.apiUrl}/contrato/proximos?latitude=${latitude}&longitude=${longitude}&range=${range}`;
    return this.apiService.getRequest(url);
  }

  criarContrato (contrato: Contrato) {
    let url = `${environment.apiUrl}/contrato`;
    return this.apiService.postRequest(url, contrato);
  }

}
