import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageProductsPageRoutingModule } from './manage-products-routing.module';
import { ManageProductsPage } from './manage-products.page';
import { ProductCardsComponent } from '../shared/product-cards/product-cards.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageProductsPageRoutingModule
  ],
  declarations: [ManageProductsPage, ProductCardsComponent]
})
export class ManageProductsPageModule {}
