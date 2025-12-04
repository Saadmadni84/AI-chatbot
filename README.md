# AI Chatbot Project

A modern, full-stack AI Chatbot application featuring a Spring Boot backend and a React + Vite frontend. Designed with a beautiful glassmorphism UI, dark mode support, and integration with local LLMs via Ollama.

## 🚀 Features

- **Modern UI/UX**: Clean interface with glassmorphism effects, smooth animations, and responsive design.
- **Dark/Light Mode**: Built-in theme switching with preference persistence.
- **Local AI Integration**: Connects seamlessly to local LLMs using Ollama (default: `llama3.2`).
- **Real-time Chat**: Fast and responsive chat interface with typing indicators.
- **Markdown Rendering**: properly formats code blocks and markdown syntax in AI responses.
- **Session Management**: Maintains local chat history and context.

## 🛠️ Tech Stack

### Backend
- **Java 17+**
- **Spring Boot 3.x**
- **Maven**
- **Ollama** (for local LLM inference)

### Frontend
- **React 19**
- **Vite**
- **Tailwind CSS**
- **PostCSS**

## 📋 Prerequisites

Before running the project, ensure you have the following installed:

1.  **Java Development Kit (JDK) 17** or higher.
2.  **Node.js** (v18 or higher) and **npm**.
3.  **Ollama** installed and running locally.

## ⚙️ Setup & Installation

### 1. Configure Ollama (Local AI)

This project uses Ollama to run the AI model locally.

```bash
# 1. Install Ollama from https://ollama.com/

# 2. Pull the model configured in the backend (default is llama3.2)
ollama pull llama3.2

# 3. Ensure Ollama is running
ollama serve
```

### 2. Backend Setup

Navigate to the backend directory and start the Spring Boot server.

```bash
cd backend

# Run using Maven Wrapper (Mac/Linux)
./mvnw spring-boot:run

# Run using Maven Wrapper (Windows)
./mvnw.cmd spring-boot:run
```

The backend server will start on `http://localhost:8080`.

### 3. Frontend Setup

Open a new terminal window, navigate to the frontend directory, install dependencies, and start the development server.

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will be available at `http://localhost:5173`.

## 🔧 Configuration

### Changing the AI Model
To use a different Ollama model (e.g., `mistral`, `phi3`), update the configuration in `backend/src/main/resources/application.yml`:

```yaml
openai:
  api:
    url: http://localhost:11434/api/chat
  model: llama3.2  # <--- Change this to your installed model name
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
