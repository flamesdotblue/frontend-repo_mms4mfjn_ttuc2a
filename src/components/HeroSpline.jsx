import React from "react";
import Spline from "@splinetool/react-spline";

const HeroSpline = () => {
  return (
    <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <Spline
        scene="https://prod.spline.design/M4yE7MTeWshitQbr/scene.splinecode"
        style={{ width: "100%", height: "100%" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-900/70 via-zinc-900/20 to-transparent" />
      <div className="pointer-events-none absolute bottom-4 left-4 md:bottom-6 md:left-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
          SAKI — AI Browser Workspace
        </h1>
        <p className="text-zinc-300 text-sm md:text-base mt-1">
          Multi‑tab chats, memory, and model switching — Atlas/Comet inspired.
        </p>
      </div>
    </div>
  );
};

export default HeroSpline;
