package com.brogramer.peacefulPaths.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "weekdays")
public class Weekdays {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "day")
    private String day;

    public Weekdays() {}

    public Weekdays(Long id) {
        this.id = id;
    }

    public Weekdays(Long id, String day) {
        this.id = id;
        this.day = day;
    }
}
