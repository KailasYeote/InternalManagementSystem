import React, { useState } from 'react'
import apiClient from '../api/api'
import "./Group.css";
import { useNavigate } from "react-router-dom";

const Group = () => {

    const [group, setGroup] = useState("")
    const [description, setDescription] = useState("")
    const [groups, setGroups] = useState([])
    const [showList, setShowList] = useState(false)
    const [editId, setEditId] = useState(null)

    const navigate = useNavigate();

    const fetchGroups = async () => {
        try {
            const response = await apiClient.get('/group')
            setGroups(response.data)
            setShowList(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {

        if (!group || !description) {
            alert("Please fill all fields")
            return;
        }

        const data = {
            Name: group,
            description: description
        }

        try {
            if (editId) {
                await apiClient.put(`/group/${editId}`, data)
                alert("Group Updated Successfully")
                setEditId(null)
                fetchGroups()
            } else {
                const response = await apiClient.post('/group', data)
                alert("Group Created Successfully")

                const createdGroupId = response.data.groupId

                localStorage.setItem("groupCreated", "true")
                localStorage.setItem("groupName", group)

                navigate('/client', { state: { groupId: createdGroupId } })
            }

            setGroup("")
            setDescription("")

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='group-container'>
            {!showList && (
                <div className="group-form-card">
                    <h2 className="group-form-title">Create New Group</h2>
                    
                    <div className="input-group">
                        <label>Group Name</label>
                        <input
                            placeholder="e.g. Sales Team"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Description</label>
                        <input
                            placeholder="Enter group details"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <button className="btn-submit" onClick={handleSubmit}>
                        {editId ? "Update Group" : "Create Group"}
                    </button>
                    
                    <button className="btn-secondary" onClick={fetchGroups} style={{marginTop: '10px'}}>
                        View All Groups
                    </button>
                </div>
            )}

            {showList && (
                <div style={{width: '100%', margin: '0 auto'}}>
                    <div className="groups-header">
                        <button className="btn-back" onClick={() => setShowList(false)}>🔙 Back</button>
                    </div>
                    
                    <div className="groups-grid">
                        {groups.map((g) => (
                            <div className="group-card" key={g.groupId}>
                                <div className="group-card-content">
                                    <h3>{g.Name}</h3>
                                    <p>{g.description || "No description provided."}</p>
                                </div>
                                <div className="group-actions">
                                    <button className="btn-edit" onClick={() => handleEdit(g)}>Edit</button>
                                    <button className="btn-delete" onClick={() => handleDelete(g.groupId)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Group