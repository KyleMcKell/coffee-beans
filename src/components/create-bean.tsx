"use client";

import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";
import { Button } from "./ui/button";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

export function CreateBean() {
  const router = useRouter();
  const form = useForm<FormType>();

  const createCoffeeBean = api.coffeeBean.create.useMutation({
    onSuccess: () => {
      router.refresh();
      form.reset();
    },
  });

  const onSubmit = (data: FormType) => {
    createCoffeeBean.mutate({ name: data.name });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <input type="text" placeholder="Name" />
        <Button type="submit" disabled={createCoffeeBean.isLoading}>
          {createCoffeeBean.isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
