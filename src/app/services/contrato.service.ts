import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { environment } from 'src/environments/environment';
import { Contrato } from '../models/contrato';
import { ContratosProximo, ContratoProximo } from '../models/contratos-proximo';
import { LocalizacaoService } from './localizacao.service';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  apiUrl: string = environment.apiUrl;

  contratos: Array<{ id: number, contrato: ContratoProximo }>;

  constructor(
    private apiService: ApiRequestService,
    private localizacaoService: LocalizacaoService
  ) { }

  async obterContratos(latitude: number, longitude: number, range: number): Promise<ContratosProximo> {
    let url = `${this.apiUrl}/contrato/proximos?latitude=${latitude}&longitude=${longitude}&range=${range}`;
    return await this.apiService.getRequest(url)
      .then(async (resultado: ContratosProximo) => {
        return resultado;
      });
  }

  async obterContratosProximos(distancia: number): Promise<ContratosProximo> {
    return await this.localizacaoService.obterLocalizacaoAtual()
      .then(async (localizacao: any) => {
        return await this.obterContratos(localizacao.latitude, localizacao.longitude, distancia)
          .then(async (contratos: ContratosProximo) => {
            return contratos;
          });
      });
  }

  async criarContrato(contrato: Contrato) {
    let url = `${environment.apiUrl}/contrato`;
    return await this.apiService.postRequest(url, contrato);
  }

}
