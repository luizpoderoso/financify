import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, BarChart3, ShieldCheck } from "lucide-react";

export const FeaturesSection = () => (
  <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
    <div className="container px-4 md:px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          {"Why You'll Love Financify"}
        </h2>
        <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed">
          Focus on what matters most. We handle the complexity.
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3">
        <Card className="bg-background">
          <CardHeader>
            <div className="flex items-center gap-4">
              <UploadCloud className="w-8 h-8 text-primary" />
              <CardTitle>Easy CSV Import</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Securely upload your bank statements in CSV format and see your
              transactions appear in seconds.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader>
            <div className="flex items-center gap-4">
              <BarChart3 className="w-8 h-8 text-primary" />
              <CardTitle>Visual Dashboards</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Visualize your income and expenses with clean, easy-to-understand
              charts and summaries.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-background">
          <CardHeader>
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <CardTitle>Secure & Private</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your financial data is yours alone. We prioritize your privacy
              with secure authentication and data handling.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
);
