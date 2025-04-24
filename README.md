#Corn Frontend

This project is the frontend user interface for the  corn purchasing application. It allows users to view corn details, submit purchase orders, and view their purchase history.

## Features

- Displays details about the corns available for purchase.
- Provides a form for users to submit purchase orders.
- Displays a table of the user's past purchase history.
- User-friendly interface built with React and shadcn/ui components.
- Routing handled by React Router DOM.
- Toast notifications for user feedback (e.g., copying order ID).

## Technologies Used

- **Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui, lucide-react (icons)
- **Routing:** React Router DOM
- **Notifications:** Sonner (toast)
- **State Management/Forms:** Likely React Context or Zustand (implied by typical React patterns), React Hook Form (used for purchase form)
- **Package Manager:** pnpm
- **Containerization:** Docker, Docker Compose

## Project Structure

```
Corn-Store-Frontend/
├── public/
│   └── ... # Static assets
├── src/
│   ├── assets/             # Images and other static assets used in components
│   │   ├── history/        # Components related to purchase history (e.g., PurchaseHistoryTable)
│   │   ├── purchase/       # Components related to the purchase form/details (e.g., PurchaseForm, cornDetailsCard)
│   │   └── ui/             # shadcn/ui components (auto-generated/managed)
│   ├── hooks/              # Custom React hooks (potential location)
│   ├── lib/                # Utility functions (e.g., shadcn utils)
│   ├── pages/              # Page components mapping to routes (e.g., PurchasePage, PurchaseHistoryPage)
│   ├── routes/             # Routing configuration (routes.tsx)
│   ├── services/           # API interaction logic (e.g., calling the backend)
│   │   └── interfaces/     # TypeScript interfaces for API data
│   └── main.tsx            # Application entry point
├── .env                    # Environment variables (ignored by Git, potentially used by Vite)
├── .gitignore
├── .dockerignore
├── Dockerfile              # Docker build instructions for the frontend service (dev setup)
├── docker-compose.yml      # Docker Compose configuration for the frontend service
├── package.json            # Project metadata and dependencies
├── pnpm-lock.yaml          # Exact dependency versions
├── tsconfig.json           # TypeScript compiler options
├── vite.config.ts        # Vite configuration (including server settings)
├── components.json         # shadcn/ui configuration
├── eslint.config.js        # ESLint configuration
└── README.md               # This file
```

## Design Patterns & Approaches

- **Component-Based Architecture:** Standard React pattern, breaking the UI into reusable components.
- **Utility-First CSS:** Using Tailwind CSS for styling directly in the markup.
- **Declarative Routing:** Using React Router DOM to manage application navigation.
- **(Potential) Presentational and Container Components:** Logic might be separated between components that handle data/state and components that just display UI.

## Getting Started / Running with Docker

The recommended way to run this project for development is using Docker Compose.

### Prerequisites

- Docker Desktop (or Docker Engine + Docker Compose) installed.
- The backend service running (either locally or via its own Docker Compose setup), as the frontend likely needs to communicate with it.

### Running the Application

1.  **Clone the repository:**

    ```bash
    git clone <your-repo-url>
    cd Corn-Store-Frontend
    ```

2.  **Environment Variables:** Check if a `.env` file is needed for Vite environment variables (e.g., `VITE_API_BASE_URL`). If so, create one based on `.env.example` or required configuration. (Note: Currently, API URL might be hardcoded or passed differently).

3.  **Build and Run Container:** Open a terminal in the project's root directory (`Corn-Store-Frontend/`) and run:

    ```bash
    docker compose up --build -d
    ```

    - `--build`: Forces Docker to rebuild the frontend image if the `Dockerfile` or related source code has changed.
    - `-d`: Runs the container in detached mode.

    This command will:

    - Build the `frontend` Docker image based on the `Dockerfile`.
    - Start the container.
    - Execute `pnpm run dev` inside the container (as defined in the `Dockerfile`'s `CMD`), respecting the `vite.config.ts` settings for host and port.

4.  **Accessing the Application:** The frontend service should now be running and accessible based on the port defined in `vite.config.ts` and mapped in `docker-compose.yml`. Based on our last setup, this should be `http://localhost:8080` (or `http://localhost:5173` if you reverted the port changes).

### Stopping the Application

To stop the running frontend container, run:

```bash
docker compose down
```
