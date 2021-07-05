import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummonerPage } from './summoner.page';

const routes: Routes = [
  {
    path: '',
    component: SummonerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummonerPageRoutingModule {}
