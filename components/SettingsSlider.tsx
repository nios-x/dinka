"use client";

import React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Settings, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function SettingsSlider() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Settings className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                    <SheetTitle>Settings</SheetTitle>
                    <SheetDescription>
                        Customize your experience on Dinka.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label>Dark Mode</Label>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Switch between light and dark themes.
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            {theme === "dark" ? (
                                <Sun className="h-5 w-5" />
                            ) : (
                                <Moon className="h-5 w-5" />
                            )}
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <Label>Account</Label>
                        <div className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start text-sm">Profile Settings</Button>
                            <Button variant="ghost" className="w-full justify-start text-sm">Privacy</Button>
                            <Button variant="ghost" className="w-full justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">Logout</Button>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
