import React, { useState } from 'react'
import apiClient from '../api/api'
import { useLocation, useNavigate } from 'react-router-dom'
import './Client.css'

const Client = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const groupId = location.state?.groupId

    const [clients, setClients] = useState([
        { name: "", organizationDetails: "" }
    ])

    const handleChange = (index, field, value) => {
        const updated = [...clients]
        updated[index][field] = value
        setClients(updated)
    }

    const handleAddMore = () => {
        setClients([...clients, { name: "", organizationDetails: "" }])
    }

    const handleSubmit = async () => {

        if (!groupId) {
            alert("Group ID not found. Please create a group first.")
            navigate("/group")
            return
        }

        try {
            let lastSavedClient = null

            for (let client of clients) {

                if (!client.name || !client.organizationDetails) {
                    alert("Please fill all fields")
                    return
                }

                // Backend now returns the saved Clients object with clientId
                const response = await apiClient.post(`/client/${groupId}`, client)
                lastSavedClient = response.data
            }

            if (lastSavedClient && lastSavedClient.clientId) {
                navigate("/subzone", {
                    state: { clientId: lastSavedClient.clientId }
                })
            } else {
                alert("Failed to retrieve client ID after saving.")
            }

        } catch (error) {
            console.error("Error creating client:", error)
            alert("Something went wrong while creating the client.")
        }
    }

    return (
        <div className="client-container">
            <h2>Client Form</h2>

            {clients.map((client, index) => (
                <div key={index} className="form-group">
                    <input
                        type="text"
                        placeholder="Client Name"
                        value={client.name}
                        onChange={(e) => handleChange(index, "name", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Organization Details"
                        value={client.organizationDetails}
                        onChange={(e) => handleChange(index, "organizationDetails", e.target.value)}
                    />
                </div>
            ))}

            <button onClick={handleAddMore}>Add One More</button>
            <button onClick={handleSubmit}>Submit All</button>
        </div>
    )
}

export default Client