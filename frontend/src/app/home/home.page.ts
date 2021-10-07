import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GStockProduct } from '../models/gstockproduct';
import { GStockProductService } from '../services/gstockproduct.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public static serverNotStarted: boolean;
  public serverStatus: boolean;

  constructor(
    private router: Router,
    private gstockService: GStockProductService,
  ) { }

  ngOnInit(): void {
    (async () => {
      // Do something before delay
      this.serverTester();
      await this.delay(1000);
      // Do something after
      this.serverStatus = HomePage.serverNotStarted;
      if (!this.serverTester) {
        console.log("Server connected");
      }
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

  serverTester() {
    this.gstockService.getProducts().subscribe((p) => {
    });
  }
}
