package com.example.InternalManagementSystem.Entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "estimates")
public class Estimates {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int estimate_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subzone_id", nullable = false)
    @JsonIgnore
    private  Subzones subzones;

    private String customerName;

    @ElementCollection
    @CollectionTable(name = "estimate_items", joinColumns = @JoinColumn(name = "estimate_id"))
    @Column(name = "item_name")
    private List<String> item;
    private int totalAmount;

    @CreationTimestamp
    @Column(updatable = false)
    private Date date;

    public int getEstimate_id() {
        return estimate_id;
    }

    public void setEstimate_id(int estimate_id) {
        this.estimate_id = estimate_id;
    }

    public int getTotal_amount() {
        return totalAmount;
    }

    public void setTotal_amount(int total_amount) {
        totalAmount = total_amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Subzones getSubzones() {
        return subzones;
    }

    public void setSubzones(Subzones subzones) {
        this.subzones = subzones;
    }

    public List<String> getItem() {
        return item;
    }

    public void setItem(List<String> item) {
        this.item = item;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    @Override
    public String toString() {
        return "Estimates{" +
                "estimate_id=" + estimate_id +
                ", subzones=" + subzones +
                ", customerName='" + customerName + '\'' +
                ", item=" + item +
                ", Total_amount=" + totalAmount +
                ", date=" + date +
                '}';
    }
}
