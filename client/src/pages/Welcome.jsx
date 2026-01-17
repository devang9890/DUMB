import { useNavigate } from "react-router-dom";
import { Sparkles, Zap } from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center text-center bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden px-4">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000 -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Center Content */}
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center justify-center">
        {/* Header Badge */}
        <div className="mb-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span className="text-sm font-medium text-purple-300">
            AI-Powered Translation
          </span>
        </div>

        {/* Title + Waving Emoji */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Welcome
          </h1>

          <span className="text-6xl md:text-8xl waving-emoji origin-bottom-right">
            👋
          </span>
        </div>

        {/* Subtitle */}
        <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          AI Dumb ↔ Smart Translator
        </h2>

        <p className="text-lg text-gray-400 mb-12 max-w-2xl leading-relaxed">
          Transform any text into different communication styles instantly.
          Perfect for making your dumb thoughts sound smart, or your smart
          thoughts sound funny.
        </p>

        {/* Enter Button */}
        <button
          onClick={() => navigate("/home")}
          className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 hover:scale-110 transition-all shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50"
        >
          <Zap className="w-5 h-5" />
          <span>Enter</span>
        </button>

        {/* Footer Text */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500">
            Made with <span className="text-pink-400">❤️</span> using Gemini + MERN
          </p>
        </div>
      </div>

      <style>{`
        .delay-700 { animation-delay: 700ms; }
        .delay-1000 { animation-delay: 1000ms; }

        .waving-emoji {
          animation: wave 1.6s infinite;
          display: inline-block;
        }

        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(16deg); }
          20% { transform: rotate(-10deg); }
          30% { transform: rotate(16deg); }
          40% { transform: rotate(-6deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
