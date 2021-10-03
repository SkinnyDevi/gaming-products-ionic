import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GStockProduct } from '../models/gstockproduct';

const httpOptionsNative = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

const httpOptionsJSON = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GStockProductService {

  endpoint: string = "http://localhost:8080/db_gaming_stock";

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<GStockProduct[]>{
    return this.httpClient.get<GStockProduct[]>(this.endpoint);
  }

	getProductById(id: number): Observable<GStockProduct>{
		return this.httpClient.get<GStockProduct>(this.endpoint + "/" + id);
	}

	addProductUsingJSON(product: GStockProduct): Observable<GStockProduct> {
    console.log(JSON.stringify(product))
    return this.httpClient.post<GStockProduct>(this.endpoint, JSON.stringify(product), httpOptionsJSON);
  }

	deleteProduct(id: number): Observable<GStockProduct> {
		return this.httpClient.delete<GStockProduct>(this.endpoint + "/" + id);
	}

  /*
  updateProduct(product: GStockProduct, id: number): Observable<GStockProduct> {
    const encodedBody = new URLSearchParams();
    encodedBody.append("product_name", product.product_name);
    encodedBody.append("stock", product.stock.toString());
    encodedBody.append("price", product.price.toString())
    const body = encodedBody.toString();

    console.log("updateProduct")
    console.log(JSON.stringify(product))
    return this.httpClient.put<GStockProduct>(this.endpoint + "/" + id, body, httpOptionsNative);
  }
  */

  updateProduct(product: GStockProduct, id: number): Observable<GStockProduct> {
    console.log(JSON.stringify(product));
    return this.httpClient.put<GStockProduct>(this.endpoint + "/" + id, JSON.stringify(product), httpOptionsJSON);
  }
}
