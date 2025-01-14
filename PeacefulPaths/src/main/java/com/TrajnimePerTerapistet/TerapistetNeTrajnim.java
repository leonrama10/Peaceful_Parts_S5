package com.TrajnimePerTerapistet;

import jakarta.persistence.*;

@Entity
public class TerapistetNeTrajnim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long terapistetId;
    private Long trajnimiId;

    private String statusi;


}
