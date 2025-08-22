import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-80 text-center text-white transition-transform duration-300 hover:scale-105 ">
        <h1 className="text-3xl font-bold mb-6">Milking Tracker</h1>

        <div className="flex flex-col gap-4">
          <Link
            to="/session"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Start Milking
          </Link>

          <Link
            to="/history"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View History
          </Link>
        </div>
      </div>
    </>
  );
}
