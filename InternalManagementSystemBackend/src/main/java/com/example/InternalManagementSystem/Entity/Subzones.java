package com.example.InternalManagementSystem.Entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "subzones")
public class Subzones {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int subzone_Id;

    private String name;
    private String location;

    @OneToMany(mappedBy = "subzones", cascade = CascadeType.ALL)
    private List<Estimates> estimates = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id",nullable = false)
    @JsonIgnore
    private Clients client;

    public Clients getClient() {
        return client;
    }

    public void setClient(Clients client) {
        this.client = client;
    }

    public int getSubzone_Id() {
        return subzone_Id;
    }

    public void setSubzone_Id(int subzone_Id) {
        this.subzone_Id = subzone_Id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public String toString() {
        return "Subzones{" +
                "subzone_Id=" + subzone_Id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", client=" + client +
                '}';
    }
}
