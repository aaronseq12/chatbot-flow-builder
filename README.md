# Chatbot Flow Builder

A modern, lightweight, and intuitive visual editor for creating and managing chatbot conversation flows, built with **React** and **React Flow** (`@xyflow/react`).

### Live Demo

Check out the live application here: [https://chatbot-flow-builder-demo.vercel.app/](https://chatbot-flow-builder-eua4w3cph-aaronseq12s-projects.vercel.app/)

---

## Features

-   **Drag & Drop Interface**: Easily add new message nodes from the sidebar onto the canvas.
-   **Connectable Nodes**: Create conversation flows by connecting nodes. Each node can only have one outgoing connection.
-   **Node Inspector**: Click on a node to open a settings panel and edit its content.
-   **State Validation**: A simple validation check ensures that all nodes in the flow are connected before saving.
-   **Save Functionality**: Persist your flow configuration to the console (can be extended to an API).
-   **Modern Tech Stack**: Built with Vite for a blazing-fast development experience.

---

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   Node.js (v18.x or higher recommended)
-   npm or yarn

### 🛠️ Installation & Local Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/chatbot-flow-builder.git](https://github.com/your-username/chatbot-flow-builder.git)
    cd chatbot-flow-builder
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Bundles the application for production.
-   `npm run lint`: Lints the codebase for potential errors.
-   `npm run preview`: Serves the production build locally.

---

## 🌐 Deployment

This application is ready to be deployed on any static site hosting service.

### Deploying with Vercel

1.  Push your code to a GitHub repository.
2.  Go to the [Vercel dashboard](https://vercel.com/new) and import your repository.
3.  Vercel will automatically detect that it's a Vite project and configure the build settings.
4.  Click **Deploy**, and your chatbot flow builder will be live!
