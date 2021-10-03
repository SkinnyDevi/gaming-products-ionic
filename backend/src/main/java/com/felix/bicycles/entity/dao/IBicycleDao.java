package com.felix.bicycles.entity.dao;

import org.springframework.data.repository.CrudRepository;
import com.felix.bicycles.entity.models.Bicycle;

public interface IBicycleDao extends CrudRepository<Bicycle, Long>{

}
