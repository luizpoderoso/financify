// src/lib/dtos/user.dto.ts
import { z } from "zod";

export const CreateUserDTO = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  username: z
    .string()
    .min(4, "O nome de usuário deve ter pelo menos 4 caracteres."),
  email: z.email("Formato de email inválido."),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
});

export type TCreateUserDTO = z.infer<typeof CreateUserDTO>;

export const FindUserDTO = z.object({
  username: z.string(),
  email: z.email(),
});

export type TFindUserDTO = z.infer<typeof FindUserDTO>;
