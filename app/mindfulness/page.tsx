"use client";
import Nav from "../components/Nav";
// app/mindfulness/page.tsx
// IBD Compass — Mindfulness Page

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

type Tab = "breathe" | "listen" | "calm";
type BreathPhase = "inhale" | "hold-in" | "exhale" | "hold-out" | "ready";
type BiauralCategory =
  | "Comfort"
  | "Sleep"
  | "Anxiety"
  | "Rest & Comfort"
  | "Gentle Focus";
type NoiseType = "white" | "pink" | "brown";
type VoiceFile = "john" | "julie" | "les" | "sarah";
type BodyScanVoice = "ben" | "jane";

interface AromaProfile {
  oils: string[];
  description: string;
}

const aromaProfiles: Record<BiauralCategory, AromaProfile> = {
  Comfort: {
    oils: ["Frankincense", "Myrrh"],
    description:
      "Deeply grounding and anti-inflammatory. Diffuse together for a warm, resinous calm.",
  },
  Sleep: {
    oils: ["Lavender", "Frankincense"],
    description:
      "The most researched oils for sleep. Lavender eases the mind, Frankincense deepens the breath.",
  },
  Anxiety: {
    oils: ["Lavender", "Roman Chamomile"],
    description:
      "Gentle and calming. Roman Chamomile has natural anti-spasmodic properties that ease both mind and gut tension.",
  },
  "Rest & Comfort": {
    oils: ["Frankincense", "Myrrh"],
    description:
      "Ancient healing oils used for thousands of years for inflammation and comfort. Diffuse near your rest space.",
  },
  "Gentle Focus": {
    oils: ["Lemongrass", "Peppermint"],
    description:
      "Uplifting and clarifying. Peppermint also has evidence for easing nausea and abdominal discomfort.",
  },
};

const binauralFrequencies: Record<
  BiauralCategory,
  { hz: number; description: string }
> = {
  Comfort: {
    hz: 40,
    description:
      "Gamma waves — some people find this frequency soothing during periods of discomfort. Not a treatment for pain.",
  },
  Sleep: {
    hz: 3,
    description:
      "Delta waves — the brain frequency associated with deep sleep. A gentle aid to help your mind drift and unwind.",
  },
  Anxiety: {
    hz: 10,
    description:
      "Alpha waves — the relaxed, present state. Gentle and grounding without sedation.",
  },
  "Rest & Comfort": {
    hz: 6,
    description:
      "Theta waves — associated with deep rest and body awareness. Many people find this frequency calming during difficult days.",
  },
  "Gentle Focus": {
    hz: 14,
    description:
      "Low beta waves — calm, clear focus without overstimulation. Good for gentle activity and reading.",
  },
};

function generateBinauralTone(
  audioCtx: AudioContext,
  baseFreq: number,
  beatFreq: number,
  gainValue: number,
): {
  left: OscillatorNode;
  right: OscillatorNode;
  merger: ChannelMergerNode;
  gainNode: GainNode;
} {
  const left = audioCtx.createOscillator();
  const right = audioCtx.createOscillator();
  const merger = audioCtx.createChannelMerger(2);
  const gainNode = audioCtx.createGain();
  const leftGain = audioCtx.createGain();
  const rightGain = audioCtx.createGain();

  left.frequency.value = baseFreq;
  right.frequency.value = baseFreq + beatFreq;
  left.type = "sine";
  right.type = "sine";

  leftGain.gain.value = 1;
  rightGain.gain.value = 1;
  gainNode.gain.value = gainValue;

  left.connect(leftGain);
  right.connect(rightGain);
  leftGain.connect(merger, 0, 0);
  rightGain.connect(merger, 0, 1);
  merger.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  left.start();
  right.start();

  return { left, right, merger, gainNode };
}

