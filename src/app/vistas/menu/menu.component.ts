import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/Usuario';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(private ruta: ActivatedRoute, private fbs: BaseDeDatosService,private r:Router) { }
  dni: any;
  usuario: Usuario = {
    idUsuario: 0,
    apellidosUsuario: '',
    claveUsuario: '',
    dniUsuario: '',
    emailUsuario: '',
    estaBloqueadoUsuario: false,
    nombreUsuario: '',
    tlfUsuario: ''
  }

  ngOnInit(): void {

    if (this.ruta.snapshot.paramMap.get("dni")) {
      this.dni = this.ruta.snapshot.paramMap.get("dni");
      this.fbs.obtenerUsuarioPorDNI(this.dni).subscribe(res => {
        this.usuario = res;
        console.log(this.usuario);
        if(this.usuario==null){
          alert("No inicio Sesion Correctamente");
          this.r.navigateByUrl("/inicio");
        }
      });
    }
    console.log(this.ruta.snapshot.paramMap.get("dni"));
  }
}
