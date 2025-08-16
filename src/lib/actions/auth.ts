"use server";

import { CreateUserDTO } from "../dtos/user.dto";
import { createUser, getUserByEmailOrUsername } from "../services/userService";

type SignUpState = {
  error: string | null;
  success: string | null;
};

export async function signUp(
  previousState: SignUpState,
  formData: FormData,
): Promise<SignUpState> {
  // Extração de dados do formulário
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
    const existingUser = await getUserByEmailOrUsername(dto);

    if (existingUser) {
      return { error: "Email or username already in use.", success: null };
    }

    await createUser(dto);

    return { success: "User created successfully!", error: null };
  } catch (err) {
    console.error(`Erro ao criar usuário: ${err}`);
    return { error: "An unexpected error occurred.", success: null };
  }
}
