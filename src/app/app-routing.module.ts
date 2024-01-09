import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'inicio', loadChildren: () => import('./vistas/inicio/inicio.module').then(m => m.InicioModule) }, { path: 'registro', loadChildren: () => import('./vistas/registro/registro.module').then(m => m.RegistroModule) }, { path: 'menu', loadChildren: () => import('./vistas/menu/menu.module').then(m => m.MenuModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
