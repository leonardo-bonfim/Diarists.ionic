import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.page.html',
  styleUrls: ['./configuracao.page.scss'],
})
export class ConfiguracaoPage implements OnInit {


  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  deslogar(): void {
    this.authService.deslogarUsuario();
    this.router.navigate(['/login']);
  }

}

