import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParkListPage } from './park-list.page';

const routes: Routes = [
  {
    path: '',
    component: ParkListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkListPageRoutingModule {}
