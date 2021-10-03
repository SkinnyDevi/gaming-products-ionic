package com.felix.bicycles.entity.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.felix.bicycles.entity.dao.IBicycleDao;
import com.felix.bicycles.entity.models.Bicycle;

@Service
public class BicycleServiceImpl implements IBicycleService {
	
	@Autowired
	IBicycleDao bicycleDao;

	@Override
	public List<Bicycle> getAll() {
		return (List<Bicycle>) bicycleDao.findAll();
	}

	@Override
	public void add(Bicycle bicycle) {
		bicycleDao.save(bicycle);
	}

	@Override
	public void delete(long idBicycle) {
		bicycleDao.deleteById(idBicycle);
	}

	@Override
	public void update(Bicycle bicycle, long idBicycle) {
		bicycleDao.findById(idBicycle).ifPresent((x) -> {
			bicycleDao.save(bicycle);
		});;
	}
	
	@Override
	public Optional<Bicycle> getOne(long idBicycle) {
		return bicycleDao.findById(idBicycle);
	}
}
