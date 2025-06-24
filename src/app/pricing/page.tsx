import { PricingTool } from '@/components/pricing-tool';
import { Wand2 } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline md:text-4xl">Dynamic Pricing Tool</h1>
            <p className="text-muted-foreground max-w-2xl">
              Leverage AI to suggest optimal room pricing based on real-time demand, seasonality, and competitor rates.
            </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Wand2 className="h-6 w-6 text-primary" />
        </div>
      </div>
      <PricingTool />
    </div>
  );
}
