import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermnsPage } from './termns.page';

const routes: Routes = [
  {
    path: '',
    component: TermnsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermnsPageRoutingModule {}
