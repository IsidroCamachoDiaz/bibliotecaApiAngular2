import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/Usuario';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit{
constructor(private fbs:BaseDeDatosService,private f:FormBuilder,private r:Router){}
datosPuros:any[]=[];
usuarios:Usuario[]=[];
usuarioBD:Usuario={
  idUsuario: 0,
  apellidosUsuario: '',
  claveUsuario: '',
  dniUsuario: '',
  emailUsuario: '',
  estaBloqueadoUsuario: false,
  nombreUsuario: '',
  tlfUsuario: ''
}

formulario=this.f.group({
  dni:["",Validators.required],
  contrasenia:["",Validators.required]
});

  ngOnInit(): void {
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
      }
      console.log(res);
      console.log(this.usuarios);
    });

  }
  anadirFormulario(){
    const dni=this.formulario.get("dni")?.value!;
    const contrasenia=this.fbs.encriptarContra(this.formulario.get("contrasenia")?.value!);
    this.fbs.obtenerUsuarioPorDNI(dni).subscribe(res=>{
      this.usuarioBD=res;
      console.log(res);

      if(this.usuarioBD==null){
        alert("No se encontro al usuario")
      }
      else{
        if(contrasenia==this.usuarioBD.claveUsuario){
          if(this.usuarioBD.estaBloqueadoUsuario==true){
            alert("Esta usted bloqueado Hasta: "+this.usuarioBD.fchFinBloqueo)
          }
          else{
            alert("Entro correctamente")
            this.r.navigateByUrl("/menu/"+dni)
          }
        }
        else{
          alert("El usuario y/o contraseña es incorrecto")
        }
      }
    });
  
  }

}
