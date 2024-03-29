import { z } from "zod";

export const threadValidation = z.object({
  thread: z.string().min(3, { message: "Minimum 3 characters" }).max(1000),
  accountId: z.string(),
});

export const commentValidation = z.object({
  thread: z.string().min(3, { message: "Minimum 3 characters" }).max(1000),
});
