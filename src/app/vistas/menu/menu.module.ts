import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    MatTableModule
  ]
})
export class MenuModule { }