function generateNoise(
  audioCtx: AudioContext,
  type: NoiseType,
  gainValue: number,
): { source: AudioBufferSourceNode; gainNode: GainNode } {
  const bufferSize = audioCtx.sampleRate * 4;
  const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const data = buffer.getChannelData(0);

  if (type === "white") {
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  } else if (type === "pink") {
    let b0 = 0,
      b1 = 0,
      b2 = 0,
      b3 = 0,
      b4 = 0,
      b5 = 0,
      b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.969 * b2 + white * 0.153852;
      b3 = 0.8665 * b3 + white * 0.3104856;
      b4 = 0.55 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.016898;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) / 7;
      b6 = white * 0.115926;
    }
  } else {
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5;
    }
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const gainNode = audioCtx.createGain();
  gainNode.gain.value = gainValue;
  source.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  source.start();

  return { source, gainNode };
}
export default function Mindfulness() {
  const [activeTab, setActiveTab] = useState<Tab>("breathe");

  // Box Breathing
  const [breathPhase, setBreathPhase] = useState<BreathPhase>("ready");
  const [breathCount, setBreathCount] = useState(0);
  const [breathRunning, setBreathRunning] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<VoiceFile>("john");
  const [voiceLoop, setVoiceLoop] = useState(true);
  const breathTimerRef = useRef<NodeJS.Timeout | null>(null);
  const voiceRef = useRef<HTMLAudioElement | null>(null);

  // Body Scan
  const [bodyScanVoice, setBodyScanVoice] = useState<BodyScanVoice>("ben");
  const [bodyScanPlaying, setBodyScanPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const bodyScanRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Binaural
  const [selectedCategory, setSelectedCategory] =
    useState<BiauralCategory>("Anxiety");
  const [binauralPlaying, setBinauralPlaying] = useState(false);
  const [binauralVolume, setBinauralVolume] = useState(0.3);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const binauralNodesRef = useRef<{
    left: OscillatorNode;
    right: OscillatorNode;
    merger: ChannelMergerNode;
    gainNode: GainNode;
  } | null>(null);

  // Noise
  const [selectedNoise, setSelectedNoise] = useState<NoiseType | null>(null);
  const [noiseVolume, setNoiseVolume] = useState(0.3);
  const noiseNodesRef = useRef<{
    source: AudioBufferSourceNode;
    gainNode: GainNode;
  } | null>(null);

  // Box breathing logic
  const phases: BreathPhase[] = ["inhale", "hold-in", "exhale", "hold-out"];
  const phaseLabels: Record<BreathPhase, string> = {
    inhale: "Inhale",
    "hold-in": "Hold",
    exhale: "Exhale",
    "hold-out": "Hold",
    ready: "Ready",
  };
  const phaseColors: Record<BreathPhase, string> = {
    inhale: "#2E8B6A",
    "hold-in": "#1B4F3A",
    exhale: "#6EC6A0",

    "hold-out": "#A8D8C4",
    ready: "#2E8B6A",
  };
  const phaseDuration = 4000;

  const startBreathing = () => {
    if (voiceRef.current) {
      voiceRef.current.src = `/audio/box-breathing-${selectedVoice}.mp3`;
      voiceRef.current.loop = false;
      voiceRef.current.play().catch(() => {});
      voiceRef.current.onended = () => {
        if (voiceRef.current && voiceLoop) {
          voiceRef.current.currentTime = 12.5;
          voiceRef.current.play().catch(() => {});
        }
      };
    }
    setBreathRunning(true);
    setBreathCount(0);
    setBreathPhase("ready");
    breathTimerRef.current = setTimeout(() => {
      runPhase(0, 0);
    }, 12000);
  };

  const runPhase = (phaseIndex: number, count: number) => {
    const phase = phases[phaseIndex];
    setBreathPhase(phase);
    if (phaseIndex === 0) setBreathCount(count + 1);
    breathTimerRef.current = setTimeout(() => {
      const nextPhase = (phaseIndex + 1) % phases.length;
      const nextCount = nextPhase === 0 ? count + 1 : count;
      runPhase(nextPhase, nextCount);
    }, phaseDuration);
  };

  const stopBreathing = () => {
    if (breathTimerRef.current) clearTimeout(breathTimerRef.current);
    if (voiceRef.current) {
      voiceRef.current.pause();
      voiceRef.current.currentTime = 0;
    }
    setBreathRunning(false);
    setBreathPhase("ready");
    setBreathCount(0);
  };

  // Binaural logic
  const startBinaural = () => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    if (binauralNodesRef.current) {
      binauralNodesRef.current.left.stop();
      binauralNodesRef.current.right.stop();
    }
    const freq = binauralFrequencies[selectedCategory].hz;
    binauralNodesRef.current = generateBinauralTone(
      ctx,
      200,
      freq,
      binauralVolume,
    );
    setBinauralPlaying(true);
  };

  const stopBinaural = () => {
    if (binauralNodesRef.current) {
      try {
        binauralNodesRef.current.left.stop();
        binauralNodesRef.current.right.stop();
      } catch {}
      binauralNodesRef.current = null;
    }
    setBinauralPlaying(false);
  };

  // Noise logic
  const startNoise = (type: NoiseType) => {
    if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
    const ctx = audioCtxRef.current;
    if (ctx.state === "suspended") ctx.resume();
    if (noiseNodesRef.current) {
      try {
        noiseNodesRef.current.source.stop();
      } catch {}
    }
    noiseNodesRef.current = generateNoise(ctx, type, noiseVolume);
    setSelectedNoise(type);
  };

  const stopNoise = () => {
    if (noiseNodesRef.current) {
      try {
        noiseNodesRef.current.source.stop();
      } catch {}
      noiseNodesRef.current = null;
    }
    setSelectedNoise(null);
  };

  // Body scan logic
  const toggleBodyScan = () => {
    if (bodyScanPlaying) {
      bodyScanRef.current?.pause();
      setBodyScanPlaying(false);
      setShowVideo(false);
    } else {
      if (!bodyScanRef.current) bodyScanRef.current = new Audio();
      bodyScanRef.current.src = `/audio/${bodyScanVoice === "ben" ? "ben_body_scan.mp3" : "jane_body_scan.mp3"}`;
      bodyScanRef.current.play().catch(() => {});
      setBodyScanPlaying(true);
      setShowVideo(true);
    }
  };

  useEffect(() => {
    voiceRef.current = new Audio();
    return () => {
      stopBreathing();
      stopBinaural();
      stopNoise();
      bodyScanRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (binauralNodesRef.current) {
      binauralNodesRef.current.gainNode.gain.value = binauralVolume;
    }
  }, [binauralVolume]);

  useEffect(() => {
    if (noiseNodesRef.current) {
      noiseNodesRef.current.gainNode.gain.value = noiseVolume;
    }
  }, [noiseVolume]);
  const circleSize =
    breathPhase === "inhale"
      ? "scale-150"
      : breathPhase === "exhale"
        ? "scale-75"
        : "scale-110";

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-page)" }}>
      {/* Navigation */}
      <Nav active="/mindfulness" />

      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-6 text-center">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Mindfulness
        </h1>
        <p
          className="text-sm leading-relaxed max-w-2xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          Stress is a known IBD flare trigger. These tools are here to help you
          breathe, rest and find calm — wherever you are, whenever you need it.
        </p>
        <p
          className="text-xs mt-3 italic"
          style={{ color: "var(--text-muted)" }}
        >
          Always be kind to yourself.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-4xl mx-auto px-6 pb-6">
        <div className="flex gap-3 justify-center">
          {(
            [
              { id: "breathe", label: "🌬️ Breathe" },
              { id: "listen", label: "🎧 Listen" },
              { id: "calm", label: "🌿 Calm" },
            ] as { id: Tab; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-2 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor:
                  activeTab === tab.id ? "var(--nav-bg)" : "var(--bg-card)",

                color: activeTab === tab.id ? "#ffffff" : "var(--text-primary)",
                border: "1px solid var(--text-primary)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20">
        {/* BREATHE TAB */}
        {activeTab === "breathe" && (
          <div className="space-y-6">
            {/* Box Breathing */}
            <div
              className="rounded-2xl p-8 border text-center"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              <h2
                className="text-xl font-semibold mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                Box Breathing
              </h2>
              <p
                className="text-xs mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                A simple, clinically supported breathing technique that
                activates the parasympathetic nervous system — helping calm both
                mind and gut.
              </p>
              <p
                className="text-xs mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                Inhale 4s · Hold 4s · Exhale 4s · Hold 4s · Repeat for 2–3
                minutes
              </p>

              {/* Breathing Circle */}
              <div className="flex items-center justify-center mb-8">
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 160,
                    height: 160,
                    backgroundColor: phaseColors[breathPhase],
                    transform:
                      breathPhase === "inhale"
                        ? "scale(1.5)"
                        : breathPhase === "exhale"
                          ? "scale(0.75)"
                          : breathPhase === "hold-in"
                            ? "scale(1.5)"
                            : breathPhase === "hold-out"
                              ? "scale(0.75)"
                              : "scale(1)",
                    transition:
                      breathPhase === "inhale"
                        ? "transform 4000ms ease-in-out, background-color 300ms"
                        : breathPhase === "exhale"
                          ? "transform 4000ms ease-in-out, background-color 300ms"
                          : "transform 0ms, background-color 300ms",
                  }}
                >
                  <span className="text-white font-semibold text-lg">
                    {phaseLabels[breathPhase]}
                  </span>
                </div>
              </div>

              {breathCount > 0 && (
                <p
                  className="text-xs mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Cycle {breathCount}
                </p>
              )}

              {/* Voice Selection */}
              <div className="mb-4">
                <p
                  className="text-xs font-medium mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Voice guidance
                </p>
                <div className="flex justify-center gap-2 flex-wrap mb-3">
                  {(["john", "julie", "les", "sarah"] as VoiceFile[]).map(
                    (v) => (
                      <button
                        key={v}
                        onClick={() => setSelectedVoice(v)}
                        className="px-4 py-1.5 rounded-full text-xs font-medium transition-all capitalize"
                        style={{
                          backgroundColor:
                            selectedVoice === v ? "#2E8B6A" : "var(--bg-card)",
                          color:
                            selectedVoice === v
                              ? "#ffffff"
                              : "var(--text-primary)",

                          border: "1px solid var(--border-color)",
                        }}
                      >
                        {v}
                      </button>
                    ),
                  )}
                </div>
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => setVoiceLoop(true)}
                    className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      backgroundColor: voiceLoop ? "#2E8B6A" : "var(--bg-card)",
                      color: voiceLoop ? "#ffffff" : "var(--text-primary)",

                      border: "1px solid var(--border-color)",
                    }}
                  >
                    Continuous
                  </button>
                  <button
                    onClick={() => setVoiceLoop(false)}
                    className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      backgroundColor: !voiceLoop
                        ? "#2E8B6A"
                        : "var(--bg-card)",
                      color: !voiceLoop ? "#ffffff" : "var(--text-primary)",

                      border: "1px solid var(--border-color)",
                    }}
                  >
                    Off after intro
                  </button>
                </div>
              </div>

              <button
                onClick={breathRunning ? stopBreathing : startBreathing}
                className="px-8 py-3 rounded-full text-white font-medium text-sm shadow transition-all"
                style={{
                  backgroundColor: breathRunning ? "#922B21" : "#2E8B6A",
                }}
              >
                {breathRunning ? "Stop" : "Start"}
              </button>
            </div>

            {/* Body Scan */}
            <div
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              <h2
                className="text-xl font-semibold mb-1 text-center"
                style={{ color: "var(--text-primary)" }}
              >
                Body Scan
              </h2>
              <p
                className="text-xs mb-6 text-center"
                style={{ color: "var(--text-secondary)" }}
              >
                A gentle guided meditation that brings kind awareness to each
                part of your body. Adapted to be compassionate and calm for
                those living with IBD.
              </p>

              {/* Video */}
              {showVideo && (
                <div className="mb-6 rounded-xl overflow-hidden">
                  <video
                    ref={videoRef}
                    src="/video/beach-sunrise-seamless-loop-new-audio.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full rounded-xl"
                  />
                </div>
              )}

              {/* Voice Selection */}
              <div className="mb-6 text-center">
                <p
                  className="text-xs font-medium mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  Choose a guide
                </p>
                <div className="flex justify-center gap-2">
                  {(["ben", "jane"] as BodyScanVoice[]).map((v) => (
                    <button
                      key={v}
                      onClick={() => setBodyScanVoice(v)}
                      className="px-4 py-1.5 rounded-full text-xs font-medium transition-all capitalize"
                      style={{
                        backgroundColor:
                          bodyScanVoice === v ? "#2E8B6A" : "var(--bg-card)",
                        color:
                          bodyScanVoice === v
                            ? "#ffffff"
                            : "var(--text-primary)",

                        border: "1px solid var(--border-color)",
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={toggleBodyScan}
                  className="px-8 py-3 rounded-full text-white font-medium text-sm shadow transition-all"
                  style={{
                    backgroundColor: bodyScanPlaying ? "#922B21" : "#2E8B6A",
                  }}
                >
                  {bodyScanPlaying ? "Stop" : "Begin Body Scan"}
                </button>
              </div>
            </div>
          </div>
        )}{" "}
        {/* LISTEN TAB */}
        {activeTab === "listen" && (
          <div className="space-y-6">
            {/* Binaural Beats */}
            <div
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              <h2
                className="text-xl font-semibold mb-1 text-center"
                style={{ color: "var(--text-primary)" }}
              >
                Binaural Beats
              </h2>
              <p
                className="text-xs mb-2 text-center"
                style={{ color: "var(--text-secondary)" }}
              >
                Binaural beats use slightly different frequencies in each ear to
                guide your brain into a desired state. Headphones are required
                for the full effect.
              </p>
              <p
                className="text-xs mb-6 text-center font-medium"
                style={{ color: "#922B21" }}
              >
                🎧 Please lower your volume before pressing play
              </p>

              {/* Category Selection */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {(Object.keys(binauralFrequencies) as BiauralCategory[]).map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        if (binauralPlaying) {
                          stopBinaural();
                        }
                      }}
                      className="px-4 py-2 rounded-full text-xs font-medium transition-all"
                      style={{
                        backgroundColor:
                          selectedCategory === cat
                            ? "var(--nav-bg)"
                            : "var(--bg-card)",
                        color:
                          selectedCategory === cat
                            ? "#ffffff"
                            : "var(--text-primary)",

                        border: "1px solid var(--border-color)",
                      }}
                    >
                      {cat}
                    </button>
                  ),
                )}
              </div>

              {/* Selected Info */}
              <div
                className="rounded-xl px-5 py-4 mb-6 text-center"
                style={{ backgroundColor: "var(--bg-page)" }}
              >
                <p
                  className="text-xs font-semibold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  {binauralFrequencies[selectedCategory].hz}Hz —{" "}
                  {selectedCategory}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {binauralFrequencies[selectedCategory].description}
                </p>
              </div>

              {/* Aromatherapy Pairing */}
              <div
                className="rounded-xl px-5 py-4 mb-6"
                style={{ backgroundColor: "var(--bg-accent)" }}
              >
                <p
                  className="text-xs font-semibold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  🌿 Aromatherapy pairing —{" "}
                  {aromaProfiles[selectedCategory].oils.join(" + ")}
                </p>
                <p
                  className="text-xs leading-relaxed mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  {aromaProfiles[selectedCategory].description}
                </p>
                <p className="text-xs italic" style={{ color: "#2E8B6A" }}>
                  Use only 100% pure therapeutic grade oils from reputable
                  suppliers. Always dilute before skin contact. Not a substitute
                  for medical care.
                </p>
              </div>

              {/* Volume */}
              <div className="mb-6">
                <p
                  className="text-xs font-medium mb-2 text-center"
                  style={{ color: "var(--text-primary)" }}
                >
                  Volume
                </p>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={binauralVolume}
                  onChange={(e) =>
                    setBinauralVolume(parseFloat(e.target.value))
                  }
                  className="w-full accent-green-700"
                />
              </div>

              <div className="text-center">
                <button
                  onClick={binauralPlaying ? stopBinaural : startBinaural}
                  className="px-8 py-3 rounded-full text-white font-medium text-sm shadow transition-all"
                  style={{
                    backgroundColor: binauralPlaying ? "#922B21" : "#2E8B6A",
                  }}
                >
                  {binauralPlaying ? "Stop" : "Play"}
                </button>
                <p
                  className="text-xs italic mt-4"
                  style={{ color: "var(--text-muted)" }}
                >
                  Binaural beats are a relaxation tool, not a treatment. Not a
                  substitute for medical care.
                </p>
              </div>
            </div>

            {/* Noise Therapy */}
            <div
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              <h2
                className="text-xl font-semibold mb-1 text-center"
                style={{ color: "var(--text-primary)" }}
              >
                Noise Therapy
              </h2>
              <p
                className="text-xs mb-6 text-center"
                style={{ color: "var(--text-secondary)" }}
              >
                Steady background noise can mask gut sounds, ease tinnitus, and
                create a consistent sonic environment that helps calm an
                overstimulated nervous system.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  {
                    type: "white" as NoiseType,
                    label: "White Noise",
                    desc: "Steady. Consistent. Grounding.",
                  },
                  {
                    type: "pink" as NoiseType,
                    label: "Pink Noise",
                    desc: "Natural. Balanced. Calming.",
                  },
                  {
                    type: "brown" as NoiseType,
                    label: "Brown Noise",
                    desc: "Deep. Warm. Anchoring.",
                  },
                ].map(({ type, label, desc }) => (
                  <button
                    key={type}
                    onClick={() =>
                      selectedNoise === type ? stopNoise() : startNoise(type)
                    }
                    className="rounded-xl p-4 text-center transition-all border"
                    style={{
                      backgroundColor:
                        selectedNoise === type
                          ? "var(--nav-bg)"
                          : "var(--bg-card)",
                      color:
                        selectedNoise === type
                          ? "#ffffff"
                          : "var(--text-primary)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <p className="text-xs font-semibold mb-1">{label}</p>
                    <p className="text-xs opacity-80">{desc}</p>
                  </button>
                ))}
              </div>

              {/* Volume */}
              <div className="mb-6">
                <p
                  className="text-xs font-medium mb-2 text-center"
                  style={{ color: "var(--text-primary)" }}
                >
                  Volume
                </p>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={noiseVolume}
                  onChange={(e) => setNoiseVolume(parseFloat(e.target.value))}
                  className="w-full accent-green-700"
                />
              </div>

              <div className="text-center">
                <button
                  onClick={() =>
                    selectedNoise ? stopNoise() : startNoise("white")
                  }
                  className="px-8 py-3 rounded-full text-white font-medium text-sm shadow transition-all"
                  style={{
                    backgroundColor: selectedNoise ? "#922B21" : "#2E8B6A",
                  }}
                >
                  {selectedNoise ? "Stop" : "Play"}
                </button>
              </div>
            </div>
          </div>
        )}
        {/* CALM TAB */}
        {activeTab === "calm" && (
          <div className="space-y-6">
            {/* Aromatherapy Guide */}
            <div
              className="rounded-2xl p-8 border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-color)",
              }}
            >
              <h2
                className="text-xl font-semibold mb-1 text-center"
                style={{ color: "var(--text-primary)" }}
              >
                Aromatherapy
              </h2>
              <p
                className="text-xs mb-6 text-center"
                style={{ color: "var(--text-secondary)" }}
              >
                Essential oils used as a complementary comfort practice — not a
                medical treatment. Always use 100% pure therapeutic grade oils
                from reputable Australian suppliers.
              </p>

              <div className="space-y-4">
                {[
                  {
                    symptom: "Comfort & Rest Support",
                    oils: "Frankincense + Myrrh",
                    detail:
                      "Traditionally used for warmth and grounding. Diffuse together to create a comforting environment during difficult days.",
                    caution: "Some people may be sensitive to these oils.",
                  },
                  {
                    symptom: "Anxiety & Stress",
                    oils: "Lavender + Roman Chamomile",
                    detail:
                      "Lavender has the strongest evidence base of any essential oil for anxiety reduction. Roman Chamomile may ease mind and gut tension.",
                    caution: "Never ingest essential oils.",
                  },
                  {
                    symptom: "Sleep",
                    oils: "Lavender + Frankincense",
                    detail:
                      "Lavender eases a busy mind while Frankincense encourages slow, deep breathing. Diffuse in your bedroom 30 minutes before sleep.",
                    caution:
                      "Keep diffuser use to 30–60 minutes. Continuous diffusion can cause headaches.",
                  },
                  {
                    symptom: "Nausea",
                    oils: "Peppermint",
                    detail:
                      "Peppermint has promising evidence for easing nausea through inhalation. Diffuse in your space or place one drop on a tissue and inhale gently.",
                    caution:
                      "Avoid diffusing around infants, young children and animals.",
                  },
                  {
                    symptom: "Mental Clarity & Gentle Focus",
                    oils: "Lemongrass + Peppermint",
                    detail:
                      "Uplifting and clarifying on good days. Supports gentle focus without overstimulation.",
                    caution: "Some people may have sensitivity to Lemongrass.",
                  },
                  {
                    symptom: "General Comfort & Calm",
                    oils: "Frankincense + Myrrh + Lavender",
                    detail:
                      "A deeply comforting blend with ancient healing roots. Suitable for diffusing during rest, meditation or the body scan practice.",
                    caution:
                      "Introduce one oil at a time if you have asthma or respiratory sensitivities.",
                  },
                ].map(({ symptom, oils, detail, caution }) => (
                  <div
                    key={symptom}
                    className="rounded-xl p-5 border"
                    style={{
                      backgroundColor: "var(--bg-page)",
                      borderColor: "var(--border-color)",
                    }}
                  >
                    <p
                      className="text-sm font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {symptom}
                    </p>
                    <p
                      className="text-xs font-medium mb-2"
                      style={{ color: "#2E8B6A" }}
                    >
                      🌿 {oils}
                    </p>
                    <p
                      className="text-xs leading-relaxed mb-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {detail}
                    </p>
                    <div
                      className="rounded-lg px-3 py-2"
                      style={{ backgroundColor: "var(--bg-accent)" }}
                    >
                      <p
                        className="text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        ⚠️ Worth knowing: {caution}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 rounded-xl px-5 py-4"
                style={{ backgroundColor: "var(--bg-accent)" }}
              >
                <p
                  className="text-xs font-semibold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  General safety reminders
                </p>
                <ul
                  className="text-xs space-y-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  <li>
                    • Use a diffuser for inhalation — the recommended method for
                    aromatherapy
                  </li>
                  <li>
                    • Introduce new oils cautiously if you have asthma or
                    respiratory conditions
                  </li>
                  <li>
                    • Aromatherapy is a comfort practice only — not a substitute
                    for medical care
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="max-w-4xl mx-auto px-6 pb-10">
        <div
          className="rounded-xl px-5 py-4 text-sm leading-relaxed"
          style={{
            backgroundColor: "var(--bg-accent)",
            color: "var(--text-primary)",
          }}
        >
          <strong>Understanding the mental health side of IBD</strong> —
          Mindfulness and relaxation techniques are one part of the picture. For
          a fuller look at the gut-brain connection, mood changes, and how to
          find professional psychological support, see our{" "}
          <Link href="/mental-health" className="underline">
            Mental Health &amp; IBD
          </Link>{" "}
          page.
          <p
            className="text-xs italic mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            This is educational information, not a substitute for care from a
            psychologist or your GP.
          </p>
        </div>
      </div>
      {/* Footer */}
      <footer
        className="border-t py-8 text-center"
        style={{
          borderColor: "var(--border-color)",
          backgroundColor: "var(--footer-bg)",
        }}
      >
        <p
          className="text-sm flex items-center justify-center gap-2 flex-wrap"
          style={{ color: "var(--text-secondary)" }}
        >
          <span>
            IBD Compass — Evidence-based information with hope at its heart
          </span>
        </p>
        <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>
          These tools are for comfort and wellbeing only — not a substitute for
          medical care.
        </p>
      </footer>
    </div>
  );
}
