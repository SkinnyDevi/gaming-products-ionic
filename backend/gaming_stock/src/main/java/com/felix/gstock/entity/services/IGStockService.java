package com.felix.gstock.entity.services;

import java.util.List;
import java.util.Optional;

import com.felix.gstock.entity.models.GStockProduct;

public interface IGStockService {
	Optional<GStockProduct> getOne(long productId);
	List<GStockProduct> getAll();
	void add(GStockProduct GStock);
	void delete(long idBicycle);
	void update(GStockProduct bicycle, long productId);
}
