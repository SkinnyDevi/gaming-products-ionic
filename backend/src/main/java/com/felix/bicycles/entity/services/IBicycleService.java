package com.felix.bicycles.entity.services;
import java.util.List;
import java.util.Optional;

import com.felix.bicycles.entity.models.Bicycle;

public interface IBicycleService {
	Optional<Bicycle> getOne(long idBicycle);
	List<Bicycle> getAll();
	void add(Bicycle bicycle);
	void delete(long idBicycle);
	void update(Bicycle bicycle, long idBicycle);
}
