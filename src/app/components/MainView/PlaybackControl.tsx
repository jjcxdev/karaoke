"use client";

import { useEffect, useState } from "react";

import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaMicrophone } from "react-icons/fa";
import { FaForwardStep } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";

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

export default function Component() {
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        //Stop all tracks to release the microphone
        stream.getTracks().forEach((track) => track.stop());

        // Now enumerate devices
        navigator.mediaDevices.enumerateDevices().then((devices) => {
          const mics = devices.filter((device) => device.kind === "audioinput");
          setMicrophones(mics);
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="items-center w-full justify-center bg-gray-100 dark:bg-gray-800">
      <Card className="w-full space-y-6 p-4">
        <CardContent>
          <div className="flex flex-row justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="outline">
                <MdAirplay className="h-4 w-4" />
              </Button>
              <PlayerControls />
              <Button variant="outline">
                <FaForwardStep className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-row gap-4">
              <Select>
                <SelectTrigger aria-label="Select Speaker Input">
                  <HiMiniSpeakerWave />
                </SelectTrigger>
              </Select>
              <Input
                className="w-full"
                id="speakerVolume"
                max="100"
                min="0"
                type="range"
              />
            </div>
            <div className="flex flex-row gap-4">
              <Select>
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
                className="w-full"
                id="microphoneVolume"
                max="100"
                min="0"
                type="range"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
