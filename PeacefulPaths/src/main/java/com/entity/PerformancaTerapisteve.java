package com.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "PerformancaTerapisteve")
public class PerformancaTerapisteve {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer terapistId;

    @Column(name = "totali_seancave", nullable = false)
    private Integer totaliSeancave = 0;

    @Column(name = "vleresimi_mesatar", nullable = false)
    private Double vleresimiMesatar = 0.00;

    @Column(name = "kohezgjatja_mesatare_seancave", nullable = false)
    private Double kohezgjatjaMesatareSeancave = 0.00;

    public Integer getTerapistId() {
        return terapistId;
    }

    public void setTerapistId(Integer terapistId) {
        this.terapistId = terapistId;
    }

    public Integer getTotaliSeancave() {
        return totaliSeancave;
    }

    public void setTotaliSeancave(Integer totaliSeancave) {
        this.totaliSeancave = totaliSeancave;
    }

    public Double getVleresimiMesatar() {
        return vleresimiMesatar;
    }

    public void setVleresimiMesatar(Double vleresimiMesatar) {
        this.vleresimiMesatar = vleresimiMesatar;
    }

    public Double getKohezgjatjaMesatareSeancave() {
        return kohezgjatjaMesatareSeancave;
    }

    public void setKohezgjatjaMesatareSeancave(Double kohezgjatjaMesatareSeancave) {
        this.kohezgjatjaMesatareSeancave = kohezgjatjaMesatareSeancave;
    }
}