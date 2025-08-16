"use server";

import { CreateUserDTO, LoginUserDTO } from "../dtos/user.dto";
import { createUser, getUserByUsername } from "../services/userService";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

type ActionResponse = {
  error: string | null;
  success: string | null;
};

export async function logIn(
  previousState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validation = LoginUserDTO.safeParse(raw);
  if (!validation.success) {
    const errors = validation.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`,
    );
    return { error: errors.join("; "), success: null };
  }
  const dto = validation.data;

  try {
    await signIn("credentials", {
      email: dto.email,
      password: dto.password,
      redirectTo: "/profile/dashboard",
    });

    return { error: null, success: "Logged in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials.", success: null };
        default:
          return {
            error: "An error occurred. Please try again.",
            success: null,
          };
      }
    }

    // Se o erro não for do NextAuth...
    throw error;
  }
}

export async function signUp(
  previousState: ActionResponse,
  formData: FormData,
): Promise<ActionResponse> {
  const raw = {
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    // confirmPassword: formData.get("confirmPassword") as string,
  };

  // Validação usando DTO
  const validation = CreateUserDTO.safeParse(raw);
  if (!validation.success) {
    const errors = validation.error.issues.map(
      (issue) => `${issue.path.join(".")}: ${issue.message}`,
    );
    return { error: errors.join("; "), success: null };
  }
  const dto = validation.data;

  // Tentativa de inserção do usuário na DB
  try {
    const existingUser = await getUserByUsername(dto.username);

    if (existingUser) {
      return { error: "Email or username already in use.", success: null };
    }

    await createUser(dto);

    return { success: "User created successfully!", error: null };
  } catch (err) {
    console.error(`Error at user creation: ${err}`);
    return { error: "An unexpected error occurred.", success: null };
  }
}
