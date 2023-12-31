import Link from "next/link";

import { CreatePost } from "~/components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { DeletePost } from "../components/delete-post";
import { Button } from "~/components/ui/button";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <main className="">
      <p className="">{hello ? hello.greeting : ""}</p>

      <p className="">
        {session && <span>Logged in as {session.user?.name}</span>}
      </p>
      <Button asChild>
        <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
          {session ? "Sign out" : "Sign in"}
        </Link>
      </Button>

      <CrudShowcase />
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const posts = await api.post.getAll.query();

  return (
    <div className="">
      {posts.map((post) => (
        <div>
          <p className="">
            {post.id}: {post.name}
          </p>
          <DeletePost postId={post.id} />
        </div>
      ))}

      <CreatePost />
    </div>
  );
}
