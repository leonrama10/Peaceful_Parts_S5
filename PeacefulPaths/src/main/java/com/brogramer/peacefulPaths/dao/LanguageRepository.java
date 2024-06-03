package com.brogramer.peacefulPaths.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.brogramer.peacefulPaths.entity.Language;

public interface LanguageRepository extends JpaRepository<Language, Integer> {
}
