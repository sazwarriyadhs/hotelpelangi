"use client";

import { useFormStatus } from "react-dom";
import { createBookingAction } from "@/app/actions";
import { useActionState, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/datepicker";
import { Loader2, CheckCircle } from "lucide-react";
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
          {t("booking.submitting")}
        </>
      ) : (
        t("booking.submit")
      )}
    </Button>
  );
}

export function BookingForm() {
  const [state, formAction] = useActionState(createBookingAction, initialState);
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const [checkInDate, setCheckInDate] = useState<Date>();
  const [checkOutDate, setCheckOutDate] = useState<Date>();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: t('booking.error.title'),
        description: t(state.error),
      });
    }
  }, [state.error, toast, t]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline">{t('booking.title')}</CardTitle>
        <CardDescription>{t('booking.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        {state.data?.success ? (
          <Alert variant="default" className="bg-green-100 dark:bg-green-900/30 border-green-500">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle className="font-headline text-green-700 dark:text-green-400">{t('booking.success.title')}</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
                {t('booking.success.message')} <span className="font-bold">{state.data.bookingId}</span>.
            </AlertDescription>
          </Alert>
        ) : (
          <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="guestName">{t('booking.guestName')}</Label>
              <Input id="guestName" name="guestName" placeholder={t('booking.guestNamePlaceholder')} required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="guests">{t('booking.guests')}</Label>
              <Select name="guests" defaultValue="2">
                <SelectTrigger>
                  <SelectValue placeholder={t('booking.guestsPlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6].map(num => <SelectItem key={num} value={String(num)}>{num}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="roomType">{t('booking.roomType')}</Label>
              <Select name="roomType" defaultValue="deluxe">
                <SelectTrigger>
                  <SelectValue placeholder={t('booking.roomTypePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deluxe">{t('booking.roomTypes.deluxe')}</SelectItem>
                  <SelectItem value="family">{t('booking.roomTypes.family')}</SelectItem>
                  <SelectItem value="presidential">{t('booking.roomTypes.presidential')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="checkIn">{t('booking.checkIn')}</Label>
                <input type="hidden" name="checkInDate" value={checkInDate?.toISOString()} />
                <DatePicker date={checkInDate} setDate={setCheckInDate} placeholder={t('booking.checkInPlaceholder')} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="checkOut">{t('booking.checkOut')}</Label>
                <input type="hidden" name="checkOutDate" value={checkOutDate?.toISOString()} />
                <DatePicker date={checkOutDate} setDate={setCheckOutDate} placeholder={t('booking.checkOutPlaceholder')} />
            </div>
            <div className="lg:col-span-3 flex items-end">
              <SubmitButton />
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
