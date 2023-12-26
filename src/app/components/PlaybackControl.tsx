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
import { useState } from "react";

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
  return (
    <main className="items-center w-full justify-center bg-gray-100 dark:bg-gray-800">
      <Card className="w-full max-w-lg space-y-6 p-8">
        <CardContent>
          <div className="flex items-center justify-between">
            <Button variant="outline">
              <MdAirplay className="h-4 w-4" />
            </Button>
            <PlayerControls />
            <Button variant="outline">
              <FaForwardStep className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 flex flex-row gap-1">
            <Select id="speaker">
              <SelectTrigger aria-label="Select Speaker Input">
                <SelectValue placeholder={<HiMiniSpeakerWave />} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="speaker1">Speaker 1</SelectItem>
                <SelectItem value="speaker2">Speaker 2</SelectItem>
                <SelectItem value="speaker3">Speaker 3</SelectItem>
              </SelectContent>
            </Select>
            <Input
              className="w-full"
              id="speakerVolume"
              max="100"
              min="0"
              type="range"
            />
          </div>
          <div className="mt-4 flex flex-row gap-1">
            <Select id="microphone">
              <SelectTrigger aria-label="Select Microphone Input">
                <SelectValue placeholder={<FaMicrophone />} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mic1">Microphone 1</SelectItem>
                <SelectItem value="mic2">Microphone 2</SelectItem>
                <SelectItem value="mic3">Microphone 3</SelectItem>
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
        </CardContent>
      </Card>
    </main>
  );
}
