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

import {
  Download,
  Headphones,
  HeartBroken,
  PlayArrow,
  Share,
} from "@mui/icons-material";
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
import { useState } from "react";

export default function Home() {
  const music: Music = {
    artist: {
      name: "Mickael Jackson",
      avatar: "/images/artists/jackson.jpg",
    },
    comments: [],
    genere: "Rap",
    thumbnail: "/images/music_thumbnails/beat_it.jpg",
    src: {
      "128": "/audio/music/beat_it/128.mp3",
      "192": "/audio/music/beat_it/192.mp3",
      "320": "/audio/music/beat_it/320.mp3",
    },
    title: "Beat It",
  };
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
                  <MediaPayer music={music} />
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
                    {[1, 2, 3, 4].map((comment, index) => {
                      return <CommentList key={index} />;
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

function CommentReply() {
  const [favoriteComment, setFavoriteComment] = useState(false);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Image
            alt="Cmmenter"
            src="https://picsum.photos/24"
            width={24}
            height={24}
            style={{
              borderRadius: 12,
            }}
          />
          <Typography variant="caption" fontWeight="bold">
            Ojole
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          1 hour ago
        </Typography>
      </Stack>

      <Stack
        sx={{
          paddingLeft: "24px",
        }}
      >
        <Typography variant="caption" fontWeight="bold" color="text.secondary">
          Snare has execive reverb! How does it sound to you?
        </Typography>

        {/* Reactions */}
        <Stack mt={1} spacing={2} direction="row" alignItems="center">
          {/* Favorite  */}
          <IconButton
            size="small"
            onClick={() => {
              setFavoriteComment(!favoriteComment);
            }}
          >
            <HeartBroken color={favoriteComment ? "info" : "inherit"} />
          </IconButton>
        </Stack>
      </Stack>
    </>
  );
}
function Comment(props: { showReplies: boolean }) {
  const { showReplies } = props;
  const [favoriteComment, setFavoriteComment] = useState(false);
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Image
            alt="Cmmenter"
            src="https://picsum.photos/24"
            width={24}
            height={24}
            style={{
              borderRadius: 12,
            }}
          />
          <Typography variant="caption" fontWeight="bold">
            Ojole
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary">
          1 hour ago
        </Typography>
        <Button
          size="small"
          variant="outlined"
          sx={{
            p: 0,
          }}
        >
          1:22
        </Button>
      </Stack>
      <Stack
        sx={{
          paddingLeft: "24px",
        }}
      >
        <Typography variant="caption" fontWeight="bold" color="text.secondary">
          Snare has execive reverb! How does it sound to you?
        </Typography>

        {/* Reactions */}
        <Stack mt={1} spacing={2} direction="row" alignItems="center">
          <Typography
            variant="caption"
            color="text.secondary"
            fontWeight="bold"
          >
            Replay
          </Typography>

          {/* Favorite  */}
          <Stack direction="row" alignItems="center">
            <IconButton
              size="small"
              onClick={() => {
                setFavoriteComment(!favoriteComment);
              }}
            >
              <HeartBroken color={favoriteComment ? "info" : "inherit"} />
            </IconButton>
            <Typography>2</Typography>
          </Stack>
        </Stack>

        {/* Replies */}
        {showReplies && (
          <Stack
            sx={{
              paddingLeft: "1rem",
            }}
          >
            <CommentReply />
          </Stack>
        )}
      </Stack>
    </>
  );
}

function CommentList() {
  return (
    <Stack spacing={1} minWidth={300}>
      <Comment showReplies={true} />
    </Stack>
  );
}

export function CommentCard() {
  return (
    <Stack
      spacing={1}
      p={2}
      maxWidth={300}
      sx={{
        borderRadius: 1,
      }}
    >
      <Comment showReplies={false} />
    </Stack>
  );
}
