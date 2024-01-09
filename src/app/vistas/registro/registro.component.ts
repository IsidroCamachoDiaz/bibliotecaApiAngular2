import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/modelo/Usuario';
import { BaseDeDatosService } from 'src/app/servicios/base-de-datos.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  constructor(private fbs:BaseDeDatosService,private f:FormBuilder,private r:Router){}
  fechaActual=new Date;
usuarioMeter:Usuario={
  idUsuario: 0,
  apellidosUsuario: '',
  claveUsuario: '',
  dniUsuario: '',
  emailUsuario: '',
  estaBloqueadoUsuario: false,
  nombreUsuario: '',
  tlfUsuario: '',
  id_acceso:1
}
  formulario=this.f.group({
    nombreUsuario:["",Validators.required],
    apellidosUsuario:["",Validators.required],
    dniUsuario:["",Validators.required],
    claveUsuario:["",Validators.required],
    claveUsuarioRepetida:["",Validators.required],
    emailUsuario:["",Validators.required],
    telefonoUsuario:["",Validators.required],
  });

  anadirFormulario(){
    const nombre=this.formulario.get("nombreUsuario")?.value!;
    const apellidos=this.formulario.get("apellidosUsuario")?.value!;
    const dni=this.formulario.get("dniUsuario")?.value!;
    const clave=this.fbs.encriptarContra(this.formulario.get("claveUsuario")?.value!);
    const claveRepetida=this.fbs.encriptarContra(this.formulario.get("claveUsuarioRepetida")?.value!);
    const email=this.formulario.get("emailUsuario")?.value!;
    const telefono=this.formulario.get("telefonoUsuario")?.value!;
    
    if(clave!=claveRepetida){
      alert("Las contraseñas no coinciden");
    }
    else{
      this.usuarioMeter.apellidosUsuario=apellidos;
      this.usuarioMeter.nombreUsuario=nombre;
      this.usuarioMeter.dniUsuario=dni;
      this.usuarioMeter.claveUsuario=clave;
      this.usuarioMeter.emailUsuario=email;
      this.usuarioMeter.tlfUsuario=telefono;

      console.log(this.usuarioMeter);

      this.fbs.insertarUSuario(this.usuarioMeter).subscribe(
        respuesta => {
          // Lógica cuando la solicitud es exitosa
          console.log(respuesta);
        },
        error => {
          // Lógica cuando hay un error
          console.error(error);
        }
      );
      this.r.navigateByUrl("/menu/"+dni);
    }

  }
}
