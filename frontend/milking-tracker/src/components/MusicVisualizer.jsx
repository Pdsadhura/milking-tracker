export default function MusicVisualizer({ isPlaying }) {
    return (
      <div className="flex items-end justify-center gap-1 h-10 w-[100%]">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`w-1 bg-green-400 rounded ${
              isPlaying ? "animate-wave" : ""
            }`}
            style={{
              animationDelay: `${i * 0.1}s`,
              height: `${Math.random() * 30 + 10}px`,
            }}
          />
        ))}
      </div>
    );
  }