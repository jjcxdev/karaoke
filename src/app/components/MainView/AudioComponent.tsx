"use client";

import { useEffect, useState } from "react";
import AudioVisualizer from "./AnalyserNode";

interface AudioComponentProps {
  selectedMicId: string;
  enableAudio: boolean;
}

const AudioComponent = ({
  selectedMicId,
  enableAudio,
}: AudioComponentProps) => {
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      // exit if not in browswer environment
      return;
    }

    // create audiocontext and gain node and analyzer node
    const audioContext = new AudioContext();
    const gainNode = audioContext.createGain();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024;

    setAnalyserNode(analyser);

    let sourceNode: OscillatorNode | MediaStreamAudioSourceNode | null = null;

    if (enableAudio) {
      // setup oscillator
      const oscillator = audioContext.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
      oscillator.connect(gainNode);
      analyser.connect(audioContext.destination);
      oscillator.start();
      console.log("Oscillator started");
    } else if (selectedMicId) {
      // setup microphone
      navigator.mediaDevices
        .getUserMedia({
          audio: {
            deviceId: { exact: selectedMicId },
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
          },
        })
        .then((micStream) => {
          sourceNode = audioContext.createMediaStreamSource(micStream);
          sourceNode.connect(gainNode); // connect mic to gain node
          console.log("Microphone connected");
        })
        .catch((err) => console.error("Microphone setup error:", err));
    }

    gainNode.connect(analyser); // connect gain node to analyzer
    analyser.connect(audioContext.destination); // connect analyzer to audio output

    return () => {
      sourceNode?.disconnect();
      gainNode.disconnect();
      analyser.disconnect();
      console.log("Audio component cleanup");
    };
  }, [enableAudio, selectedMicId]);

  return analyserNode ? <AudioVisualizer analyserNode={analyserNode} /> : null;
};

export default AudioComponent;