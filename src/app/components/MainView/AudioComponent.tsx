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
  const [audioContext] = useState(
    () => new AudioContext({ latencyHint: "interactive" })
  );
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);

  useEffect(() => {
    // create gain node and analyzer node
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
          audio: { deviceId: { exact: selectedMicId } },
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
  }, [audioContext, enableAudio, selectedMicId]);

  return analyserNode ? <AudioVisualizer analyserNode={analyserNode} /> : null;
};

export default AudioComponent;

// const AudioComponent = ({
//   selectedMicId,
//   volume,
//   enableAudio,
// }: AudioComponentProps) => {
//   const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

//   useEffect(() => {
//     console.log("audio component mounted", { selectedMicId, volume });
//     let audioContext: AudioContext | undefined;
//     let gainNode: GainNode | undefined;
//     let source: MediaStreamAudioSourceNode | undefined;
//     let stream: MediaStream | undefined;

//     const setupAudioStream = async () => {
//       if (selectedMicId && enableAudio) {
//         try {
//           // request access to the selected micrphone
//           stream = await navigator.mediaDevices.getUserMedia({
//             audio: { deviceId: { exact: selectedMicId } },
//           });

//           // log the captured audio stream
//           console.log("captured audio stream", stream);

//           // setup web audio api
//           audioContext = new AudioContext();
//           console.log("audiocontext state after creation", audioContext.state);

//           source = audioContext.createMediaStreamSource(stream);
//           gainNode = audioContext.createGain();

//           // connect the nodes
//           source.connect(gainNode);
//           gainNode.connect(audioContext.destination);

//           // set volume
//           gainNode.gain.value = volume;

//           // check if audiocontext is suspended and resume if neccesary
//           if (audioContext.state === "suspended") {
//             console.log("audiocontext is suspended, resuming...");
//             await audioContext.resume();
//             console.log("audiocontext resumed");
//           } else {
//             console.log(
//               "audioContext state is not suspended",
//               audioContext.state
//             );
//           }
//         } catch (err) {
//           console.error("error accessing the microphone", err);
//         }
//       }
//     };

//     if (selectedMicId) {
//       console.log("setting up audio stream for mic", selectedMicId);
//       setupAudioStream();
//     }

//     return () => {
//       console.log("cleaning up audiocomponent");
//       // clean up
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//       if (audioContext) {
//         audioContext.close();
//       }
//     };
//   }, [selectedMicId, audioStream, enableAudio]);

//   return null;
// };

// export default AudioComponent;
