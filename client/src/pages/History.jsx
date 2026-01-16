import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";
import toast from "react-hot-toast";
import { Trash2, Clock, ArrowLeft } from "lucide-react";

const MODES = [
  { id: "5 year old level", emoji: "👶", color: "from-pink-500 to-purple-500" },
  { id: "college level", emoji: "🎓", color: "from-blue-500 to-cyan-500" },
  { id: "CEO level", emoji: "💼", color: "from-amber-500 to-orange-500" },
  { id: "GenZ slang", emoji: "😭", color: "from-green-500 to-emerald-500" },
  { id: "Shakespeare mode", emoji: "🎭", color: "from-violet-500 to-purple-500" }
];

export default function History() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await API.get('/api/translate/history');
      setHistory(res.data.history || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load history ❌');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  const deleteOne = async (id) => {
    try {
      await API.delete(`/api/translate/${id}`);
      toast.success('Deleted ✅');
      fetchHistory();
    } catch (err) {
      console.error(err);
      toast.error('Delete failed ❌');
    }
  };

  const clearAll = async () => {
    try {
      await API.delete('/api/translate/clear');
      toast.success('History cleared ✅');
      fetchHistory();
    } catch (err) {
      console.error(err);
      toast.error('Clear failed ❌');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden p-4 md:p-8">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-purple-500/10 transition-shadow">
          <div className="flex items-center justify-between mb-6">
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <h1 className="font-bold text-2xl bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Translation History</h1>
            </div>

            {/* Right Section - Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/home')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white hover:bg-white/5 hover:border-white/20 transition-all font-semibold"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button
                onClick={clearAll}
                className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 transition-all font-semibold"
              >
                Clear All
              </button>
            </div>
          </div>

          {/* History Content */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            </div>
          ) : history.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <Clock className="w-10 h-10 text-gray-600" />
              </div>
              <p className="text-gray-400 font-semibold">No history yet.</p>
              <p className="text-sm text-gray-500 mt-2">Start translating to build your history</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[70vh] overflow-auto pr-2 custom-scrollbar">
              {history.map((item) => {
                const itemMode = MODES.find((m) => m.id === item.mode);

                return (
                  <div key={item._id} className="group p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-white/30 transition-all hover:bg-black/60">
                    {/* Mode Tag and Delete Button */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r ${itemMode?.color || 'from-gray-500 to-gray-600'} text-white font-semibold flex items-center gap-1`}>
                        <span>{itemMode?.emoji}</span>
                        {item.mode}
                      </span>

                      <button
                        onClick={() => deleteOne(item._id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Input Text Preview */}
                    <p className="text-sm text-gray-300 line-clamp-3 mb-3">{item.inputText}</p>

                    {/* Load Button */}
                    <button
                      onClick={() => {
                        navigate('/home', {
                          state: {
                            inputText: item.inputText,
                            mode: item.mode,
                            outputText: item.outputText
                          }
                        });
                        toast.success('Loaded from history ✅');
                      }}
                      className="text-xs px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/50 hover:to-pink-500/50 text-white transition-all border border-purple-500/20 hover:border-purple-500/40 font-semibold"
                    >
                      Load & Edit
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}
