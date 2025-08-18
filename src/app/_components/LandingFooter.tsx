import Link from "next/link";

export const LandingFooter = () => (
  <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
    <p className="text-xs text-muted-foreground">
      &copy; 2025 Financify. All Rights Reserved.
    </p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
      {/* Você pode adicionar links para Termos de Serviço, etc. aqui se quiser */}
      <Link
        href="https://github.com/luizpoderoso"
        className="text-xs hover:underline underline-offset-4"
        prefetch={false}
        target="_blank"
      >
        GitHub
      </Link>
    </nav>
  </footer>
);
