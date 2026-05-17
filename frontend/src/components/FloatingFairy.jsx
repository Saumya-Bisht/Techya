export default function FloatingFairy() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-900 to-pink-900">
      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Fairy Wrapper */}
      <div className="fairy-wrapper relative w-52 h-72 flex items-center justify-center">
        {/* Wings Glow */}
        <div className="absolute w-44 h-44 rounded-full bg-pink-400/20 blur-3xl" />

        {/* Fairy */}
        <div className="fairy relative flex flex-col items-center">
          🧚‍♀️
        </div>
      </div>

      <style>{`
        .fairy-wrapper {
          animation:
            landing 2.5s ease-out forwards,
            floaty 3s ease-in-out infinite 2.5s;
        }

        .fairy {
          animation: spinLanding 2.5s ease-out forwards;
          transform-origin: center center;
        }

        @keyframes landing {
          0% {
            transform: translateY(-400px) scale(0.6);
            opacity: 0;
          }
          60% {
            transform: translateY(30px) scale(1.05);
            opacity: 1;
          }
          80% {
            transform: translateY(-10px) scale(0.98);
          }
          100% {
            transform: translateY(0px) scale(1);
            opacity: 1;
          }
        }

        @keyframes spinLanding {
          0% {
            transform: rotate(0deg);
          }
          70% {
            transform: rotate(380deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes floaty {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-14px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes wingFlap {
          0% {
            transform: rotate(-25deg) scaleY(1);
          }
          50% {
            transform: rotate(-10deg) scaleY(0.9);
          }
          100% {
            transform: rotate(-25deg) scaleY(1);
          }
        }

        @keyframes wingFlapReverse {
          0% {
            transform: rotate(25deg) scaleY(1);
          }
          50% {
            transform: rotate(10deg) scaleY(0.9);
          }
          100% {
            transform: rotate(25deg) scaleY(1);
          }
        }

        .animate-wing {
          animation: wingFlap 0.8s ease-in-out infinite;
        }

        .animate-wing-reverse {
          animation: wingFlapReverse 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
