package com.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.Date;

@Entity
@Table(name = "Raportet")
public class Raportet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer raportId;

    @Column(name = "raport_date", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date raportDate = new Date();

    @Column(name = "permbajtja", nullable = false)
    private String permbajtja;

    @Column(name = "sygjerimet_per_permiresim")
    private Integer sygjerimetPerPermiresim;

    @ManyToOne
    @JoinColumn(name = "klient_id", nullable = false)
    private Klienti klient;

    @ManyToOne
    @JoinColumn(name = "terapist_id", nullable = false)
    private Terapisti terapist;

    // Getters and Setters
    public Integer getRaportId() {
        return raportId;
    }

    public void setRaportId(Integer raportId) {
        this.raportId = raportId;
    }

    public Date getRaportDate() {
        return raportDate;
    }

    public void setRaportDate(Date raportDate) {
        this.raportDate = raportDate;
    }

    public String getPermbajtja() {
        return permbajtja;
    }

    public void setPermbajtja(String permbajtja) {
        this.permbajtja = permbajtja;
    }

    public Integer getSygjerimetPerPermiresim() {
        return sygjerimetPerPermiresim;
    }

    public void setSygjerimetPerPermiresim(Integer sygjerimetPerPermiresim) {
        this.sygjerimetPerPermiresim = sygjerimetPerPermiresim;
    }

    public Klienti getKlient() {
        return klient;
    }

    public void setKlient(Klienti klient) {
        this.klient = klient;
    }

    public Terapisti getTerapist() {
        return terapist;
    }

    public void setTerapist(Terapisti terapist) {
        this.terapist = terapist;
    }
}