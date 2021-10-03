import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherPagePageRoutingModule } from './other-page-routing.module';

import { OtherPagePage } from './other-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherPagePageRoutingModule
  ],
  declarations: [OtherPagePage]
})
export class OtherPagePageModule {}
