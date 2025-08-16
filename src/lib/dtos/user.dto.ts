// src/lib/dtos/user.dto.ts
import { z } from "zod";

export const CreateUserDTO = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  username: z.string().min(4, "Username must be at least 4 characters long."),
  email: z.email("Invalid email format."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export type TCreateUserDTO = z.infer<typeof CreateUserDTO>;

export const FindUserDTO = z.object({
  username: z.string(),
  email: z.email(),
});

export type TFindUserDTO = z.infer<typeof FindUserDTO>;
