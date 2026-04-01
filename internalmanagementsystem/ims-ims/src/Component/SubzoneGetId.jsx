import React, { useState } from "react";
import axios from "axios";
import "./SubzoneGetId.css"; // add this

const SubzoneGetId = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [subzoneId, setSubzoneId] = useState(null);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        try {
            setError("");
            setSubzoneId(null);
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/subzone/search`,
                { params: { name, location } }
            );
            setSubzoneId(response.data.subzone_Id);
        } catch (err) {
            setError("Subzone Not Found");
        }
    };

    return (
        <div className="form-container">
            <h2 className="form-title">Search Subzone</h2>

            <div className="form-group">
                <label className="form-label">Subzone Name:</label>
                <input
                    className="form-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Location:</label>
                <input
                    className="form-input"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>

            <button className="form-button" onClick={handleSearch}>
                Get Subzone ID
            </button>

            {subzoneId && (
                <h3 className="success-msg">Subzone ID: {subzoneId}</h3>
            )}

            {error && (
                <h3 className="error-msg">{error}</h3>
            )}
        </div>
    );
};

export default SubzoneGetId;