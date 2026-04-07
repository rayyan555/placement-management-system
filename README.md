# placement-management-system
A full-stack Placement Management System built with Spring Boot, React (Vite), and PostgreSQL. Features role-based access (Student, Placement Coordinator, Department Coordinator), JWT authentication, company drive management, eligibility filtering, analytics dashboard, and interview feedback system.

# 🎓 Placement Management System

A full-stack web application designed to automate and manage campus placement activities efficiently. The system supports multiple user roles and provides features like company drive management, student tracking, analytics, and interview feedback.

---

## 🚀 Tech Stack

* **Frontend:** React.js (Vite)
* **Backend:** Spring Boot (REST APIs)
* **Database:** PostgreSQL
* **Security:** Spring Security + JWT Authentication

---

## 🏗️ Architecture

React Frontend → Spring Boot Backend → PostgreSQL Database

---

## 👥 User Roles

* 👨‍🎓 Student
* 🧑‍💼 Placement Coordinator (Admin)
* 🧑‍🏫 Department Coordinator

---

## ✨ Key Features

### 👨‍🎓 Student Module

* Secure login with JWT authentication
* Profile management (academic details, resume upload)
* View and apply for company drives
* Automatic eligibility check
* Track application & selection status
* Submit interview feedback
* Dashboard with placement insights

---

### 🧑‍💼 Placement Coordinator (Admin)

* Manage departments and coordinators
* Create, update, and delete company drives
* Define eligibility criteria
* Filter eligible students using dynamic queries
* Manage shortlist and selection process
* Bulk upload students via CSV/Excel
* Generate reports (student, department, company-wise)
* Review and manage interview feedback
* Analytics dashboard (placement %, packages, stats)

---

### 🧑‍🏫 Department Coordinator

* Manage students within department
* Verify and update student profiles
* View eligible students
* Suggest shortlists
* View feedback and placement statistics

---

## 📊 Core Functionalities

* Role-based access control
* JWT-based authentication & authorization
* Dynamic eligibility filtering (JPA Specifications)
* Real-time application status updates
* Interview feedback system
* CSV/Excel data handling (OpenCSV, Apache POI)
* Analytics dashboard with insights

---

## 🗂️ Database Design

Key tables:

* Users
* Departments
* Student Profiles
* Company Drives
* Drive-Student Status
* Placement Details
* Interview Feedback

---

## 🔐 Security

* Spring Security integration
* JWT token-based authentication
* Protected APIs based on user roles

---

## 🔄 Workflow

1. Admin creates departments and coordinators
2. Students register and complete profiles
3. Admin creates company drives
4. System filters eligible students
5. Students apply for drives
6. Admin shortlists candidates
7. Students attend interviews
8. Feedback is submitted and reviewed
9. Final selection and placement status updated
10. Reports and analytics generated

---


## ⚙️ Setup Instructions

### 🔹 Backend (Spring Boot)

1. Navigate to backend folder
2. Configure PostgreSQL in `application.properties`
3. Run the application

---

### 🔹 Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

---

### 🔹 Database

* Create PostgreSQL database
* Import required schema

---

## 🌟 Highlights

* Real-world college placement workflow
* Multi-role system with access control
* Advanced filtering using JPA
* Secure authentication with JWT
* Data analytics and reporting

---
---

## 🖼️ Output Screenshots

### 🔐 Authentication & Login

![Login](images/Screenshot%202026-04-03%20175014.png)
![Signup](images/Screenshot%202026-04-03%20175015.png)

---

### 📊 Dashboard

![Dashboard](images/Screenshot%202026-04-03%20175027.png)
![Dashboard 2](images/Screenshot%202026-04-03%20175038.png)

---

### 👨‍🎓 Student Module

![Student Profile](images/Screenshot%202026-04-03%20175046.png)
![Student Dashboard](images/Screenshot%202026-04-03%20175056.png)

---

### 🧑‍💼 Admin Panel

![Admin Panel](images/Screenshot%202026-04-03%20175124.png)
![Admin Dashboard](images/Screenshot%202026-04-03%20175133.png)

---

### 📈 Analytics & Reports

![Analytics](images/Screenshot%202026-04-03%20175144.png)
![Reports](images/Screenshot%202026-04-03%20175157.png)

---

### 🏢 Company Drives & Management

![Drives](images/Screenshot%202026-04-03%20175206.png)
![Drive Details](images/Screenshot%202026-04-03%20175216.png)

---

### 🧾 Additional Screens

![Screen 1](images/Screenshot%202026-04-03%20175234.png)
![Screen 2](images/Screenshot%202026-04-03%20175243.png)
![Screen 3](images/Screenshot%202026-04-03%20175256.png)
![Screen 4](images/Screenshot%202026-04-03%20175334.png)
![Screen 5](images/Screenshot%202026-04-03%20175344.png)
![Screen 6](images/Screenshot%202026-04-03%20175353.png)
![Screen 7](images/Screenshot%202026-04-03%20175405.png)
![Screen 8](images/Screenshot%202026-04-03%20175422.png)
![Screen 9](images/Screenshot%202026-04-03%20175431.png)

---


## 👨‍💻 Author

**Rayyan A**

BE.CSE/ Honours And Specilization in AIML

KPR Institute of Engineering and Technology

Email : rayyanibnrahman903@gmail.com

---
