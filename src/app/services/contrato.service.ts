import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { environment } from 'src/environments/environment';
import { Contrato } from '../models/contrato';
import { ContratosProximo, ContratoProximo } from '../models/contratos-proximo';
import { LocalizacaoService } from './localizacao.service';
import { ApiResponse } from '../models/response';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  apiUrl: string = environment.apiUrl;
  distancia = 1000;

  constructor(
    private authService: AuthService,
    private apiService: ApiRequestService,
    private localizacaoService: LocalizacaoService
  ) { }

  async obterContratos(latitude: number, longitude: number, range: number): Promise<ContratosProximo> {
    const url = `${this.apiUrl}/contrato/proximos?latitude=${latitude}&longitude=${longitude}&range=${range}`;
    return await this.apiService.getRequest(url)
      .then(async (resultado: ContratosProximo) => {
        return resultado;
      });
  }

  async obterContratoProximoPeloId(id: number): Promise<ApiResponse<ContratoProximo>> {
    const url = `${this.apiUrl}/contrato/${id}`;
    return await this.apiService.getRequest(url);
  }

  async obterContratosProximos(): Promise<Array<ContratoProximo>> {
    return await this.localizacaoService.obterLocalizacaoAtual()
      .then(async (localizacao: any) => {
        return await this.obterContratos(localizacao.latitude, localizacao.longitude, this.distancia)
          .then(async (contratos: ContratosProximo) => {
            return contratos.data.content;
          });
      });
  }

  async obterTodosOsContratos() {
    return await this.apiService.getRequest(`${environment.apiUrl}/contratos`);
  }

  async criarContrato(contrato: Contrato) {
    const url = `${environment.apiUrl}/contrato`;
    return await this.apiService.postRequest(url, contrato);
  }


  async aceitarContrato(contrato: ContratoProximo): Promise<boolean> {
    const url = `${environment.apiUrl}/contrato/${contrato.id}`;
    return await this.apiService.putRequest(url, contrato)
      .then(async () => true)
      .catch(async () => false);
  }

  seJaAceito(contrato: ContratoProximo): boolean {
    return contrato.usuarios.length === 2;
  }

}
