# 📋 Project Management App

A modern project management application built with React, featuring authentication, protected routing, and a clean dashboard layout.

## 🚀 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 19 |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 4 |
| **State Management** | Redux Toolkit |
| **Routing** | React Router v7 |
| **Language** | JavaScript (ES Modules) |

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.jsx       # Authenticated layout (sidebar + topbar + outlet)
│   │   ├── GuestLayout.jsx     # Unauthenticated layout (minimal wrapper)
│   │   ├── Sidebar.jsx         # Navigation sidebar with NavLink active states
│   │   └── TopBar.jsx          # Top header bar with user info & logout
│   ├── ui/
│   │   └── Button.jsx          # Reusable button component
│   ├── ProtectedRoute.jsx      # Redirects to /login if not authenticated
│   └── GuestRoute.jsx          # Redirects to / if already authenticated
├── features/
│   └── auth/
│       └── authSlice.js        # Redux slice for auth (login/logout + localStorage)
├── pages/
│   ├── Dashboard.jsx           # Dashboard page
│   ├── Projects.jsx            # Projects page
│   ├── Tasks.jsx               # Tasks page
│   └── Login.jsx               # Login page with form
├── store/
│   └── index.js                # Redux store configuration
├── App.jsx                     # Router setup with route guards
├── main.jsx                    # Entry point with Redux Provider
└── index.css                   # Global styles + Tailwind import
```

## ✨ Features

### Authentication
- Login/Logout with Redux Toolkit state management
- Auth state persisted in `localStorage` (survives page refresh)
- Auto-redirect based on authentication status

### Route Guards
- **ProtectedRoute** — unauthenticated users are redirected to `/login`
- **GuestRoute** — authenticated users are redirected to `/` (dashboard)

### Layout System
- **AppLayout** — sidebar + topbar layout for authenticated pages (uses React Router `<Outlet />`)
- **GuestLayout** — minimal layout for public pages (login, register)

### Navigation
- Sidebar with `NavLink` for automatic active-state highlighting
- Client-side routing (no full page reloads)

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/adityarout8055/Project-management-app.git
cd Project-management-app

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Linting

```bash
npm run lint
```

## 🗺️ Routes

| Path | Auth Required | Description |
|---|---|---|
| `/` | ✅ | Dashboard |
| `/projects` | ✅ | Projects page |
| `/tasks` | ✅ | Tasks page |
| `/login` | ❌ | Login page (redirects to `/` if already logged in) |

## 📝 Roadmap

- [ ] Register page
- [ ] Real API integration for authentication
- [ ] Project CRUD operations
- [ ] Task management with drag & drop
- [ ] Team collaboration features
- [ ] RTK Query for API calls
- [ ] Dark mode support

## 📄 License

This project is private.
