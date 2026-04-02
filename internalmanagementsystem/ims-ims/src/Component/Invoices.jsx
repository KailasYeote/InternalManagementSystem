import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../api/api";
import "./Invoices.css";

const Invoice = () => {
    const location = useLocation();
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        const loadInvoices = async () => {
            try {
                // Always fetch the freshest invoices from backend
                const res = await apiClient.get("/api/invoice");
                setInvoices(res.data);
                localStorage.setItem("invoices", JSON.stringify(res.data));
            } catch (err) {
                console.error("Failed to load invoices", err);
                
                // Fallback logic
                if (location.state?.invoices) {
                    setInvoices(location.state.invoices);
                } else {
                    const stored = JSON.parse(localStorage.getItem("invoices") || "[]");
                    setInvoices(stored);
                }
            }
        };

        loadInvoices();
    }, [location.state]);

    return (
        <div className="invoice-container">
            <h2>📄 Invoices</h2>

            {invoices.length === 0 ? (
                <p>No invoices found</p>
            ) : (
                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Invoice No</th>
                            <th>Customer</th>
                            <th>Amount (₹)</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {invoices.map((inv) => (
                            <tr key={inv.invoice_id || inv.id}>
                                <td>{inv.invoice_id || inv.id}</td>
                                <td>INV-{inv.invoice_id || inv.id}</td>
                                <td>{inv.client ? inv.client.name : inv.customerName}</td>
                                <td>₹{inv.amount || inv.totalAmount}</td>
                                <td>
                                    <span
                                        className={
                                            inv.status === "PAID"
                                                ? "status-paid"
                                                : inv.status === "CREATED"
                                                ? "status-created"
                                                : "status-unpaid"
                                        }
                                    >
                                        {inv.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Invoice;