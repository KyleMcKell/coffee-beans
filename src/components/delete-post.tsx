"use client";

import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { Button } from "./ui/button";

type Props = {
  postId: number;
};

export function DeletePost({ postId }: Props) {
  const router = useRouter();

  const deletePost = api.post.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <Button
      disabled={deletePost.isLoading}
      onClick={() => deletePost.mutate(postId)}
    >
      {deletePost.isLoading ? "Deleting..." : "Delete"}
    </Button>
  );
}
