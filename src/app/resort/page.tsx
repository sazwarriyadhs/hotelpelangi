import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function ResortPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline md:text-4xl">Resort Services</h1>
        <p className="text-muted-foreground">
          Manage spa, activities, and other resort amenities.
        </p>
      </div>
      <Card className="flex flex-col items-center justify-center h-96 border-dashed">
        <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-muted-foreground max-w-md">
                We are currently developing a comprehensive module to manage all your resort services. Stay tuned for updates!
            </p>
        </CardContent>
      </Card>
    </div>
  );
}
