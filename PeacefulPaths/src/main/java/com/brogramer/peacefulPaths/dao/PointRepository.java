package com.brogramer.peacefulPaths.dao;

import com.brogramer.peacefulPaths.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointRepository  extends JpaRepository<Point,Integer> {
}
