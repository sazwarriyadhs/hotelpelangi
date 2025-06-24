'use client';
import { useSettings } from "@/hooks/use-settings";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Languages } from "lucide-react";

export function LanguageSwitcher() {
    const { locale, setLocale } = useSettings();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Languages className="h-5 w-5" />
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLocale('id')} disabled={locale === 'id'}>
                    Bahasa Indonesia
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale('en')} disabled={locale === 'en'}>
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
