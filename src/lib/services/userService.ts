import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/schema";
import { eq, or } from "drizzle-orm";
import { TCreateUserDTO, TFindUserDTO } from "../dtos/user.dto";
import bcrypt from "bcryptjs";

/**
 * Busca um usuário pelo email OU pelo nome de usuário.
 * @param email - O email do usuário.
 * @param username - O nome de usuário.
 * @returns O usuário encontrado ou `undefined`.
 */
export async function getUserByEmailOrUsername(dto: TFindUserDTO) {
  const { email, username } = dto;
  const user = await db.query.usersTable.findFirst({
    where: or(eq(usersTable.email, email), eq(usersTable.username, username)),
  });
  return user;
}

/**
 * Cria um novo usuário no banco de dados.
 * @param user - Um objeto contendo os dados do novo usuário.
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

  return newUser[0];
}
