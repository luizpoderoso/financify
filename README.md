# Financify: Personal Finance Dashboard 📊

**Financify** is a modern, intuitive web application designed to help users take control of their personal finances. Built with Next.js, this project allows users to upload their bank statements in CSV format, automatically categorizing transactions and providing a clear overview of their spending habits on a clean, responsive dashboard.

## 🚀 Key Features

* **🔐 Secure Authentication:** User registration and login system built with NextAuth.js.
* **📁 CSV Import:** Easily upload and parse bank statements using a robust file handling system.
* **🤖 Automatic Processing:** Transactions are automatically processed and stored securely.
* **📈 Interactive Dashboard:** A clear and concise dashboard to visualize financial data (future feature).
* **🎨 Light & Dark Mode:** A sleek, modern UI with full support for both light and dark themes.
* **📱 Fully Responsive:** Designed to work seamlessly on desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

This project was built to demonstrate proficiency in a modern, full-stack web development environment.

| Area          | Technology                                                                                                                                                                                                                                                                                                                      |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)                                                                                                                                                                                                                        |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcn-ui&logoColor=white)                                                                                           |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)                                                                                                                                                                                                              |
| **ORM** | ![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge)                                                                                                                                                                                                                                            |
| **Authentication** | ![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next-auth&logoColor=white)                                                                                                                                                                                                             |
| **Deployment** | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)                                                                                                                                                                                                                           |

---

## 🎯 Project Purpose & Goals

The primary goal of Financify was to build a full-stack application that solves a real-world problem while demonstrating key software development skills. This project served as a practical learning ground for:

* **Understanding a new framework:** Transitioning from SvelteKit to Next.js and applying its core concepts like the App Router and Server Components.
* **Implementing secure authentication:** Building a robust and secure user management system.
* **Handling file uploads and data processing:** Creating a backend capable of parsing and validating user-uploaded data.
* **Database management with a modern ORM:** Using Drizzle for type-safe database queries.
* **Building a design system with Shadcn/ui:** Creating a reusable and accessible component library.

---

## ⚙️ Getting Started

To run this project locally, follow these steps:

**1. Clone the repository:**
```bash
git clone [https://github.com/luizpoderoso/financify.git](https://github.com/luizpoderoso/financify.git)
cd financify
```

**2.  Install dependencies:**
    ```bash
    npm install
    ```

**3.  Set up environment variables:**
    Create a `.env` file in the root of the project and add the necessary environment variables (e.g., database URL, NextAuth secret).
    ```bash
    # .env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    NEXTAUTH_SECRET="YOUR_SECRET_HERE"
    ```

**4.  Run database migrations:**
    (Add instructions here once you set up Drizzle migrations)
    ```bash
    npm run db:push
    ```

**5.  Start the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running at [http://localhost:3000](http://localhost:3000).

---

## 📞 Contact

Luiz Poderoso – [lpoderoso@icloud.com](mailto:lpoderoso@icloud.com)

Project Link: [https://github.com/luizpoderoso/financify](https://github.com/luizpoderoso/financify)
