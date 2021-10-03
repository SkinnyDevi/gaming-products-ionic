package com.felix.gstock.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.felix.gstock.entity.models.GStockProduct;
import com.felix.gstock.entity.services.IGStockService;

@CrossOrigin(origins = "http://localhost:8100")
@RestController
public class GamingStockController {
	
	final String dbRoot = "/db_gaming_stock";
	
	@Autowired
	IGStockService gstockService;
	
	@GetMapping(dbRoot)
	private List<GStockProduct> getAll(){
		return gstockService.getAll();
	}
	
	@GetMapping(dbRoot+"/{id}")
	private GStockProduct getOne(@PathVariable("id") long productId) {
		Optional<GStockProduct> product = gstockService.getOne(productId);
		if (product.isPresent()) {
			return product.get();
		}
		return null;
	}
	
	@PostMapping(value = dbRoot, consumes = "application/json")
	private void addUsingJson(@RequestBody String jsonProduct) {
		ObjectMapper om = new ObjectMapper();
		try {
			GStockProduct product = om.readValue(jsonProduct, GStockProduct.class);
			gstockService.add(product);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}
	
	@DeleteMapping(dbRoot+"/{id}")
	private void delete(@PathVariable("id") long id) {
		gstockService.delete(id);
	}
	
	@PutMapping(value = dbRoot+"/{id}", consumes = "application/json")
	private void update(@RequestBody String jsonUpdatedProduct, @PathVariable("id") long productId) {
		ObjectMapper om = new ObjectMapper();
		try {
			GStockProduct product = om.readValue(jsonUpdatedProduct, GStockProduct.class);
			gstockService.update(product, productId);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}
	
}