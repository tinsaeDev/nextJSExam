import { createTheme } from "@mui/material/styles";

import { Download, Headphones, HeartBroken } from "@mui/icons-material";
import {
  Button,
  Chip,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";

export function CommentReply() {
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
export function Comment(props: { showReplies: boolean }) {
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

export function CommentList() {
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
