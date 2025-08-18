import Link from "next/link";
import { Button } from "@/components/ui/button";

export const FinalCTASection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32">
    <div className="container text-center px-4 md:px-6">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
        Ready to Simplify Your Finances?
      </h2>
      <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed my-4">
        Create an account today and get a clear view of your financial life.
      </p>
      <Link href="/register">
        <Button size="lg">Sign Up Now</Button>
      </Link>
    </div>
  </section>
);
