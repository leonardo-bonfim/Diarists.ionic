import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Endereco } from '../models/endereco';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoService {

  urlGoogleGeoCode = 'https://maps.googleapis.com/maps/api/geocode/json?';
  googleKey = environment.googleApiKey;

  constructor(
    private geolocation: Geolocation,
    private http: HttpClient
  ) { }

  async obterEnderecoAtual(): Promise<Endereco> {
    return this.obterLocalizacaoAtual().then(gps => {
      const url = `${this.urlGoogleGeoCode}latlng=${gps.latitude},${gps.longitude}&key=${this.googleKey}`;
      return this.http.get(url).toPromise()
        .then(async (location: { results: Array<{ address_components: Array<{ long_name: string, short_name: string }> }> }) => {
          const endereco = new Endereco();
          endereco.numero = location.results[0].address_components[0].long_name;
          endereco.logradouro = location.results[0].address_components[1].long_name;
          endereco.bairro = location.results[0].address_components[2].long_name;
          endereco.cep = location.results[0].address_components[6].long_name;
          endereco.cidade = location.results[0].address_components[3].long_name;
          endereco.uf = location.results[0].address_components[4].short_name;
          return endereco;
        });
    })
  }

  async obterLocalizacaoAtual(): Promise<{ latitude: number, longitude: number }> {
    return this.geolocation.getCurrentPosition()
      .then(async data => {
        return {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude
        }
      });
  }

  async obterLocalizacaoPorCep(cep: string): Promise<{ latitude: number, longitude: number }> {
    const url = `${this.urlGoogleGeoCode}address=${cep}&key=${this.googleKey}`;
    return this.http.get(url).toPromise()
      .then(async resultado => {
        return {
          latitude: (resultado as any).results[0].geometry.location.lat,
          longitude: (resultado as any).results[0].geometry.location.lng
        }
      });
  }

  obterEnderecoString(endereco: Endereco) {
    return `${endereco.logradouro}\
      ${endereco.numero ? `, ${endereco.numero}` : ''}\
      ${endereco.bairro ? ` - ${endereco.bairro}` : ''}\
      ${endereco.cidade ? ` - ${endereco.cidade}` : ''}\
      ${endereco.uf ? ` - ${endereco.uf}` : ''}`;
  }
}
