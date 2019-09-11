import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() nomePagina: string;
  foto: string;

  constructor() { }

  ngOnInit() {
    const foto = localStorage.getItem('foto');
    if (foto) {
      this.foto = 'data:image/jpeg;base64,' + foto;
    }
    else {
      this.foto = '../../../assets/anon_img.png';
    }

  }

}
