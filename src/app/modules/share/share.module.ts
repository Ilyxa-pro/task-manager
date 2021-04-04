import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {RefDirective} from '../../directives/ref.directive';
import {ModalComponent} from '../../components/modal/modal.component';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import GeneralHelper from '../../helpers/general.helper';



@NgModule({
  declarations: [
      RefDirective,
      ModalComponent
  ],
  imports: [
    RouterModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    RefDirective,
    ModalComponent,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    GeneralHelper
  ]
})
export class ShareModule { }
