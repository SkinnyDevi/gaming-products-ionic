import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherPagePage } from './other-page.page';

const routes: Routes = [
  {
    path: '',
    component: OtherPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherPagePageRoutingModule {}
