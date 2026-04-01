package com.example.InternalManagementSystem.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.List;


@Entity
@Table(name = "clients")
public class Clients {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "client_id")
    private int clientId;

    private String name;
    private String organizationDetails;

    @ManyToOne
    @JoinColumn(name = "group_id")
    @JsonIgnore
    private Groups group;


    @OneToMany(mappedBy = "client",cascade = CascadeType.ALL)
    private List<Subzones> subzones;

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOrganizationDetails() {
        return organizationDetails;
    }

    public void setOrganizationDetails(String organizationDetails) {
        this.organizationDetails = organizationDetails;
    }

    public Groups getGroup() {
        return group;
    }

    public void setGroup(Groups group) {
        this.group = group;
    }

    public List<Subzones> getSubzones() {
        return subzones;
    }

    public void setSubzones(List<Subzones> subzones) {
        this.subzones = subzones;
    }

    @Override
    public String toString() {
        return "Clients{" +
                "clientId=" + clientId +
                ", name='" + name + '\'' +
                ", organizationDetails='" + organizationDetails + '\'' +
                ", group=" + group +
                ", subzones=" + subzones +
                '}';
    }
}
