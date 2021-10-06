import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GStockProduct } from 'app/models/gstockproduct';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.page.html',
  styleUrls: ['./add-products.page.scss'],
})
export class AddProductsPage implements OnInit {

  public formData: FormGroup;
  public previewProduct: GStockProduct;

  constructor(private router: Router) {
    this.previewProduct = {
      id: 0,
      product_name: 'Sample Product',
      product_desc: 'A very good description indeed.',
      img_url:
        '../../assets/img/sample.jpg',
      stock: 5,
      price: "13.99",
    };
  }

  ngOnInit() {
    this.formData = new FormGroup({
      product_name: new FormControl('Sample Product', Validators.required),
      product_desc: new FormControl('A very good description indeed.', Validators.required),
      stock: new FormControl(0, Validators.min(5)),
      img_url: new FormControl('', [Validators.pattern('(https?:\/\/[^ ]*\.(?:gif|png|jpg|jpeg))'), Validators.required]),
      price: new FormControl('4.99', Validators.required),
    });
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
    let formReturn = this.formData.value;

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

    if (img_url === null || img_url === '') {
      img_url = '../../assets/img/sample.jpg';
    }

    if (price === null || price === '') {
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
}
