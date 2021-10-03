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

  public productID: number = 1;

  public products: Array<GStockProduct> = [];
	public product: GStockProduct = new GStockProduct();
  public updateProduct: GStockProduct = new GStockProduct();

  constructor(private router: Router, private gstockService: GStockProductService) {}

  ngOnInit(): void {
    this.loadInfo();
  }

  loadInfo() {
		this.gstockService.getProducts().subscribe((p: Array<GStockProduct>) => {
			this.products = p;
		})

		this.gstockService.getProductById(this.productID).subscribe((p: GStockProduct) => {
			this.product = p;
		})
	}

  addProduct(){
    console.log("addProduct")
    const p: GStockProduct = {id: 0, product_name: "Mouse G-Lab", stock: 5, price: 13.99};
    this.gstockService.addProductUsingJSON(p).subscribe(() => {
			this.loadInfo()
		});
  }

  deleteProduct(id: number){
		console.log("deleteProduct")
		this.gstockService.deleteProduct(id).subscribe(() => {
			this.loadInfo()
		});
	}

  updateGStockProduct(id: number){
    this.gstockService.getProductById(this.productID).subscribe((p: GStockProduct) => {
			this.updateProduct = p;
      console.log(this.updateProduct.stock)
      this.updateProduct.stock = this.updateProduct.stock + 1;
      console.log(this.updateProduct)

      this.gstockService.updateProduct(this.updateProduct, id).subscribe(() => {
        this.loadInfo();
      });
		});
	}

}
