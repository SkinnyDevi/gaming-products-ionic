import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GStockProduct } from 'app/models/gstockproduct';
import { GStockProductService } from 'app/services/gstockproduct.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.page.html',
  styleUrls: ['./all-products.page.scss'],
})
export class AllProductsPage implements OnInit {

  public products: Array<GStockProduct> = [];
  public product: GStockProduct = new GStockProduct();

  constructor(private router: Router,
    private gstockService: GStockProductService) { }

  ngOnInit() {
    this.loadInfo();
  }

  goToAddProducts(): void {
    this.router.navigateByUrl("/add-products").then(() => {
      window.location.reload();
    });
  }

  goToManageProducts(): void {
    this.router.navigateByUrl("/manage-products").then(() => {
      window.location.reload();
    });
  }

  loadInfo() {
    this.gstockService.getProducts().subscribe((p: Array<GStockProduct>) => {
      this.products = p;
    });
  }

  addProduct() {
    console.log('addProduct');
    const p: GStockProduct = {
      id: 0,
      product_name: 'Mouse G-Lab',
      product_desc: '4800 DPI and high precision with multiple buttons',
      img_url:
        'https://media.ldlc.com/r1600/ld/products/00/05/38/39/LD0005383977_2.jpg',
      stock: 5,
      price: "13.99",
    };
    this.gstockService.addProductUsingJSON(p).subscribe(() => {
      this.loadInfo();
    });
  }

}
