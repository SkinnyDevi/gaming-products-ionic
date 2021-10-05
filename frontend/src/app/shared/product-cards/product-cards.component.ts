import { Component, Input, OnInit } from '@angular/core';

import { GStockProduct } from '../../models/gstockproduct';

@Component({
  selector: 'app-product-cards',
  templateUrl: './product-cards.component.html',
  styleUrls: ['./product-cards.component.scss'],
})
export class ProductCardsComponent implements OnInit {

  @Input() product: GStockProduct;

  ngOnInit() {}

}
