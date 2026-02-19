"use client";

import React from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet";
import { Settings, Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

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
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl border-zinc-200/50 dark:border-zinc-800/50">
                <SheetHeader>
                    <SheetTitle>Settings</SheetTitle>
                    <SheetDescription className="text-zinc-500 dark:text-zinc-400">
                        Customize your experience on Dinka.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-0 space-y-6">
                    <div className="flex items-center justify-between pr-10">
                        <div className="space-y-0.5 px-7">
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

                    <div className="space-y-4 p-6">
                        <Label>Account</Label>
                        <div className="space-y-2">
                            <SheetClose asChild>
                                <Link href="/settings">
                                    <Button variant="ghost" className="w-full justify-start text-sm">Profile Settings</Button>
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href="/settings">
                                    <Button variant="ghost" className="w-full justify-start text-sm">Privacy</Button>
                                </Link>
                            </SheetClose>
                            <Button
                                variant="ghost"
                                className="w-full justify-start text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                                onClick={() => signOut()}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
