package com.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.Date;

@Entity
@Table(name = "Users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String emri;
    private String mbiemri;
    private String email;
    private String password;
    private String roli;

    @Temporal(TemporalType.TIMESTAMP)
    private Date data_regjistrimit;


    public Users(String emri, String mbiemri, String email, String password, String roli) {
        this.emri = emri;
        this.mbiemri = mbiemri;
        this.email = email;
        this.password = password;
        this.roli = roli;
        this.data_regjistrimit = new Date();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmri() {
        return emri;
    }

    public void setEmri(String emri) {
        this.emri = emri;
    }

    public String getMbiemri() {
        return mbiemri;
    }

    public void setMbiemri(String mbiemri) {
        this.mbiemri = mbiemri;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRoli() {
        return roli;
    }

    public void setRoli(String roli) {
        this.roli = roli;
    }

    public Date getData_regjistrimit() {
        return data_regjistrimit;
    }

    public void setData_regjistrimit(Date data_regjistrimit) {
        this.data_regjistrimit = data_regjistrimit;
    }
}