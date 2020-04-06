import { Injectable } from '@angular/core';
import { UsuarioForm } from '../pages/configuracao/models/usuario-form.model';
import { ApiRequestService } from './api-request.service';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = `${environment.apiUrl}/usuario`;

  constructor(private apiService: ApiRequestService) { }

  async atualizarDadosDeUsuario(usuario: UsuarioForm | Usuario | any) {
    return await this.apiService.putRequest(this.url, usuario);
  }


}
