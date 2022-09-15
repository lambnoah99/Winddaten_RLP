import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParkDetailsPageRoutingModule } from './park-details-routing.module';

import { ParkDetailsPage } from './park-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParkDetailsPageRoutingModule
  ],
  declarations: [ParkDetailsPage]
})
export class ParkDetailsPageModule {}
