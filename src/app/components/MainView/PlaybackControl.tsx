"use client";

import { useEffect, useState } from "react";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaForwardStep } from "react-icons/fa6";
import { FaPlay, FaPause, FaMicrophone } from "react-icons/fa";
import { MdAirplay } from "react-icons/md";
import { CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import AudioComponent from "./AudioComponent";
import AudioVisualizer from "./AnalyserNode";

const PlayerControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Button variant="outline" onClick={togglePlayPause}>
      {isPlaying ? (
        <FaPause className="h-4 w-4" />
      ) : (
        <FaPlay className="h-4 w-4" />
      )}
    </Button>
  );
};

function PlaybackControl() {
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [selectedMicId, setSelectedMicId] = useState("");
  const [micVolume, setMicVolume] = useState(0.5);
  const [enableAudio, setEnableAudio] = useState(false);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  const handleMicVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVolume = parseFloat(event.target.value);
    console.log("microphone volume changed", newVolume);
    setMicVolume(newVolume);
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const mics = devices.filter((device) => device.kind === "audioinput");
      console.log("available microphones:", mics);
      setMicrophones(mics);
    });
  }, []);

  useEffect(() => {
    const audioContext = new AudioContext();
    const node = audioContext.createAnalyser();
    setAnalyserNode(node);

    return () => {
      node.disconnect();
      audioContext.close();
    };
  }, []);

  const handleMicChange = (value: string) => {
    console.log("selected microphone id", value);
    setSelectedMicId(value);
  };

  const toggleEnableAudio = () => {
    setEnableAudio(!enableAudio);
  };

  return (
    <main className="items-center w-full justify-center bg-gray-100 dark:bg-gray-800">
      <AudioComponent
        selectedMicId={selectedMicId}
        enableAudio={enableAudio}
        micVolume={micVolume}
      />
      <Card className="w-full space-y-6 p-4">
        <CardContent>
          <div className="flex flex-row justify-between gap-4">
            {/* <div className="flex items-center gap-4">
              <Button variant="outline">
                <MdAirplay className="h-4 w-4" />
              </Button>
              <PlayerControls />
              <Button variant="outline">
                <FaForwardStep className="h-4 w-4" />
              </Button>
            </div> */}
            <div className="flex flex-row gap-4">
              <Select>
                <SelectTrigger aria-label="Select Speaker Input">
                  <HiMiniSpeakerWave />
                </SelectTrigger>
              </Select>
              <Input
                className="w-full min-w-0"
                id="speakerVolume"
                max="100"
                min="0"
                type="range"
              />
            </div>
            <div className="flex flex-row gap-4">
              <Select onValueChange={handleMicChange}>
                <SelectTrigger aria-label="Select Microphone Input">
                  <FaMicrophone />
                </SelectTrigger>
                <SelectContent>
                  {microphones.map(
                    (mic) =>
                      mic.deviceId && (
                        <SelectItem key={mic.deviceId} value={mic.deviceId}>
                          {mic.label || "Unknown Microphone"}
                        </SelectItem>
                      )
                  )}
                </SelectContent>
              </Select>
              <Input
                className="w-full min-w-0"
                id="microphoneVolume"
                max="1"
                min="0"
                step=".01"
                value={micVolume}
                onChange={handleMicVolumeChange}
                type="range"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <AudioVisualizer analyserNode={analyserNode!} /> */}
      {/* <button onClick={toggleEnableAudio}>
        {enableAudio ? "Switch to Microphone" : "Switch to Oscillator"}
      </button> */}
    </main>
  );
}

export default PlaybackControl;
