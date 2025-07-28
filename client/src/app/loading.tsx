'use client';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#f3f2ec] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Designer sponge with bouncing corner effect */}
        <div className="w-16 h-16 bg-[#7f6df2] animate-sponge-corner shadow-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-md"></div>
        </div>
        <p className="text-[#2a2927] text-sm font-medium tracking-wide">
          Baking something sweet...
        </p>
      </div>

      <style jsx global>{`
        @keyframes sponge-corner {
          0%, 100% {
            transform: translateY(0) scale(1) rotate(0deg);
            border-radius: 1rem;
          }
          25% {
            transform: translateY(-14px) scale(1.05, 0.95) rotate(2deg);
            border-radius: 0.8rem 1.2rem 1.2rem 0.8rem;
          }
          50% {
            transform: translateY(4px) scale(0.95, 1.05) rotate(-2deg);
            border-radius: 1.2rem 0.8rem 0.8rem 1.2rem;
          }
          75% {
            transform: translateY(-10px) scale(1.04, 0.96) rotate(1deg);
            border-radius: 0.9rem 1.1rem 1.1rem 0.9rem;
          }
        }

        .animate-sponge-corner {
          animation: sponge-corner 1.4s ease-in-out infinite;
          transition: all 0.3s;
          border-radius: 1rem;
        }
      `}</style>
    </div>
  );
}
