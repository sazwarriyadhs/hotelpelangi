'use client';
import { useSettings } from "@/hooks/use-settings";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Landmark } from "lucide-react";

export function CurrencySwitcher() {
    const { currency, setCurrency } = useSettings();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Landmark className="h-5 w-5" />
                    <span className="sr-only">Change currency</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setCurrency('IDR')} disabled={currency === 'IDR'}>
                    IDR
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrency('USD')} disabled={currency === 'USD'}>
                    USD
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
