//package com.example.InternalManagementSystem.Entity;
//
//import jakarta.persistence.*;
//
//import java.util.Date;
//
//@Entity
//@Table(name = "payments")
//public class Payments {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int payment_id;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "invoice_id",nullable = false)
//    private Invoices invoices;
//
//    private int amount;
//    private Date payment_date;
//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private PaymentMethod paymentMethod;
//
//    public int getPayment_id() {
//        return payment_id;
//    }
//
//    public void setPayment_id(int payment_id) {
//        this.payment_id = payment_id;
//    }
//
//    public Invoices getInvoices() {
//        return invoices;
//    }
//
//    public void setInvoices(Invoices invoices) {
//        this.invoices = invoices;
//    }
//
//    public int getAmount() {
//        return amount;
//    }
//
//    public void setAmount(int amount) {
//        this.amount = amount;
//    }
//
//    public Date getPayment_date() {
//        return payment_date;
//    }
//
//    public void setPayment_date(Date payment_date) {
//        this.payment_date = payment_date;
//    }
//
//    public PaymentMethod getPaymentMethod() {
//        return paymentMethod;
//    }
//
//    public void setPaymentMethod(PaymentMethod paymentMethod) {
//        this.paymentMethod = paymentMethod;
//    }
//
//    @Override
//    public String toString() {
//        return "Payments{" +
//                "payment_id=" + payment_id +
//                ", invoices=" + invoices +
//                ", amount=" + amount +
//                ", payment_date=" + payment_date +
//                ", paymentMethod=" + paymentMethod +
//                '}';
//    }
//}
