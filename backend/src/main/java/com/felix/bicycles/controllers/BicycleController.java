package com.felix.bicycles.controllers;

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
import com.felix.bicycles.entity.models.Bicycle;
import com.felix.bicycles.entity.services.IBicycleService;

@CrossOrigin(origins = "http://localhost:8100")
@RestController
public class BicycleController {
	
	final String dbRoot = "/db_bicycles";
	
	@Autowired
	IBicycleService bicycleService;
	
	@GetMapping(dbRoot)
	private List<Bicycle> getAll(){
		return bicycleService.getAll();
	}
	
	@GetMapping(dbRoot+"/{id}")
	private Bicycle getOne(@PathVariable("id") long id) {
		Optional<Bicycle> b = bicycleService.getOne(id);
		if (b.isPresent()) {
			return b.get();
		}
		return null;
	}

	@PostMapping(value = dbRoot, consumes = "application/x-www-form-urlencoded")
	private void add(Bicycle bicycle) {
		bicycleService.add(bicycle);
	}
	
	@PostMapping(value = dbRoot, consumes = "application/json")
	private void addUsingJson(@RequestBody String jsonBicycle) {
		ObjectMapper om = new ObjectMapper();
		try {
			Bicycle bicycle = om.readValue(jsonBicycle, Bicycle.class);
			bicycleService.add(bicycle);
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
	}
	
	@DeleteMapping(dbRoot+"/{id}")
	private void delete(@PathVariable("id") long id) {
		bicycleService.delete(id);
	}
	
	@PutMapping(value = dbRoot+"/{id}", consumes = "application/x-www-form-urlencoded")
	private void update(Bicycle bicycle, @PathVariable("id") long id) {
		bicycleService.update(bicycle, id);
	}
	
}
