package com.felix.gstock.dao;

import org.springframework.data.repository.CrudRepository;

import com.felix.gstock.entity.models.GStockProduct;

public interface IGStockDAO extends CrudRepository<GStockProduct, Long>{

}
