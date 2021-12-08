import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewcontactPageRoutingModule } from './newcontact-routing.module';

import { NewcontactPage } from './newcontact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewcontactPageRoutingModule, ReactiveFormsModule
  ],
  declarations: [NewcontactPage]
})
export class NewcontactPageModule {}
