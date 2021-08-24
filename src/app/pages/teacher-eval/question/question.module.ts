import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuestionRoutes } from './question-routing';
import { QuestionComponent } from './question.component';
import {MessageService} from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';

import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {PaginatorModule} from 'primeng/paginator';
import {ToastModule} from 'primeng/toast';
import {Table, TableModule} from 'primeng/table';



@NgModule({
  
  imports: [
    CommonModule,
    DropdownModule,
    RadioButtonModule,
    ButtonModule,
    ConfirmDialogModule,
    PaginatorModule,
    ToastModule,
    TableModule
  
   
    
    
    
  ],
   declarations: [QuestionComponent],
    providers: [MessageService, ConfirmationService]
})
export class QuestionModule {
  
 } 
