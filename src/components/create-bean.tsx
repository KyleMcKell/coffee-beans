"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "~/trpc/react";
import { Button } from "./ui/button";

export function CreateBean() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createCoffeeBean = api.coffeeBean.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createCoffeeBean.mutate({ name });
      }}
    >
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button type="submit" disabled={createCoffeeBean.isLoading}>
        {createCoffeeBean.isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
