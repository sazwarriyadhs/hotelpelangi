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
import { useTranslation } from "@/hooks/use-translation";
import { useSettings } from "@/hooks/use-settings";
import { formatCurrency } from "@/lib/utils";

const initialState = {
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useTranslation();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t('pricing.analyzing')}
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          {t('pricing.suggestPrice')}
        </>
      )}
    </Button>
  );
}

export function PricingTool() {
  const [state, formAction] = useFormState(getPricingSuggestion, initialState);
  const { toast } = useToast();
  const { t } = useTranslation();
  const { currency } = useSettings();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: t('pricing.error.title'),
        description: t(state.error),
      });
    }
  }, [state.error, toast, t]);


  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="font-headline">{t('pricing.marketFactors')}</CardTitle>
            <CardDescription>{t('pricing.marketFactorsDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="demand">{t('pricing.demandLevel')}</Label>
              <Select name="demand" required>
                <SelectTrigger id="demand">
                  <SelectValue placeholder={t('pricing.selectDemand')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{t('pricing.demand.low')}</SelectItem>
                  <SelectItem value="medium">{t('pricing.demand.medium')}</SelectItem>
                  <SelectItem value="high">{t('pricing.demand.high')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="seasonality">{t('pricing.seasonality')}</Label>
               <Select name="seasonality" required>
                <SelectTrigger id="seasonality">
                  <SelectValue placeholder={t('pricing.selectSeasonality')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="off-peak">{t('pricing.seasonality.offPeak')}</SelectItem>
                  <SelectItem value="shoulder-season">{t('pricing.seasonality.shoulder')}</SelectItem>
                  <SelectItem value="peak-season">{t('pricing.seasonality.peak')}</SelectItem>
                   <SelectItem value="holiday">{t('pricing.seasonality.holiday')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="competitorRates">{t('pricing.competitorRates')}</Label>
              <Textarea
                id="competitorRates"
                name="competitorRates"
                placeholder={t('pricing.competitorRatesPlaceholder')}
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
            <CardTitle className="font-headline">{t('pricing.aiSuggestion')}</CardTitle>
            <CardDescription>{t('pricing.aiSuggestionDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            {state.data ? (
              <div className="space-y-6">
                <div className="text-center">
                    <p className="text-muted-foreground">{t('pricing.suggestedPrice')}</p>
                    <p className="text-6xl font-bold text-primary">
                        {formatCurrency(
                            currency === 'IDR' ? state.data.suggestedPrice * 15000 : state.data.suggestedPrice,
                            currency
                        )}
                    </p>
                </div>
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle className="font-headline">{t('pricing.reasoning')}</AlertTitle>
                    <AlertDescription>
                        {state.data.reasoning}
                    </AlertDescription>
                </Alert>
              </div>
            ) : (
                 <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed">
                    <div className="text-center">
                        <p className="text-muted-foreground">{t('pricing.suggestionPlaceholder')}</p>
                    </div>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
