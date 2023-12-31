import Link from "next/link";

import { CreateBean } from "~/components/create-bean";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { DeleteBean } from "../components/delete-bean";
import { Button } from "~/components/ui/button";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="">
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

  const coffeeBeans = await api.coffeeBean.getAll.query();

  return (
    <div className="">
      {coffeeBeans.map((bean) => (
        <div>
          <p className="">
            {bean.id}: {bean.name}
          </p>
          <DeleteBean coffeeBeanId={bean.id} />
        </div>
      ))}

      <CreateBean />
    </div>
  );
}
