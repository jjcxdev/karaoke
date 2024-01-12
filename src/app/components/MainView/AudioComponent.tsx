"use client";

import { useEffect, useState } from "react";
import AudioVisualizer from "./AnalyserNode";

interface AudioComponentProps {
  selectedMicId: string;
  enableAudio: boolean;
  micVolume: number;
}

const AudioComponent = ({
  selectedMicId,
  enableAudio,
  micVolume,
}: AudioComponentProps) => {
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const [gainNode, setGainNode] = useState<GainNode | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      // exit if not in browswer environment
      return;
    }

    // create audiocontext and gain node and analyzer node
    const audioContext = new AudioContext();
    const newGainNode = audioContext.createGain();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 1024;

    setGainNode(newGainNode);
    setAnalyserNode(analyser);

    let sourceNode: OscillatorNode | MediaStreamAudioSourceNode | null = null;

    const setupMicrophone = async () => {
      try {
        const micStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: { exact: selectedMicId },
            echoCancellation: false,
            autoGainControl: false,
            noiseSuppression: false,
          },
        });
        sourceNode = audioContext.createMediaStreamSource(micStream);
        sourceNode.connect(newGainNode);
        console.log("Microphone connected");
      } catch (err) {
        console.log("Error connecting to microphone", err);
      }
    };

    if (enableAudio) {
      // setup oscillator
      const oscillator = audioContext.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
      oscillator.connect(newGainNode);
      analyser.connect(audioContext.destination);
      oscillator.start();
      console.log("Oscillator started");
    } else if (selectedMicId) {
      // setup microphone
      setupMicrophone();
    }

    if (gainNode) {
      gainNode.gain.value = micVolume;
    }

    newGainNode.connect(analyser); // connect gain node to analyzer
    analyser.connect(audioContext.destination); // connect analyzer to audio output

    return () => {
      sourceNode?.disconnect();
      newGainNode.disconnect();
      analyser.disconnect();
      console.log("Audio component cleanup");
    };
  }, [enableAudio, selectedMicId]);

  useEffect(() => {
    // adjust the gain based on micvolume prop
    if (gainNode) {
      gainNode.gain.value = micVolume;
      console.log("Mic volume set to", micVolume);
    }
  }, [micVolume]);

  return analyserNode ? <AudioVisualizer analyserNode={analyserNode} /> : null;
};

export default AudioComponent;
