
# 🧭 Azure Database Manager UI

A web-based platform to manage Azure SQL Databases with enterprise-grade automation. This UI connects to a suite of Azure Function APIs that handle full backups, environment provisioning, safe deletion, and restoration of SQL databases using `.bak` files.

## 🌟 Features

- 🔐 Secure login via Azure Active Directory
- 📦 One-click **Database Backup** to Azure Blob Storage
- 🏗 Automated **New Environment** provisioning from product templates
- ❌ **Safe Environment Removal** with 7-day backup retention
- ♻️ **Restore Databases** from `.bak` or `.bacpac` files stored in Blob
- 🧾 Centralized **Event Log** with real-time status tracking

## 💻 Tech Stack

This project is built with:

- ⚡ [Vite](https://vitejs.dev/)
- ⚛️ [React](https://reactjs.org/)
- ✨ [TypeScript](https://www.typescriptlang.org/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)
- 🧩 [shadcn/ui](https://ui.shadcn.dev/) (UI components)

## 🚀 Getting Started

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://GlobalAzureCOE@dev.azure.com/GlobalAzureCOE/MSFT-PDOC-Q2/_git/MSFT-PDOC-Q2
   cd MSFT-PDOC-Q2
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

The app will launch at `http://localhost:8081` by default.

## 🛠 Environment Configuration

Create a `.env` file with your API endpoint and AAD config:

```env
VITE_API_BASE_URL=https://<your-function-app>.azurewebsites.net/api
VITE_AAD_CLIENT_ID=<your-client-id>
VITE_AAD_TENANT_ID=<your-tenant-id>
```

## 🔄 CI/CD

This project is integrated with **GitLab CI/CD** for automatic testing and deployment. Frontend changes pushed to `main` trigger deployment to Azure Static Web Apps or Blob-hosted frontend.

## 🔒 Authentication

- Integrated with Azure AD via OAuth2 (PKCE flow)
- Access to APIs is scoped by AAD roles

## 📷 UI Overview

![Dashboard](docs/images/dashboard-screenshot.png)

## 📁 Project Structure

```
src/
├── components/
├── pages/
├── services/
├── types/
├── utils/
└── App.tsx
```

## ✅ To-Do / Improvements

- [ ] Responsive mobile layout
- [ ] Unit tests with React Testing Library
- [ ] Full dark mode support

## 📄 License

MIT
