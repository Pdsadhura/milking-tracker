import { useState } from "react";
import Stopwatch from "../components/Stopwatch";
import { Howl } from "howler";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import MusicVisualizer from "../components/MusicVisualizer";

const music = new Howl({
  src: ["/music/soothing.mp3"],
  loop: true,
  volume: 0.5,
});

export default function Session() {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showQtyInput, setShowQtyInput] = useState(false);
  const [qty, setQty] = useState("");
  const navigate = useNavigate();

  const handleStart = () => {
    setIsRunning(true);
    setStartTime(new Date().toISOString());
    music.play();
  };

  const handlePause = () => {
    setIsRunning(false);
    music.pause();
  };

  const handleResume = () => {
    setIsRunning(true);
    music.play();
  };

  const handleStop = () => {
    setIsRunning(false);
    music.stop();
    setShowQtyInput(true); 
  };

  const handleSaveQty = async () => {
    if (!qty || !startTime) return;

    const endTime = new Date().toISOString();
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/sessions`,
        {
          start_time: startTime,
          end_time: endTime,
          duration: Math.floor(
            (new Date(endTime) - new Date(startTime)) / 1000
          ),
          milk_quantity: parseFloat(qty),
        }
      );

      if (res.status === 201) {
        toast.success("Session saved successfully!");
        navigate("/history");
      } else {
        toast.error("Unexpected response from server");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error.response.data?.error || "Validation failed ");
        } else {
          toast.error("Something went wrong ");
        }
      } else {
        toast.error("Network error ");
      }
      console.error(error);
    } finally {
      setLoading(false);
      setShowQtyInput(false);
      setQty("");
    }
  };

  return (
    <>
      <div
        className="absolute inset-0 bg-[url('/images/milk-bg.jpg')] bg-cover bg-center opacity-40 blur-sm"
        aria-hidden="true"
      ></div>

      <div className="relative z-10 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-[350px] flex flex-col items-center gap-6">
        <Stopwatch isRunning={isRunning} />
        {isRunning ? (
          <>
            {" "}
            <div className="w-full flex items-center justify-between bg-black/50 rounded-xl px-4 py-3 text-white">
              <MusicVisualizer isPlaying={isRunning} />
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="flex gap-4">
          {!isRunning && !startTime && (
            <button
              onClick={handleStart}
              className="px-5 py-2 bg-green-500/80 hover:bg-green-600 text-white rounded-lg shadow-lg"
            >
              Start
            </button>
          )}
          {isRunning && (
            <button
              onClick={handlePause}
              className="px-5 py-2 bg-yellow-500/80 hover:bg-yellow-600 text-white rounded-lg shadow-lg"
            >
              Pause
            </button>
          )}
          {!isRunning && startTime && (
            <button
              onClick={handleResume}
              className="px-5 py-2 bg-blue-500/80 hover:bg-blue-600 text-white rounded-lg shadow-lg"
            >
              Resume
            </button>
          )}
          <button
            onClick={handleStop}
            className="px-5 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg shadow-lg"
          >
            Stop
          </button>
        </div>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden w-full ${
            showQtyInput ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/20 backdrop-blur-lg p-4 rounded-xl flex flex-col gap-3">
            <label className="text-gray text-sm">
              Enter Milk Quantity (liters)
            </label>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className=" number-to-text w-full px-3 py-2 rounded-lg outline-none text-black"
              placeholder="e.g. 5"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSaveQty}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setShowQtyInput(false)}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
}
