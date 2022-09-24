import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'map-tab',
        loadChildren: () => import('../pages/map-tab/map-tab.module').then(m => m.MapTabPageModule)
      },
      {
        path: 'park-list',
        loadChildren: () => import('../pages/park-list/park-list.module').then(m => m.ParkListPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/map-tab',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/map-tab',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
