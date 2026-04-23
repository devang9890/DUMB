# 🧠 AI Dumb ↔ Smart Translator

<div align="center">

![AI-Powered Translation](https://img.shields.io/badge/AI-Powered-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

**Transform any text into different communication styles instantly**

Perfect for making your dumb thoughts sound smart, or your smart thoughts sound funny.

[Demo](#-demo) • [Features](#-features) • [Getting Started](#-getting-started) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📸 Demo

<div align="center">

### Welcome Screen
![Welcome Screen](./screenshots/welcome.png.png)

### Translation Interface
![Translation Interface](./screenshots/translator.png.png)

</div>

## ✨ Features

- 🔄 **Bidirectional Translation** - Seamlessly convert between simple and sophisticated language
- 🎭 **Multiple Communication Styles**
  - 👶 5 Year Old Level - Simple and fun explanations
  - 🎓 College Level - Academic and structured language
  - 💼 CEO Level - Professional and executive communication
  - 😎 GenZ Slang - Modern internet speak
  - 🎭 Shakespeare Mode - Elizabethan English poetry
- 📚 **Translation History** - Save and review all your past translations
- 📱 **Responsive Design** - Works beautifully on desktop, tablet, and mobile
- ⚡ **Real-time Processing** - Fast AI-powered translations using Google Gemini
- 🎨 **Modern UI** - Clean, dark-themed interface with smooth animations
- 🔔 **Toast Notifications** - User-friendly feedback for all actions

## 🛠️ Tech Stack

### Frontend
| Technology | Description |
|-----------|-------------|
| ⚛️ React | UI framework for building interactive interfaces |
| ⚡ Vite | Next-generation frontend build tool |
| 🎨 Tailwind CSS | Utility-first CSS framework |
| 🚦 React Router | Client-side routing |
| 📡 Axios | Promise-based HTTP client |
| 🎯 Lucide React | Beautiful icon library |
| 🍞 React Hot Toast | Elegant toast notifications |

### Backend
| Technology | Description |
|-----------|-------------|
| 🟢 Node.js | JavaScript runtime environment |
| 🚂 Express | Fast, minimalist web framework |
| 🍃 MongoDB | NoSQL database for data persistence |
| 📦 Mongoose | Elegant MongoDB object modeling |
| 🤖 Google Gemini API | Advanced AI language model |
| 🔐 dotenv | Environment variable management |
| 🌐 CORS | Cross-origin resource sharing |

### Deployment
| Platform | Purpose |
|----------|---------|
| 🚀 Render | Cloud hosting platform |

## 📁 Project Structure

```
ai-dumb-smart-translator/
│
├── client/                    # React frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                   # Node.js backend
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   └── server.js        # Entry point
│   └── package.json
│
├── render.yaml              # Render deployment config
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or later) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - [Local installation](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud)
- **Google Gemini API Key** - [Get your key](https://ai.google.dev/)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/ai-dumb-smart-translator.git
cd ai-dumb-smart-translator
```

2. **Setup Backend**

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/translator
# Or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/translator

GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173
```

3. **Setup Frontend**

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_BACKEND_URL=http://localhost:5000
```

### Running the Application

1. **Start MongoDB** (if running locally)

```bash
mongod
```

2. **Start the Backend Server**

```bash
cd server
npm run dev
```

The server will start on `http://localhost:5000`

3. **Start the Frontend Development Server**

```bash
cd client
npm run dev
```

The application will be accessible at `http://localhost:5173`

### Building for Production

**Frontend:**
```bash
cd client
npm run build
```

**Backend:**
```bash
cd server
npm start
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Get All Translations
```http
GET /translations
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "inputText": "hello there",
      "outputText": "Greetings, esteemed colleague!",
      "mode": "dumb-to-smart",
      "style": "CEO level",
      "createdAt": "2024-01-31T10:30:00Z"
    }
  ]
}
```

#### Create Translation
```http
POST /translate
```

**Request Body:**
```json
{
  "text": "This is a simple sentence.",
  "mode": "dumb-to-smart",
  "style": "college level"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "inputText": "This is a simple sentence.",
    "outputText": "This constitutes a straightforward declarative statement.",
    "mode": "dumb-to-smart",
    "style": "college level"
  }
}
```

### Translation Modes

| Mode | Description |
|------|-------------|
| `dumb-to-smart` | Converts simple language to sophisticated |
| `smart-to-dumb` | Converts complex language to simple |

### Available Styles

- `5 year old level` - Child-friendly explanations
- `college level` - Academic and formal
- `CEO level` - Executive and professional
- `GenZ slang` - Modern internet language
- `Shakespeare mode` - Elizabethan English

## 🎯 Usage Examples

### Basic Translation

1. Navigate to the home page
2. Click "Enter" to access the translator
3. Select your desired communication style
4. Enter or paste your text
5. Click "Translate"
6. Copy the result or view it in the output area

### Viewing History

Click the "History" button (bottom-right pink button) to view all your past translations.

## 🌍 Environment Variables

### Server (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | Yes |
| `MONGO_URI` | MongoDB connection string | Yes |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `NODE_ENV` | Environment (development/production) | No |

### Client (.env)

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_BACKEND_URL` | Backend API URL | Yes |

## 🐛 Troubleshooting

### Common Issues

**Issue: MongoDB Connection Failed**
```
Solution: 
- Ensure MongoDB is running (local) or check your Atlas connection string
- Verify MONGO_URI in .env file is correct
- Check network connectivity
```

**Issue: Gemini API Rate Limit**
```
Solution:
- Wait a few moments before retrying
- Check your API quota in Google AI Studio
- Consider implementing request throttling
```

**Issue: CORS Error**
```
Solution:
- Ensure backend server is running
- Check VITE_BACKEND_URL matches your backend URL
- Verify CORS is properly configured in server
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** - For providing the powerful language model
- **MongoDB** - For the robust database solution
- **Render** - For seamless deployment
- **Tailwind CSS** - For the beautiful UI framework
- **Lucide** - For the amazing icon set

## 📬 Contact

Have questions or suggestions? Feel free to reach out!

- **GitHub Issues**: [Create an issue](https://github.com/yourusername/ai-dumb-smart-translator/issues)
- **Email**: your.email@example.com

## 🗺️ Roadmap

- [ ] Add more translation styles (Pirate, Robot, Poetry, etc.)
- [ ] Implement user authentication
- [ ] Add favorite translations feature
- [ ] Export translations to PDF/DOCX
- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Voice input support
- [ ] Batch translation
- [ ] API rate limiting
- [ ] Analytics dashboard

---

<div align="center">

**Made with ❤️ using Gemini AI + MERN Stack**

⭐ Star this repo if you found it helpful!

[Report Bug](https://github.com/yourusername/ai-dumb-smart-translator/issues) • [Request Feature](https://github.com/yourusername/ai-dumb-smart-translator/issues)

</div>
