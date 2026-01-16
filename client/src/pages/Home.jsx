import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../api";
import toast from "react-hot-toast";
import {
  Sparkles,
  Copy,
  RotateCcw,
  ArrowRight,
  Zap,
  Clock
} from "lucide-react";

const MODES = [
  { id: "5 year old level", emoji: "👶", color: "from-pink-500 to-purple-500" },
  { id: "college level", emoji: "🎓", color: "from-blue-500 to-cyan-500" },
  { id: "CEO level", emoji: "💼", color: "from-amber-500 to-orange-500" },
  { id: "GenZ slang", emoji: "😭", color: "from-green-500 to-emerald-500" },
  { id: "Shakespeare mode", emoji: "🎭", color: "from-violet-500 to-purple-500" }
];

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [mode, setMode] = useState("GenZ slang");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location?.state) {
      const { inputText, mode: stateMode, outputText } = location.state;
      if (inputText) setText(inputText);
      if (stateMode) setMode(stateMode);
      if (outputText) setOutput(outputText);
    }
  }, [location?.state]);

  const selectedMode = MODES.find((m) => m.id === mode);

  const handleTranslate = async () => {
    if (!text.trim()) return toast.error("Please enter some text");
    try {
      setLoading(true);
      setOutput("");
      const res = await API.post("/api/translate", { text, mode });
      setOutput(res.data.outputText || "");
      toast.success("Translated ✅");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Translation failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output.trim()) return toast.error("Nothing to copy");
    await navigator.clipboard.writeText(output);
    toast.success("Copied ✅");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden p-4 md:p-8">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Header Section */}
        <div className="mb-8 text-center w-full">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">AI-Powered Translation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">Dumb ↔ Smart</h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">Transform any text into different communication styles instantly</p>
        </div>

        <div className="w-full max-w-4xl space-y-6">
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-purple-500/10 transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold text-white">Select Style</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {MODES.map((m) => (
                  <button key={m.id} onClick={() => setMode(m.id)} className={`group relative overflow-hidden p-4 rounded-2xl border-2 transition-all duration-300 ${mode === m.id ? "border-white shadow-lg shadow-white/20 scale-105" : "border-white/10 hover:border-white/30 hover:scale-[1.02]"}`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${m.color} opacity-0 group-hover:opacity-20 transition-opacity ${mode === m.id ? "opacity-30" : ""}`} />
                    <div className="relative text-center">
                      <div className="text-3xl mb-2">{m.emoji}</div>
                      <div className="text-xs font-medium text-white/90">{m.id}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-purple-500/10 transition-shadow">
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400" />INPUT TEXT</label>
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste your text here..." className="w-full min-h-[160px] p-5 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-gray-500 outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none" />
              </div>

              <div className="flex gap-3 flex-wrap mb-6">
                <button onClick={handleTranslate} disabled={loading} className={`group relative flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-black overflow-hidden transition-all ${loading ? "bg-gray-600 cursor-not-allowed" : `bg-gradient-to-r ${selectedMode?.color} hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50`}`}>
                  <span className="relative z-10 flex items-center gap-2">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Translating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Translate
                      </>
                    )}
                  </span>
                </button>

                <button onClick={() => { setText(""); setOutput(""); }} className="flex items-center gap-2 px-6 py-4 rounded-2xl border-2 border-white/20 hover:border-white/40 hover:bg-white/5 transition-all font-semibold text-white">
                  <RotateCcw className="w-5 h-5" /> Reset
                </button>

                <button onClick={handleCopy} className="flex items-center gap-2 px-6 py-4 rounded-2xl border-2 border-white/20 hover:border-white/40 hover:bg-white/5 transition-all font-semibold text-white">
                  <Copy className="w-5 h-5" /> Copy
                </button>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400" />OUTPUT TEXT</label>

                <div className={`min-h-[160px] p-5 rounded-2xl bg-gradient-to-br from-purple-950/30 to-pink-950/30 border-2 ${output ? "border-purple-500/50" : "border-white/10"} relative overflow-hidden`}>
                  {output ? (
                    <div className="text-white whitespace-pre-wrap leading-relaxed">{output}</div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <ArrowRight className="w-8 h-8 mx-auto mb-2 opacity-30" />
                        <p>Your translated text will appear here...</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating History Button */}
      <button
        type="button"
        aria-label="Open history"
        onClick={() => navigate('/history')}
        className="fixed right-6 bottom-6 z-50 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-full shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all hover:scale-110 flex items-center gap-2 backdrop-blur-sm border border-white/10"
      >
        <Clock className="w-5 h-5" />
        <span className="hidden sm:inline font-semibold">History</span>
      </button>

      <style>{`
        .delay-700 { animation-delay: 700ms; }
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </div>
  );
}
