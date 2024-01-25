import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoRoutingModule } from './to-do-routing.module';
import {MatLabel} from "@angular/material/form-field";


@NgModule({
  declarations: [],
  imports: [
    MatLabel,
    CommonModule,
    ToDoRoutingModule
  ]
})
export class ToDoModule { }
