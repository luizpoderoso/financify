import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HeroSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 text-center">
    <div className="container px-4 md:px-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Take Control of Your Finances
        </h1>
        <p className="text-muted-foreground md:text-xl">
          Financify helps you understand your spending by importing and
          categorizing your bank statements effortlessly. Simple, powerful,
          insightful.
        </p>
        <Link href="/register">
          <Button size="lg">Get Started for Free</Button>
        </Link>
      </div>
    </div>
  </section>
);
