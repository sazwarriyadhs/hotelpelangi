"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { createRestaurantBookingAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/datepicker";
import { Loader2, CheckCircle, Utensils } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

const initialState = {
  data: null,
  error: null,
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  const { t } = useTranslation();
  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {t("restaurantBooking.submitting")}
        </>
      ) : (
        t("restaurantBooking.submit")
      )}
    </Button>
  );
}

export function RestaurantBookingForm() {
  const [state, formAction] = useActionState(createRestaurantBookingAction, initialState);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const [reservationDate, setReservationDate] = useState<Date>();

  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = 17 + Math.floor(i / 2);
    const minute = (i % 2) * 30;
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  });

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: t('restaurantBooking.error.title'),
        description: t(state.error),
      });
    }
  }, [state.error, toast, t]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center space-y-2">
        <Utensils className="mx-auto h-12 w-12 text-primary" />
        <CardTitle className="text-3xl font-headline">{t('restaurantBooking.title')}</CardTitle>
        <CardDescription>{t('restaurantBooking.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {state.data?.success ? (
          <Alert variant="default" className="bg-green-100 dark:bg-green-900/30 border-green-500">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle className="font-headline text-green-700 dark:text-green-400">{t('restaurantBooking.success.title')}</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
                {t('restaurantBooking.success.message')} <span className="font-bold">{state.data.bookingId}</span>.
            </AlertDescription>
          </Alert>
        ) : (
          <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="guestName">{t('restaurantBooking.guestName')}</Label>
              <Input id="guestName" name="guestName" placeholder={t('restaurantBooking.guestNamePlaceholder')} required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="guests">{t('restaurantBooking.guests')}</Label>
              <Select name="guests" defaultValue="2">
                <SelectTrigger>
                  <SelectValue placeholder={t('restaurantBooking.guestsPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => <SelectItem key={num} value={String(num)}>{num}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="reservationDate">{t('restaurantBooking.reservationDate')}</Label>
                <input type="hidden" name="reservationDate" value={reservationDate?.toISOString()} />
                <DatePicker date={reservationDate} setDate={setReservationDate} placeholder={t('restaurantBooking.reservationDatePlaceholder')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reservationTime">{t('restaurantBooking.reservationTime')}</Label>
              <Select name="reservationTime" required>
                <SelectTrigger>
                  <SelectValue placeholder={t('restaurantBooking.reservationTimePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                    {timeSlots.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="lg:col-span-2 flex items-end">
              <SubmitButton />
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
