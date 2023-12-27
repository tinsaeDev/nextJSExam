import { HeartBroken } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";

import { useState } from "react";
import { common } from "@mui/material/colors";
import moment from "moment";

export function CommentReply(props: { comment: MusicComment }) {
  const [favoriteComment, setFavoriteComment] = useState(false);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Image
            alt="Cmmenter"
            src={props.comment.user.avatar}
            width={24}
            height={24}
            style={{
              borderRadius: 12,
            }}
          />
          <Typography variant="caption" fontWeight="bold">
            {props.comment.user.name}
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
          {props.comment.text}
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
export function MusicComment(props: {
  comment: MusicComment;
  showReplies: boolean;
  onMaximize?: (comment: MusicComment) => void;
}) {
  const { comment, showReplies } = props;
  debugger;
  const [favoriteComment, setFavoriteComment] = useState(false);
  const likeCount = comment.like_count + (favoriteComment ? 1 : 0);
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={0.5} alignItems="center">
          <Image
            alt="Cmmenter"
            src={comment.user.avatar}
            width={24}
            height={24}
            style={{
              borderRadius: 12,
            }}
          />
          <Typography variant="caption" fontWeight="bold">
            {comment.user.name}
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
          onClick={() => {
            if (props.onMaximize) {
              props.onMaximize(comment);
            }
          }}
        >
          {moment(comment.time * 1000).format("mm:ss")}
        </Button>
      </Stack>
      <Stack
        sx={{
          paddingLeft: "24px",
        }}
      >
        <Typography variant="caption" fontWeight="bold" color="text.secondary">
          {comment.text}
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
            <Typography> {likeCount} </Typography>
          </Stack>
        </Stack>

        {props.showReplies && (
          <Stack
            sx={{
              paddingLeft: "1rem",
            }}
          >
            {/* Replies */}
            {comment.replies.map((reply, index) => {
              return <CommentReply key={index} comment={reply} />;
            })}
          </Stack>
        )}
      </Stack>
    </>
  );
}

export function CommentList(props: {
  comment: MusicComment;
  onMaximize: (comment: MusicComment) => void;
}) {
  return (
    <Stack spacing={1} minWidth={300}>
      <MusicComment
        onMaximize={props.onMaximize}
        comment={props.comment}
        showReplies={true}
      />
    </Stack>
  );
}

export function CommentCard(props: { comment: MusicComment }) {
  return (
    <Stack
      spacing={1}
      p={2}
      minWidth={300}
      maxWidth={400}
      sx={{
        borderRadius: 1,
      }}
    >
      <MusicComment comment={props.comment} showReplies={false} />
    </Stack>
  );
}
