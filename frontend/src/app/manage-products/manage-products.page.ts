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
  public imgRegexString: string = '(https?://[^ ]*.(?:png|jpg|jpeg|svg))';
  public imgRegex: RegExp = new RegExp(this.imgRegexString);

  constructor(
    private router: Router,
    private gstockService: GStockProductService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadInfo();
  }

  goToAllProducts(): void {
    this.router.navigateByUrl('/all-products').then(() => {
      window.location.reload();
    });
  }

  goToAddProducts(): void {
    this.router.navigateByUrl('/add-products').then(() => {
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
      message: 'Are you sure you want to delete ' + product.product_name + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            return cancel;
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteProduct(product.id);
          },
        },
      ],
    });

    await alert.present();
  }

  async updateAlert(product: GStockProduct) {
    const alert = await this.alertController.create({
      header: 'Update Product',
      subHeader: 'Change the fields you wish to update',
      cssClass: 'update-alert',
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
          attributes: {
            maxlength: 6,
          },
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (cancel) => {
            return cancel;
          },
        },
        {
          text: 'Update',
          handler: (productToUpdate) => {
            const updatedProduct: GStockProduct = {
              id: product.id,
              product_name: productToUpdate.product_name,
              product_desc: productToUpdate.product_desc,
              img_url: productToUpdate.img_url,
              stock: productToUpdate.stock,
              price: productToUpdate.price,
            };
            this.updateValidator(updatedProduct);
          },
        },
      ],
    });

    await alert.present();
  }

  updateValidator(product: GStockProduct) {
    let name = product.product_name;
    let desc = product.product_desc;
    let stock = product.stock;
    let img_url = product.img_url;
    let price = product.price;

    let valid: boolean = true;

    if (name === null || name === '') {
      valid = false;
    }

    if (desc === null || desc === '') {
      valid = false;
    }

    if (stock === null || stock < 5) {
      valid = false;
    }

    if (img_url === null || img_url === '' || !this.imgRegex.test(img_url)) {
      valid = false;
    }

    if (price === null || price === '') {
      valid = false;
    }

    if (!valid) {
      this.updateFailed();
    } else {
      this.updateGStockProduct(product.id, product);
    }
  }

  async updateFailed() {
    const alert = await this.alertController.create({
      header: 'Product Update Failed',
      message: 'Provided information does not meet with default minimum product requirements.',
      buttons: [
        {
          text: 'Review Product',
          handler: () => {}
        }
      ]
    });

    await alert.present();
  }

  updateGStockProduct(id: number, updatedProduct: GStockProduct) {
    this.gstockService.getProductById(id).subscribe(() => {
      this.gstockService.updateProduct(updatedProduct, id).subscribe(() => {
        this.loadInfo();
      });
    });
  }
}
