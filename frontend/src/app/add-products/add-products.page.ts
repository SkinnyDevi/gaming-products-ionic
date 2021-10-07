import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GStockProduct } from 'app/models/gstockproduct';
import { GStockProductService } from 'app/services/gstockproduct.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {
  public additionForm: FormGroup;
  public previewProduct: GStockProduct;
  public imgRegexString: string = '(https?:\/\/[^ ]*\.(?:png|jpg|jpeg|svg))'
  public imgRegex: RegExp = new RegExp(this.imgRegexString);
  public static serverNotStarted: boolean;
  public serverStatus: boolean;

  constructor(private router: Router, private alertController: AlertController, private gstockService: GStockProductService) {
    this.previewProduct = {
      id: 0,
      product_name: 'Sample Product',
      product_desc: 'A very good description indeed.',
      img_url:
        '../../assets/img/sample.jpg',
      stock: 5,
      price: "4.99",
    };
  }

  ngOnInit() {
    this.additionForm = new FormGroup({
      product_name: new FormControl('Sample Product', Validators.required),
      product_desc: new FormControl('A very good description indeed.', Validators.required),
      stock: new FormControl(0, Validators.min(5)),
      img_url: new FormControl('', [Validators.pattern(this.imgRegexString), Validators.required]),
      price: new FormControl('4.99', [Validators.required, Validators.maxLength(6), Validators.min(0)]),
    });

    (async () => {
      // Do something before delay
      this.serverTester();
      await this.delay(1000);
      // Do something after
      this.serverStatus = AddProductsPage.serverNotStarted;
      if (this.serverStatus) {
        let mainContent = document.getElementById('main-container');
        mainContent.style.top = '190px';
      } else {
        console.log("Server connected.");
      };
    })();
  }

  serverTester() {
    this.gstockService.getProducts().subscribe((p) => {
    });
  }

  async delay(ms: number) {
    await new Promise(f => setTimeout(f, ms));
  }

  goToAllProducts(): void {
    this.router.navigateByUrl("/all-products").then(() => {
      window.location.reload();
    });
  }

  goToManageProducts(): void {
    this.router.navigateByUrl("/manage-products").then(() => {
      window.location.reload();
    });
  }

  onPreview() {
    let formReturn = this.additionForm.value;

    let name = formReturn.product_name;
    let desc = formReturn.product_desc;
    let stock = formReturn.stock;
    let img_url = formReturn.img_url;
    let price = formReturn.price;

    if (name === null || name === '') {
      name = 'Sample Product';
    }

    if (desc === null || desc === '') {
      desc = 'A very good description indeed.';
    }

    if (stock === null || stock === '') {
      stock = 5;
    }

    if (img_url === null || img_url === '' || !this.imgRegex.test(img_url)) {
      img_url = '../../assets/img/imgNotFound.jpg';
    }

    if (price === null || price === '' || isNaN(+price)) {
      price = '13.99';
    }

    this.previewProduct = {
      id: 0,
      product_name: name,
      product_desc: desc,
      stock: stock,
      img_url: img_url,
      price: price
    };
  }

  onAddition() {
    let formReturn = this.additionForm.value;

    let name = formReturn.product_name;
    let desc = formReturn.product_desc;
    let stock = formReturn.stock;
    let img_url = formReturn.img_url;
    let price = formReturn.price;

    let valid: boolean = true;

    if (name === null || name === '') {
      valid = false;
    }

    if (desc === null || desc === '') {
      valid = false;
    }

    if (stock === null || stock === '' || stock < 5) {
      valid = false;
    }

    if (img_url === null || img_url === '' || !this.imgRegex.test(img_url)) {
      valid = false;
    }

    if (price === null || price === '' || isNaN(+price)) {
      valid = false;
    }

    if (!valid) {
      this.additionFailed();
    } else {
      this.addProduct(formReturn);
    }
  }

  async additionFailed() {
    const alert = await this.alertController.create({
      header: 'Addition Failed',
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

  addProduct(product: GStockProduct) {
    this.gstockService.addProductUsingJSON(product).subscribe(() => {
      this.router.navigateByUrl('/all-products');
    });
  }
}
