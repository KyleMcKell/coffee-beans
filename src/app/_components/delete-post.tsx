"use client";

import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";

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
    <button
      className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
      disabled={deletePost.isLoading}
      onClick={() => deletePost.mutate(postId)}
    >
      {deletePost.isLoading ? "Deleting..." : "Delete"}
    </button>
  );
}
