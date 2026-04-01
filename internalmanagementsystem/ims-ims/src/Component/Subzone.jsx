import React, { useState, useEffect } from "react"
import apiClient from "../api/api"
import { useLocation, useNavigate } from "react-router-dom"
import "./Subzone.css"

const Subzone = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const clientId = location.state?.clientId

    useEffect(() => {
        if (!clientId) {
            alert("Invalid Access")
            navigate("/client")
        }
    }, [clientId, navigate])

    const [subzones, setSubzones] = useState([
        { name: "", location: "" }
    ])

    const handleChange = (index, field, value) => {
        const updated = [...subzones]
        updated[index][field] = value
        setSubzones(updated)
    }

    const handleAddMore = () => {
        setSubzones([...subzones, { name: "", location: "" }])
    }

    const handleSubmit = async () => {

        try {

            let lastSavedSubzone = null

            for (let subzone of subzones) {

                if (!subzone.name.trim() || !subzone.location.trim()) {
                    alert("Fill all fields")
                    return
                }

                const response = await apiClient.post(`/subzone/${clientId}`, {
                    name: subzone.name,
                    location: subzone.location
                })

                lastSavedSubzone = response.data
            }

            alert("Subzone Added Successfully")

            navigate("/subzoneid", {
                state: { subzoneId: lastSavedSubzone.subzone_Id }
            })

        } catch (error) {
            console.log(error.response?.data || error.message)
            alert("Something went wrong")
        }
    }

    return (
        <div className="subzone-container">

            <h2>Subzone Form</h2>

            {subzones.map((subzone, index) => (
                <div key={index} className="form-group">

                    <input
                        type="text"
                        placeholder="Subzone Name"
                        value={subzone.name}
                        onChange={(e) =>
                            handleChange(index, "name", e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Location"
                        value={subzone.location}
                        onChange={(e) =>
                            handleChange(index, "location", e.target.value)
                        }
                    />

                </div>
            ))}

            <div className="action-buttons">
                <button className="btn-add" onClick={handleAddMore}>
                    + Add New Subzone
                </button>

                <button className="btn-submit" onClick={handleSubmit}>
                    Confirm & Save
                </button>
            </div>
        </div>
    )
}

export default Subzone