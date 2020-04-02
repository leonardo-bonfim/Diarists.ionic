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
  distancia = 1000;

  constructor(
    private apiService: ApiRequestService,
    private localizacaoService: LocalizacaoService) { }

  async obterContratos(latitude: number, longitude: number, range: number): Promise<ContratosProximo> {
    const url = `${this.apiUrl}/contrato/proximos?latitude=${latitude}&longitude=${longitude}&range=${range}`;
    return await this.apiService.getRequest(url)
      .then(async (resultado: ContratosProximo) => {
        return resultado;
      });
  }

  async obterContratoProximoPeloId(id: number): Promise<{ id: number, contrato: ContratoProximo }> {
    return await new Promise(async (resolve, reject) => {
      await this.obterContratosProximos()
        .then(async (resultado) => {
          const contrato = resultado.find(c => c.id === id);
          resolve(contrato);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  async obterContratosProximos(): Promise<Array<{ id: number, contrato: ContratoProximo }>> {
    return new Promise(async (resolve, reject) => {
      await this.localizacaoService.obterLocalizacaoAtual()
        .then(async (localizacao: any) => {
          await this.obterContratos(localizacao.latitude, localizacao.longitude, this.distancia)
            .then(async (contratos: ContratosProximo) => {
              const mapeado = contratos.data.content.map((contrato: ContratoProximo, id: number) => {
                return { id, contrato };
              });
              resolve(mapeado);
            })
            .catch(error => {
              reject(error);
            });
        })
        .catch(async (error) => {
          reject(error);
        });

    });
  }

  async criarContrato(contrato: Contrato) {
    const url = `${environment.apiUrl}/contrato`;
    return await this.apiService.postRequest(url, contrato);
  }

}
