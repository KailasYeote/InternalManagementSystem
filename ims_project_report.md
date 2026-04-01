# Internal Management System (IMS) - Project Overview

## 1. Executive Summary
The **Internal Management System (IMS)** is a modern, full-stack enterprise web application designed to track and manage organizational data efficiently. The system empowers users to manage complex hierarchies—including Teams/Groups, Clients, and Subzones—while seamlessly generating cost Estimates and converting them into final Invoices. It features an integrated analytics dashboard and built-in attendance tracking.

---

## 2. Technology Stack
The application logic is cleanly separated into a Frontend Client and a Backend API Server:

- **Frontend:** React.js powered by Vite. Features dynamic client-side routing (`react-router-dom`), decoupled API connectivity (`axios`), and a fully responsive, custom-built CSS design system utilizing modern Glassmorphism aesthetics and `react-icons`.
- **Backend:** Java Spring Boot REST API. Integrates layered architecture logic (`Controllers`, `Services`, `Repositories`) using Spring Data JPA/Hibernate to interact with a centralized SQL database.

---

## 3. Core Features & Business Logic

### A. Authentication & Session Tracking
- **User Registration & Login:** Users can create an account (designating `USER` or `ADMIN` roles). The platform uses secure API endpoints to validate credentials.
- **Attendance Logic:** Every time a user successfully logs in, the system registers an active session and tracks a persistent local integer counter tied to their unique `username` (e.g., `attendance_john`). It displays this active attendance securely in the top navigation header and dashboard, ensuring historical session counts persist across system logouts.

### B. Hierarchical Data Flow
The core logic of the application revolves around associating cost metrics with precise physical or organizational entities:
1. **Groups:** The top-level organizational unit. Users can create, update, and manage Active Groups (e.g., "Sales Team" or "Field Op A").
2. **Clients:** Groups can have specific Clients assigned to them.
3. **Subzones:** Detailed geographical or departmental markers tied to Clients. Users use a specific form (`SubzoneForm`) to generate multiple subzones simultaneously, returning unique `Subzone IDs`.

### C. Estimation & Invoice Conversion Pipeline
The primary automated workflow for financial processing:
- **Estimate Creation:** Users input a specific `Subzone ID`, `Customer Name`, dynamic mapped `Items`, and a `Total Amount`. The system validates this relationship through the backend.
- **Live Estimate Review:** The system responds by consolidating the data—pulling the associated `Group Name`, `Client Name`, `Subzone Name`, and `Location`—presenting a full Estimate Card.
- **1-Click Invoice Conversion:** Once an Estimate is built, the user clicks "Convert to Invoice", triggering a backend automated process that finalizes the record and pushes the exact dataset to the ultimate **Invoices Database**, making it verifiable across the platform.

### D. UI/UX Architecture
The system integrates a robust, scalable layout wrapper (`Layout.jsx`):
- **Responsive Dashboard Sidebar:** Utilizes React Flexbox architecture to guarantee a consistent workspace area next to a persistent static navigation menu.
- **Status Dashboard:** The `Home` page features a real-time reactive timeclock, personalized greeting (`Good Morning`, etc.), and dynamic API-fetched statistics (Total Attendance, Total Invoices generated).

---

## 4. Backend Architecture Breakdown

The Spring Boot backend dictates strict domain-driven services:

| Component Level | Responsibility Example |
|---|---|
| **Controllers** | `InvoiceController`, `EstimateController` manage REST endpoints (`GET /api/invoice`, `POST /api/estimate`). |
| **Services** | Implement crucial business logic such as duplicate interception or automated Entity fetching (e.g., automatically binding a new Estimate to an existing Subzone). |
| **Repositories** | Data Access Layer enforcing entity schemas (`Subzones.java`, `Estimates.java`, `Clients.java`) to cleanly normalize table injections. |

---

> [!TIP]
> **How to export this document to PDF:** 
> Right-click anywhere on this document view in your browser and select **"Print"**, then change standard printer destination to **"Save as PDF"**!
