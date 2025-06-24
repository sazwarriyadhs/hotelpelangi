"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getPricingSuggestion } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Loader2, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Suggest Price
        </>
      )}
    </Button>
  );
}

export function PricingTool() {
  const [state, formAction] = useFormState(getPricingSuggestion, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: state.error,
      });
    }
  }, [state.error, toast]);


  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="font-headline">Market Factors</CardTitle>
            <CardDescription>Provide current market conditions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="demand">Demand Level</Label>
              <Select name="demand" required>
                <SelectTrigger id="demand">
                  <SelectValue placeholder="Select demand level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="seasonality">Seasonality</Label>
               <Select name="seasonality" required>
                <SelectTrigger id="seasonality">
                  <SelectValue placeholder="Select seasonality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="off-peak">Off-Peak</SelectItem>
                  <SelectItem value="shoulder-season">Shoulder Season</SelectItem>
                  <SelectItem value="peak-season">Peak Season</SelectItem>
                   <SelectItem value="holiday">Holiday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="competitorRates">Competitor Rates</Label>
              <Textarea
                id="competitorRates"
                name="competitorRates"
                placeholder="e.g., Hotel Rival: $150, Guesthouse Nearby: $95"
                required
                className="min-h-24"
              />
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <div className="lg:col-span-2">
        <Card className="min-h-full">
           <CardHeader>
            <CardTitle className="font-headline">AI-Powered Suggestion</CardTitle>
            <CardDescription>Our AI will analyze the data and provide a pricing recommendation.</CardDescription>
          </CardHeader>
          <CardContent>
            {state.data ? (
              <div className="space-y-6">
                <div className="text-center">
                    <p className="text-muted-foreground">Suggested Optimal Price</p>
                    <p className="text-6xl font-bold text-primary">${state.data.suggestedPrice.toFixed(2)}</p>
                </div>
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle className="font-headline">Reasoning</AlertTitle>
                    <AlertDescription>
                        {state.data.reasoning}
                    </AlertDescription>
                </Alert>
              </div>
            ) : (
                 <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed">
                    <div className="text-center">
                        <p className="text-muted-foreground">Your pricing suggestion will appear here.</p>
                    </div>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
