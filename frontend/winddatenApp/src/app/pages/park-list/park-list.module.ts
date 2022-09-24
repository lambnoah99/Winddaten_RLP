import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParkListPageRoutingModule } from './park-list-routing.module';

import { ParkListPage } from './park-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParkListPageRoutingModule
  ],
  declarations: [ParkListPage]
})
export class ParkListPageModule {}
