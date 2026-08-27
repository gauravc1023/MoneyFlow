# MoneyFlow 💰

**MoneyFlow** is a full-stack personal finance management application that helps users track income, expenses, and transactions in one organized dashboard.

The application provides separate **User** and **Admin** experiences, financial analytics, transaction management, category management, and user management.

## 🌐 Live Demo

**Application:** https://moneyflow-1-bngs.onrender.com/

> The application is deployed on Render. If the service is sleeping, the first request may take a little longer to load.

\---

## ✨ Features

### 👤 User Features

* User registration and login
* Secure authentication
* Personal user profile
* User dashboard
* Add income and expense transactions
* Select transaction categories
* Add transaction descriptions and dates
* View total income, expenses, and balance
* Monthly financial summary
* Track monthly transaction count
* Identify the highest expense category
* Expense analytics by category
* Expense distribution chart
* Search transactions
* Filter transactions by type
* Sort transactions by date
* Edit and delete transactions

### 🛡️ Admin Features

* Admin dashboard
* View total users and transactions
* View overall income, expenses, and balance
* Income vs Expense analytics
* User management
* Search, edit, and delete users
* Manage user roles
* Category management
* Add, edit, and delete categories
* Transaction management
* Search and filter transactions
* View transaction details
* Delete transactions

\---

## 🖥️ Application Screens

### Landing Page

The landing page introduces MoneyFlow and provides navigation to the main sections of the application, including login and registration.

### 🔐 Login \& Registration

Users can create an account and log in to access their personal financial dashboard.

Registration supports **User** and **Admin** roles.

### 📊 User Dashboard

The user dashboard provides an overview of personal finances, including:

* Total Income
* Total Expense
* Balance
* Monthly Income
* Monthly Expense
* Monthly Balance
* Transactions This Month
* Highest Expense Category
* Expense analytics
* Expense distribution
* Recent transactions

### 👨‍💼 Admin Dashboard

The admin dashboard provides an overall view of the application and includes:

* Total users
* Total transactions
* Total income
* Total expenses
* Overall balance
* Financial analytics
* User management
* Category management
* Transaction management

\---

## 🏗️ Project Structure

The project is divided into a **Spring Boot backend** and a **React frontend**.

### Backend

```text
moneyflow/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com.project.moneyflow/
│   │   │       ├── config/
│   │   │       ├── controller/
│   │   │       ├── dto/
│   │   │       │   ├── request/
│   │   │       │   └── response/
│   │   │       ├── entity/
│   │   │       ├── exception/
│   │   │       ├── mapper/
│   │   │       ├── repository/
│   │   │       ├── security/
│   │   │       └── service/
│   │   └── resources/
│   └── test/
├── Dockerfile
├── mvnw
├── mvnw.cmd
└── pom.xml
```

### Frontend

```text
moneyflow\_frontend/
├── public/
├── src/
│   ├── assets/
│   ├── services/
│   ├── AdminDashboard.css
│   ├── AdminDashboard.jsx
│   ├── App.jsx
│   ├── Auth.css
│   ├── Auth.jsx
│   ├── DashboardBackground.css
│   ├── index.css
│   ├── LandingPage.css
│   ├── LandingPage.jsx
│   ├── main.jsx
│   ├── Navbar.css
│   ├── Navbar.jsx
│   ├── Profile.css
│   ├── Profile.jsx
│   ├── TransactionForm.css
│   ├── TransactionForm.jsx
│   ├── UserDashboard.css
│   └── UserDashboard.jsx
└── package.json
```

\---

## 🛠️ Technologies Used

### Backend

* Java 21
* Spring Boot
* Spring MVC / REST API
* Spring Data JPA
* Hibernate
* Spring Security
* Maven
* MySQL

### Frontend

* React.js
* JavaScript
* JSX
* HTML5
* CSS3
* REST API integration

### Deployment

* Render

\---

## 🔄 How It Works

```text
User
  │
  ▼
React Frontend
  │
  │ REST API
  ▼
Spring Boot Backend
  │
  ├── Controller
  ├── Service
  ├── Repository
  │
  ▼
MySQL Database
```

The React frontend communicates with the Spring Boot backend through REST APIs. The backend handles business logic, authentication/authorization, transaction processing, user management, and database operations.

\---

## 🚀 Running the Project Locally

### 1\. Clone the repository

```bash
git clone https://github.com/gauravc1023/MoneyFlow
cd MoneyFlow
```

### 2\. Backend Setup

Open the backend project in Eclipse, IntelliJ IDEA, or another Java IDE.

Make sure you have:

* Java 21
* Maven
* MySQL

Configure the database connection in the Spring Boot application configuration.

Example:

```properties
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/<database\_name>
spring.datasource.username=<your\_username>
spring.datasource.password=<your\_password>
```

Then start the Spring Boot application.

The backend will normally run on:

```text
http://localhost:8080
```

### 3\. Frontend Setup

Open the frontend folder:

```bash
cd moneyflow\_frontend
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will be available at the URL shown by Vite in the terminal.

\---

## 🔑 Authentication \& Authorization

MoneyFlow provides role-based access for:

* **USER**
* **ADMIN**

Users access their own financial information and transactions, while administrators have additional access to application-wide management features such as users, categories, and transactions.

> Never commit real database passwords, API secrets, JWT secrets, or other credentials to GitHub. Use environment variables or deployment secrets instead.

\---

## 📊 Dashboard Overview

### User Dashboard

|Information|Description|
|-|-|
|Total Income|Total income recorded by the user|
|Total Expense|Total expenses recorded by the user|
|Balance|Income minus expenses|
|Monthly Income|Income for the selected month|
|Monthly Expense|Expenses for the selected month|
|Monthly Balance|Monthly income minus monthly expenses|
|Transactions|Number of transactions for the selected month|
|Highest Expense Category|Category with the highest expense|

### Admin Dashboard

Administrators can monitor application-wide financial information and manage:

* Users
* Roles
* Categories
* Transactions

\---

## 🧪 Example Use Case

1. Register a new account.
2. Log in to MoneyFlow.
3. Add an income transaction such as salary.
4. Add expense transactions such as food, rent, or entertainment.
5. Open the dashboard to see the updated balance.
6. Review expense analytics and category distribution.
7. Search, filter, edit, or delete transactions when required.

\---

## 🔒 Security Notes

For production deployment:

* Store credentials in environment variables.
* Do not commit `.env` files containing secrets.
* Do not expose database passwords in source code.
* Use secure authentication and authorization configuration.
* Configure CORS appropriately for the deployed frontend and backend.
* Use HTTPS for production traffic.

\---

## 🎯 Future Enhancements

* Budget planning
* Monthly spending limits
* Savings goals
* Export transactions to CSV/PDF
* Email notifications
* Advanced financial reports
* Recurring transactions
* More detailed charts and analytics
* Password reset functionality
* Mobile-responsive improvements
* Automated testing and CI/CD

\---

## 👨‍💻 Author

**Gaurav Chaudhari**

MoneyFlow was developed as a full-stack application to demonstrate practical development using Java, Spring Boot, React, REST APIs, database integration, authentication, and role-based application features.

\---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

