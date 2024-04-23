package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "language")
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "language")
    private String language;

    public Language() {}

    public Language(Long id) {
        this.id = id;
    }

    public Language(Long id, String language) {
        this.id = id;
        this.language = language;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
