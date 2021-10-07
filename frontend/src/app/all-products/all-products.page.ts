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
  public static serverNotStarted: boolean;
  public serverStatus: boolean;

  constructor(private router: Router,
    private gstockService: GStockProductService) { }

  ngOnInit() {
    (async () => {
      // Do something before delay
      this.loadInfoAndServerTester();
      await this.delay(1000);
      // Do something after
      this.serverStatus = AllProductsPage.serverNotStarted;
      if (this.serverStatus) {
        let mainContent = document.getElementById('main-container');
        mainContent.style.top = '190px';
      } else {
        console.log("Server connected.");
      };
    })();

  }

  async delay(ms: number) {
    await new Promise(f => setTimeout(f, ms));
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

  loadInfoAndServerTester() {
    this.gstockService.getProducts().subscribe((p: Array<GStockProduct>) => {
      this.products = p;
    });
  }
}
