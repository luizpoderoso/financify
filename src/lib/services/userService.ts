import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { TCreateUserDTO } from "../dtos/user.dto";
import bcrypt from "bcryptjs";

/**
 * Busca um usuário pelo email OU pelo nome de usuário.
 * @param username - Nome de usuário do usuário a ser buscado.
 * @returns O usuário encontrado ou `undefined`.
 */
export async function getUserByUsername(username: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .limit(1)
    .where(eq(usersTable.username, username));
  return user;
}

/**
 * Cria um novo usuário no banco de dados.
 * @param dto - Um objeto contendo os dados do novo usuário.
 * @returns O novo usuário criado.
 */
export async function createUser(dto: TCreateUserDTO) {
  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const newUser = await db
    .insert(usersTable)
    .values({
      name: dto.name,
      username: dto.username,
      email: dto.email,
      hashedPassword,
    })
    .returning();

  console.log(`\nNew user created with success:
  ID: ${newUser[0].id}
  Name: ${newUser[0].name}\n`);

  return newUser[0];
}
