package com.felix.bicycles.entity.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "bicycles")
public class Bicycle implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	long id;
	
	String model;
	int creation_year;
	
	public Bicycle(long id, String model, int creation_year) {
		super();
		this.id = id;
		this.model = model;
		this.creation_year = creation_year;
	}
	
	public Bicycle() {}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public int getCreation_year() {
		return creation_year;
	}

	public void setCreation_year(int year) {
		this.creation_year = year;
	}
}
