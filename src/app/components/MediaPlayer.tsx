"use client";
import {
  Box,
  Fab,
  IconButton,
  Skeleton,
  Slide,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import {
  createRef,
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { AudioVisualizer } from "react-audio-visualize";
import useSettings from "../useSettings";
import { PauseCircle, PlayArrow } from "@mui/icons-material";
import moment from "moment";
import { CommentCard } from "./comments/Comment";
import Image from "next/image";

// This is a client component 👈🏽

const Visualizer = (props: { blob: Blob; currentTime: number }) => {
  const { blob, currentTime } = props;
  const visualizerRef = useRef<HTMLCanvasElement>(null);

  // set blob somewhere in code

  return (
    <div
      style={{
        width: "800",
        position: "relative",
      }}
    >
      {
        <AudioVisualizer
          currentTime={props.currentTime}
          ref={visualizerRef}
          blob={blob}
          width={600}
          height={200}
          barWidth={1}
          gap={1}
          barColor={"#fff"}
        />
      }
    </div>
  );
};

const audioPlayerRef = createRef<HTMLAudioElement>();

const PL = memo(function Player(props: { blob: Blob }) {
  const { blob } = props;
  return <audio ref={audioPlayerRef} src={URL.createObjectURL(blob)} />;
});

export default function MediaPayer(props: {
  music: Music;
  floatingComment: MusicComment | undefined;
  setFloatingComment: (comment: MusicComment) => void;
  onCloseFloatingComment: () => void;
}) {
  const { music } = props;
  const settings = useSettings();

  const audioQulaity = settings.getAudioQuality();
  const musicUrl = music.src[audioQulaity];

  const [blob, setBlob] = useState<Blob>();

  // Create audio blob
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

  audioPlayerRef.current?.addEventListener("timeupdate", function (e) {
    setCurrentTime((e.target as HTMLAudioElement).currentTime);
  });
  // Follow the current time
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const duration = audioPlayerRef.current?.duration || 0;
  return (
    <Box
      sx={{
        position: "relative",

        height: "100%",
      }}
    >
      {blob ? (
        <Stack
          flexGrow={1}
          justifyContent="space-between"
          sx={{
            height: "100%",
            position: "relative",
          }}
        >
          <PL blob={blob} />

          <Visualizer blob={blob} currentTime={currentTime} />

          {/* Player Footer */}
          <Stack>
            <Slider
              max={100}
              value={(currentTime / duration) * 100}
              onChange={(e: unknown) => {
                if (audioPlayerRef.current) {
                  const value = (
                    e as {
                      target: {
                        value: number;
                      };
                    }
                  ).target.value;

                  audioPlayerRef.current.currentTime = duration * (value / 100);
                }
              }}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>
                <Typography
                  color="primary"
                  component="span"
                  fontWeight={"bold"}
                >
                  {moment(currentTime * 1000).format("mm:ss")}
                </Typography>
                /
                <Typography component="span">
                  {moment(duration * 1000).format("mm:ss")}
                </Typography>{" "}
              </Typography>

              <Fab
                color="info"
                onClick={() => {
                  const player = audioPlayerRef.current;
                  if (!player) return;
                  if (isPlaying) {
                    audioPlayerRef.current.pause();
                    setIsPlaying(false);
                  } else {
                    audioPlayerRef.current.play();

                    setIsPlaying(true);
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

          {/* Markers */}

          {/* Floating COmment */}
          {props.floatingComment && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 100,
                width: "100%",
                height: "100%",
              }}
              onClick={(e) => {
                if (e.currentTarget != e.target) {
                  return;
                }
                props.onCloseFloatingComment();
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "10px",
                  left: "100px",
                  bgcolor: "background.paper",
                  boxShadow: "0px -35px 62px -5px #288459",
                }}
              >
                <CommentCard comment={props.floatingComment} />
              </Box>
            </Box>
          )}

          {/* Comments */}
          {music.comments.map((comment, index) => {
            const left = (comment.time / music.duration) * 100;
            return (
              <Box
                key={index}
                sx={{
                  position: "absolute",
                  top: 100,
                  left: `${left}%`,
                  cursor: "pointer",
                }}
                onClick={() => {
                  props.setFloatingComment(comment);
                }}
              >
                <Image
                  src={comment.user.avatar}
                  width={32}
                  height={32}
                  alt="Comment user"
                  style={{
                    borderRadius: 16,
                  }}
                />
              </Box>
            );
          })}
        </Stack>
      ) : (
        <Skeleton width={800} height={300} variant="rounded" />
      )}
    </Box>
  );
}
