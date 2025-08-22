import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { formatTime } from "../utils/DateFormatter";
import { formatDuration } from "../utils/FormatDuration";

export default function History() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/sessions`
        );
        setSessions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setSessions([]);
        toast.error("Failed to fetch history data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="p-4 sm:p-6 w-full max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
        History
      </h1>

      <div className="overflow-hidden rounded-2xl shadow-lg bg-white/20 backdrop-blur-lg border border-white/30">
        {loading ? (
          <p className="text-center text-white/80 p-6">Loading...</p>
        ) : sessions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-gray text-sm sm:text-base">
              <thead className="bg-white/10 text-xs sm:text-sm">
                <tr>
                  <th className="px-3 sm:px-6 py-3 font-semibold">Date</th>
                  <th className="px-3 sm:px-6 py-3 font-semibold">Start Time</th>
                  <th className="px-3 sm:px-6 py-3 font-semibold">End Time</th>
                  <th className="px-3 sm:px-6 py-3 font-semibold">Duration</th>
                  <th className="px-3 sm:px-6 py-3 font-semibold">
                    Milk Collected (L)
                  </th>
                </tr>
              </thead>
              <tbody>
                {sessions.map((s, i) => {
                  const start = new Date(s.start_time);
                  const end = new Date(s.end_time);

                  return (
                    <tr
                      key={i}
                      className="hover:bg-white/10 transition duration-200 text-xs sm:text-sm"
                    >
                      <td className="px-3 sm:px-6 py-3 border-t border-white/20">
                        {start.toLocaleDateString()}
                      </td>

                      <td className="px-3 sm:px-6 py-3 border-t border-white/20">
                        {formatTime(start)}
                      </td>

                      <td className="px-3 sm:px-6 py-3 border-t border-white/20">
                        {formatTime(end)}
                      </td>

                      <td className="px-3 sm:px-6 py-3 border-t border-white/20">
                        {formatDuration(s.duration)}
                      </td>

                      <td className="px-3 sm:px-6 py-3 border-t border-white/20">
                        {s.milk_quantity} L
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No Data"
              className="w-16 sm:w-20 mb-4 opacity-80"
            />
            <p className="text-gray/80 text-base sm:text-lg font-medium">
              No history data available
            </p>
            <p className="text-gray/60 text-sm mt-1">
              Your milk sessions will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
