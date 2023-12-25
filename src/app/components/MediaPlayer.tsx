"use client";
import { Box, Fab, Skeleton, Stack, Typography } from "@mui/material";
import {
  createRef,
  memo,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { AudioVisualizer } from "react-audio-visualize";
import useSettings from "../useSettings";
import { PauseCircle, PlayArrow } from "@mui/icons-material";

// This is a client component 👈🏽

const Visualizer = (props: { blob: Blob; currentTime: number }) => {
  const { blob, currentTime } = props;
  const visualizerRef = useRef<HTMLCanvasElement>(null);

  // set blob somewhere in code

  return (
    <div
      style={{
        width: "800",
      }}
    >
      {
        <AudioVisualizer
          currentTime={props.currentTime}
          ref={visualizerRef}
          blob={blob}
          width={800}
          height={300}
          barWidth={2}
          gap={2}
          barColor={"#fff"}
        />
      }
    </div>
  );
};

export default function MediaPayer(props: { music: Music }) {
  const settings = useSettings();

  const audioQulaity = settings.getAudioQuality();
  const musicUrl = props.music.src[audioQulaity];

  const [blob, setBlob] = useState<Blob>();

  useLayoutEffect(
    function () {
      fetch(musicUrl).then((r) => {
        r.blob().then((blob) => {
          setBlob(blob);
        });
      });
    },
    [musicUrl]
  );

  //   Track

  const audioPlayerRef = createRef<HTMLAudioElement>();
  const [isPlaying, setIsPlaying] = useState<boolean>();
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      {blob ? (
        <Stack justifyContent="space-between">
          <AudioPlaya
            blob={blob}
            setCurrentTime={(num) => {}}
            setIsPlaying={(val: boolean) => {
              setIsPlaying(val);
            }}
          />
          <Visualizer blob={blob} currentTime={currentTime} />

          {/* Player Footer */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>
              <Typography color="info" component="span">
                {duration}
              </Typography>
              / <Typography component="span"> {duration} </Typography>{" "}
            </Typography>

            <Fab
              color="info"
              onClick={() => {
                if (!audioPlayerRef.current) return;
                if (!isPlaying) {
                  audioPlayerRef.current.play();
                } else {
                  audioPlayerRef.current.pause();
                }
              }}
            >
              {isPlaying ? (
                <PauseCircle fontSize="large" />
              ) : (
                <PlayArrow fontSize="large" />
              )}
            </Fab>
            <span></span>
          </Stack>
        </Stack>
      ) : (
        <Skeleton width={800} height={300} variant="rounded" />
      )}
    </Box>
  );
}

function AudioPlaya(props: {
  blob: Blob;
  setIsPlaying: (val: boolean) => void;
  setCurrentTime: (val: number) => void;
}) {
  const { blob, setIsPlaying, setCurrentTime } = props;
  return (
    <audio
      onLoad={(e) => {
        const target = e;
        console.log(target);
      }}
      onPause={() => {
        setIsPlaying(false);
      }}
      onPlay={() => {
        setIsPlaying(true);
      }}
      onTimeUpdate={(e) => {
        const time = (e.target as HTMLAudioElement).currentTime;
        setCurrentTime(time);
      }}
      src={URL.createObjectURL(blob)}
      controls
    />
  );
}
