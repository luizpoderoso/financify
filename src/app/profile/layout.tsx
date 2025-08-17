import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfileLayout({ children }) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return <>{children}</>;
}
