"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1a1b1e",
    },
  },
});

import { Download, Headphones, Share } from "@mui/icons-material";
import {
  Button,
  Chip,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import MediaPayer from "./components/MediaPlayer";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { CommentList } from "./components/comments/Comment";
import { useState } from "react";

export default function Home() {
  const music: Music = {
    artist: {
      name: "Mickael Jackson",
      avatar: "/images/artists/jackson.jpg",
    },
    genere: "Rap",
    thumbnail: "/images/music_thumbnails/beat_it.jpg",
    src: {
      "128": "/audio/music/beat_it/128.mp3",
      "192": "/audio/music/beat_it/192.mp3",
      "320": "/audio/music/beat_it/320.mp3",
    },
    duration: 325,
    title: "Beat It",
    comments: [
      {
        text: "Very nice music",
        created_at: "",
        like_count: 2,
        replies: [
          {
            text: "I second this",
            created_at: "",
            like_count: 4,
            replies: [],
            updated_at: "",
            user: {
              avatar: "/images/music_thumbnails/beat_it.jpg",
              name: "Thomas",
            },
            time: 120,
          },
        ],
        updated_at: "",
        user: {
          avatar: "/images/music_thumbnails/beat_it.jpg",
          name: "Thomas",
        },
        time: 20,
      },
      {
        text: "Wow, nice tune",
        created_at: "",
        like_count: 4,
        replies: [],
        updated_at: "",
        user: {
          avatar: "/images/music_thumbnails/beat_it.jpg",
          name: "Thomas",
        },
        time: 120,
      },
    ],
  };

  const [floatingComment, setFloatingComment] = useState<MusicComment>();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Container
          sx={{
            mt: 3,
            // background: "orange",
            height: "90dvh",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              height: "100%",
            }}
          >
            {/* Left Side, Media Player */}

            <Grid
              xs={12}
              md={8}
              sx={{ height: "100%", bgcolor: "background.paper" }}
            >
              <Stack
                p={2}
                spacing={2}
                sx={{
                  height: "100%",
                }}
              >
                {/* Player Header */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  {/* Left */}

                  <Stack>
                    <Stack direction="row" spacing={2}>
                      <Image
                        width={60}
                        height={60}
                        src={music.thumbnail}
                        alt="Music Thumbnail"
                      />
                      <Stack>
                        <Typography
                          textTransform="capitalize"
                          fontWeight="bold"
                          variant="h5"
                        >
                          {music.title}
                        </Typography>
                        <Typography variant="caption">
                          {music.genere}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack
                      mt={2}
                      direction="row"
                      alignItems="center"
                      spacing={1}
                    >
                      <Image
                        width={24}
                        height={24}
                        src={music.artist.avatar}
                        style={{
                          borderRadius: "12px",
                        }}
                        alt="Artist "
                      />
                      <Typography fontWeight="bold" variant="subtitle2">
                        {music.artist.name}
                      </Typography>
                    </Stack>
                  </Stack>
                  {/* Right */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    spacing={1}
                  >
                    <Chip label="Share" size="small" icon={<Share />} />
                    <IconButton>
                      <Download />
                    </IconButton>
                  </Stack>
                </Stack>
                {/* Player Main */}
                <Stack flexGrow={1} sx={{}}>
                  <MediaPayer
                    music={music}
                    floatingComment={floatingComment}
                    setFloatingComment={(comment) => {
                      setFloatingComment(comment);
                    }}
                    onCloseFloatingComment={() => {
                      setFloatingComment(undefined);
                    }}
                  />
                </Stack>
              </Stack>
            </Grid>

            {/* Right SIde, Comments */}

            <Grid xs={12} md={4} sx={{ height: "100%" }}>
              <Stack spacing={2} sx={{ height: "100%" }}>
                <Button
                  startIcon={<Headphones />}
                  sx={{ p: 0, fontWeight: "bold" }}
                  variant="contained"
                >
                  Track Portal
                </Button>
                <Stack
                  sx={{
                    bgcolor: "background.paper",

                    p: 2,
                    borderRadius: 1,
                    flexGrow: 1,
                  }}
                  spacing={2}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    Comments
                  </Typography>

                  {/* Comment list */}
                  <Stack
                    mt={2}
                    flexGrow={1}
                    spacing={2}
                    sx={{
                      p: 2,
                      maxHeight: "360px",
                      overflow: "auto",
                    }}
                  >
                    {music.comments.map((comment, index) => {
                      return (
                        <CommentList
                          onMaximize={(comment: MusicComment) => {
                            setFloatingComment(comment);
                          }}
                          comment={comment}
                          key={index}
                        />
                      );
                    })}
                  </Stack>

                  {/* New comment text fiels */}

                  <TextField multiline placeholder="Add a comment" />
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
