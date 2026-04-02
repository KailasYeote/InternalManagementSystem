import React, { useState } from "react";
import apiClient from "../api/api";
import { useNavigate } from "react-router-dom";
import "./Estimate.css";

const Estimate = () => {

    const navigate = useNavigate();

    const [subzoneId, setSubzoneId] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [items, setItems] = useState([""]);

    const [estimate, setEstimate] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    // 🔹 Handle item change
    const handleChange = (index, value) => {
        const updated = [...items];
        updated[index] = value;
        setItems(updated);
    };

    // 🔹 Add new item
    const handleAddMore = () => {
        setItems([...items, ""]);
    };

    // 🔹 Create Estimate
    const createEstimate = async () => {
        try {
            if (!subzoneId || !customerName || !totalAmount) {
                alert("All fields required");
                return;
            }

            const data = {
                customerName,
                totalAmount: Number(totalAmount),
                items: items.filter(i => i.trim() !== "").map(i => ({ item: i })) // <-- mapped to ItemDto format
            };

            const response = await apiClient.post(`/estimate/${subzoneId}`, data);

            setEstimate(response.data);
            setShowDetails(true);

            // Reset form
            setSubzoneId("");
            setCustomerName("");
            setTotalAmount("");
            setItems([""]);

        } catch (error) {
            console.error(error);
            if (error.response?.status === 404) {
                alert("Subzone not found!");
            } else {
                alert("Error creating estimate!");
            }
        }
    };

    // 🔹 View Invoices
    const viewInvoices = async () => {
        try {
            const response = await apiClient.get("/api/invoice");
            navigate("/invoice", { state: { invoices: response.data } });
        } catch (error) {
            console.error(error);
            alert("Error fetching invoices ❌");
        }
    };

    // 🔹 Convert to Invoice
    const convertToInvoice = async () => {
        try {
            const id = estimate?.estimateId || estimate?.id;

            await apiClient.post(`/api/invoice/convert/${id}`);
            alert("Invoice Created Successfully ✅");

            // redirect after success
            navigate("/invoice");

        } catch (error) {
            console.error(error);
            alert("Error converting to invoice ❌");
        }
    };

    return (
        <div className="estimate-container">

            {/* 🔥 View Invoice Button */}
            <button
                className="view-invoice-btn"
                onClick={viewInvoices}
            >
                📄 View Invoices
            </button>

            {/* 🔹 FORM */}
            {!showDetails && (
                <div className="form-box">

                    <h2>Create Estimate</h2>

                    <label>Subzone Id:</label>
                    <input
                        type="number"
                        value={subzoneId}
                        onChange={(e) => setSubzoneId(e.target.value)}
                    />

                    <label>Customer Name:</label>
                    <input
                        type="text"
                        placeholder="Enter customer name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                    />

                    <label>Items:</label>
                    {items.map((item, index) => (
                        <input
                            key={index}
                            type="text"
                            placeholder="Enter item name"
                            value={item}
                            onChange={(e) => handleChange(index, e.target.value)}
                        />
                    ))}

                    <button type="button" onClick={handleAddMore}>
                        + Add More Items
                    </button>

                    <label>Total Amount:</label>
                    <input
                        type="number"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(e.target.value)}
                    />

                    <button className="submit-btn" onClick={createEstimate}>
                        Create Estimate
                    </button>

                </div>
            )}

            {/* 🔹 RESULT */}
            {showDetails && estimate && (
                <div className="result-box">

                    <h2>Estimate Details</h2>

                    <p><strong>Estimate ID:</strong> {estimate.estimateId || estimate.id}</p>
                    <p><strong>Customer:</strong> {estimate.customerName}</p>
                    <p><strong>Group Name:</strong> {estimate.groupName}</p>
                    <p><strong>Client Name:</strong> {estimate.clientName}</p>
                    <p><strong>Subzone Name:</strong> {estimate.subzoneName}</p>
                    <p><strong>Location:</strong> {estimate.location}</p>
                    <p><strong>Total Amount:</strong> ₹{estimate.totalAmount}</p>

                    <div className="items-box">
                        <strong>Items:</strong>
                        {estimate.items && estimate.items.length > 0 ? (
                            <ul>
                                {estimate.items.map((it, index) => (
                                    <li key={index}>
                                        {typeof it === "string" ? it : it.item}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No items found</p>
                        )}
                    </div>

                    {/* 🔥 Convert Button */}
                    <button
                        className="invoice-btn"
                        onClick={convertToInvoice}
                    >
                        Convert to Invoice
                    </button>

                </div>
            )}

        </div>
    );
};

export default Estimate;