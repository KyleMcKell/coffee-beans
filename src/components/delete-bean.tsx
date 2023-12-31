"use client";

import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { Button } from "./ui/button";

type Props = {
  coffeeBeanId: string;
};

export function DeleteBean({ coffeeBeanId }: Props) {
  const router = useRouter();

  const deleteCoffeeBean = api.coffeeBean.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <Button
      disabled={deleteCoffeeBean.isLoading}
      onClick={() => deleteCoffeeBean.mutate(coffeeBeanId)}
    >
      {deleteCoffeeBean.isLoading ? "Deleting..." : "Delete"}
    </Button>
  );
}
