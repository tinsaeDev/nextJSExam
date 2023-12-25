import { Download, PlayArrow, Share } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Fab,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import MediaPayer from "./components/MediaPlayer";

export default async function Home() {
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
    <Container
      sx={{
        mt: 3,
        background: "orange",
        height: "90dvh",
      }}
    >
      <Stack
        direction="row"
        sx={{
          height: "100%",
        }}
      >
        {/* Left Side, Media Player */}
        <Stack
          sx={{
            minWidth: "70%",
            p: 2,
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
                  <Typography variant="caption">{music.genere}</Typography>
                </Stack>
              </Stack>
              <Stack mt={2} direction="row" alignItems="center" spacing={1}>
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
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
              <Button
                color="primary"
                size="small"
                variant="contained"
                startIcon={<Share />}
              >
                Share
              </Button>
              <IconButton>
                <Download />
              </IconButton>
            </Stack>
          </Stack>
          {/* Player Main */}
          <Stack flexGrow={1}>
            <MediaPayer music={music} />
          </Stack>
       
        </Stack>

        {/* Right SIde, Comments */}
        <Stack p={2} spacing={2}>
          <Button variant="contained" color="primary">
            Track Portal
          </Button>
          <Stack
            sx={{
              bgcolor: "background.paper",

              p: 2,
              borderRadius: 1,
              flexGrow: 1,
            }}
          >
            <Typography> Comments </Typography>

            {/* Comment list */}
            <Stack flexGrow={1}></Stack>

            {/* New comment text fiels */}

            <TextField multiline />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
