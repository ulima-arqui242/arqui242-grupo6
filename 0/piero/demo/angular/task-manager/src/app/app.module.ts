import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Para ngModel
import { CommonModule } from '@angular/common';  // Para *ngFor

import { AppComponent } from './app.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TasksComponent } from './tasks/tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,     // Importa FormsModule para ngModel
    CommonModule     // Importa CommonModule para *ngFor
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
