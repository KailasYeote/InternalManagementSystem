import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

const SubzoneId = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const subzoneId = location.state?.subzoneId

    useEffect(() => {
        if (!subzoneId) {
            alert("Invalid Access")
            navigate("/subzone")
        }
    }, [subzoneId, navigate])

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Subzone Created Successfully 🎉</h2>
            <h3>Subzone ID is: {subzoneId}</h3>
        </div>
    )
}

export default SubzoneId