package com.felix.gstock.entity.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "stock")
public class GStockProduct implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;
	
	String product_name;
	int stock;
	double price;
	
	public GStockProduct(long id, String product_name, int stock, double price) {
		super();
		this.id = id;
		this.product_name = product_name;
		this.stock = stock;
		this.price = price;
	}
	
	public GStockProduct() {}

	public long getProductId() {
		return id;
	}

	public void setProductId(long productId) {
		this.id = productId;
	}

	public String getproduct_name() {
		return product_name;
	}

	public void setproduct_name(String product_name) {
		this.product_name = product_name;
	}

	public int getStock() {
		return stock;
	}

	public void setStock(int stock) {
		this.stock = stock;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
}
