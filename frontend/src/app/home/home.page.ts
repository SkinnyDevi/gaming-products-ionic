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

  public static serverNotStarted: boolean;
  public serverStatus: boolean;
  public products: Array<GStockProduct> = [];
  public product: GStockProduct = new GStockProduct();
  public updateProduct: GStockProduct = new GStockProduct();

  constructor(
    private router: Router,
    private gstockService: GStockProductService,
  ) { }

  ngOnInit(): void {
    (async () => {
      // Do something before delay
      this.loadInfo();
      await this.delay(1000);
      // Do something after
      this.serverStatus = HomePage.serverNotStarted;
    })();
  }

  public static setServerStatus(stat: boolean) {
    this.serverNotStarted = stat;
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
}
