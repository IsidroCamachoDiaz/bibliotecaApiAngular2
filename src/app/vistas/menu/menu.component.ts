import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { zip } from 'rxjs';
import { Usuario } from 'src/app/modelo/Usuario';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';




@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dataSource:any;
  displayedColumns: string[]=[];
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

  datosPuros:any[]=[];
  usuarios:Usuario[]=[];

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

    this.fbs.obtenerUsuarios().subscribe(res=>{
      this.datosPuros=res;
      for(let i=0;i<this.datosPuros.length;i++){
        this.usuarios.push({
          idUsuario: this.datosPuros[i].idUsuario,
          apellidosUsuario: this.datosPuros[i].apellidosUsuario,
          claveUsuario: this.datosPuros[i].claveUsuario,
          dniUsuario: this.datosPuros[i].dniUsuario,
          emailUsuario: this.datosPuros[i].emailUsuario,
          estaBloqueadoUsuario: this.datosPuros[i].estaBloqueadoUsuario,
          nombreUsuario: this.datosPuros[i].nombreUsuario,
          tlfUsuario: this.datosPuros[i].tlfUsuario,
          fchAltaUsuario:this.datosPuros[i].fchAltaUsuario,
          fchBajaUsuario:this.datosPuros[i].fchBajaUsuario,
          fchFinBloqueo:this.datosPuros[i].fchFinBloqueo,
          acceso:this.datosPuros[i].acceso
        });

        this.displayedColumns=['dniUsuario', 'nombreUsuario', 'apellidosUsuario', 'tlfUsuario'];
        this.dataSource = this.usuarios;
      }
      console.log(res);
      console.log(this.usuarios);
      
    });
  }
}
