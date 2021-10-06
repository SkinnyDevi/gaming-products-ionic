import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GStockProduct } from '../models/gstockproduct';
import { GStockProductService } from '../services/gstockproduct.service';
import { ErrorInterceptorService } from 'app/services/error-interceptor.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public productID: number = 1;

  public serverNotStarted: boolean;
  public products: Array<GStockProduct> = [];
  public product: GStockProduct = new GStockProduct();
  public updateProduct: GStockProduct = new GStockProduct();

  constructor(
    private router: Router,
    private gstockService: GStockProductService,
    private errorInterceptorService: ErrorInterceptorService
  ) {}

  ngOnInit(): void {
    (async () => {
      // Do something before delay
      console.log('before delay')
      this.loadInfo();
    console.log("LOADINFO");

      await this.delay(1000);

      // Do something after
      this.errorInterceptorService.getStatus().subscribe((stat) => {
        console.log(stat)
      })
      console.log('after delay')
  })();
  }

  async delay(ms: number) {
    await new Promise(f => setTimeout(f, ms));
  }

  goToAllProducts(): void {
    this.router.navigateByUrl("/all-products").then(() => {
      window.location.reload();
    });
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

  deleteProduct(id: number) {
    console.log('deleteProduct');
    this.gstockService.deleteProduct(id).subscribe(() => {
      this.loadInfo();
    });
  }

  updateGStockProduct(id: number) {
    this.gstockService
      .getProductById(this.productID)
      .subscribe((p: GStockProduct) => {
        this.updateProduct = p;
        console.log(this.updateProduct.stock);
        this.updateProduct.stock = this.updateProduct.stock + 1;
        console.log(this.updateProduct);

        this.gstockService
          .updateProduct(this.updateProduct, id)
          .subscribe(() => {
            this.loadInfo();
          });
      });
  }
}
