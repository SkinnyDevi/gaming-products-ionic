package com.felix.gstock.entity.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.felix.gstock.dao.IGStockDAO;
import com.felix.gstock.entity.models.GStockProduct;

@Service
public class GStockServiceImpl implements IGStockService {
	
	@Autowired
	IGStockDAO gstockDao;

	@Override
	public List<GStockProduct> getAll() {
		return (List<GStockProduct>) gstockDao.findAll();
	}
	
	@Override
	public Optional<GStockProduct> getOne(long productId) {
		return gstockDao.findById(productId);
	}

	@Override
	public void add(GStockProduct product) {
		gstockDao.save(product);
	}

	@Override
	public void delete(long productId) {
		gstockDao.deleteById(productId);
	}

	@Override
	public void update(GStockProduct product, long productId) {
		gstockDao.findById(productId).ifPresent((x) -> {
			gstockDao.save(product);
		});;
	}
}
