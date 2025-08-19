import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function LandingHeader() {
  let isLogged = false;

  const session = await auth();
  if (session?.user?.id) isLogged = true;

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background border-b">
      <Link
        href="/"
        prefetch={false}
        className="flex items-center justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <span className="ml-2 text-lg font-semibold">Financify</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {isLogged ? (
          <>
            <Link href="/profile/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Sign Up</Button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
