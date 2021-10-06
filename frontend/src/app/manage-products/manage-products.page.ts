import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GStockProduct } from 'app/models/gstockproduct';
import { GStockProductService } from 'app/services/gstockproduct.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.page.html',
  styleUrls: ['./manage-products.page.scss'],
})
export class ManageProductsPage implements OnInit {

  public products: Array<GStockProduct> = [];
  public product: GStockProduct = new GStockProduct();

  constructor(private router: Router, private gstockService: GStockProductService, public alertController: AlertController) { }

  ngOnInit() {
    this.loadInfo();
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

  loadInfo() {
    this.gstockService.getProducts().subscribe((p: Array<GStockProduct>) => {
      this.products = p;
    });
  }

  deleteProduct(id: number) {
    console.log('deleteProduct');
    this.gstockService.deleteProduct(id).subscribe(() => {
      this.loadInfo();
    });
  }

  async deleteAlert(product: GStockProduct) {
    const alert = await this.alertController.create({
      header: 'Delete Product',
      message: 'Are you sure you want to delete '+product.product_name+'?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            return cancel;
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.deleteProduct(product.id);
          }
        }
      ]
    });

    await alert.present();
  }

  async updateAlert(product: GStockProduct) {
    const alert = await this.alertController.create({
      header: 'Update Product',
      inputs: [
        {
          name: 'product_name',
          placeholder: 'Product Name',
          value: product.product_name,
        },
        {
          name: 'product_desc',
          placeholder: 'Product Description',
          value: product.product_desc,
        },
        {
          name: 'stock',
          placeholder: 'Current Stock',
          value: product.stock,
        },
        {
          name: 'img_url',
          placeholder: 'Image URL',
          value: product.img_url,
        },
        {
          name: 'price',
          placeholder: 'Price',
          value: product.price,
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            return cancel;
          }
        }, {
          text: 'Update',
          handler: () => {
            //this.deleteProduct(product.id);
            console.log("update TODO")
          }
        }
      ]
    });

    await alert.present();
  }
}
