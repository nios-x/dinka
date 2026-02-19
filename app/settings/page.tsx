"use client";

import React, { useState } from "react";
import {
    User,
    Shield,
    Bell,
    LogOut,
    ChevronRight,
    Upload,
    Mail,
    Lock,
    Smartphone
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const { data: session, update } = useSession();
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        name: "",
        bio: "",
        image: ""
    });

    React.useEffect(() => {
        if (session?.user) {
            setUserData(prev => ({ ...prev, name: session.user?.name || "", image: session.user?.image || "" }));
            // Fetch bio from API
            fetch("/api/v1/getuserdetails", {
                method: "POST",
                body: JSON.stringify({ id: (session.user as any).id })
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.user?.bio) {
                        setUserData(prev => ({ ...prev, bio: data.user.bio }));
                    }
                })
                .catch(err => console.error("Failed to fetch user details", err));
        }
    }, [session]);

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "account", label: "Account", icon: Lock },
        { id: "notifications", label: "Notifications", icon: Bell },
    ];

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/v1/user/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            if (res.ok) {
                const data = await res.json();
                await update({ ...session, user: { ...session?.user, name: userData.name } });
                toast.success("Settings saved successfully");
            } else {
                toast.error("Failed to save settings");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

        setLoading(true);
        try {
            const res = await fetch("/api/v1/user/delete", {
                method: "DELETE"
            });

            if (res.ok) {
                toast.success("Account deleted successfully");
                signOut();
            } else {
                toast.error("Failed to delete account");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">Settings</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <nav className="w-full md:w-64 flex-shrink-0 sticky top-24 z-10 self-start">
                        <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-2 shadow-sm border border-zinc-100 dark:border-zinc-800/50 flex md:flex-col overflow-x-auto md:overflow-visible gap-2 md:gap-0 scrollbar-hide">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={cn(
                                        "flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap",
                                        activeTab === tab.id
                                            ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm"
                                            : "text-zinc-500 dark:text-zinc-400 hover:bg-white/50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-200"
                                    )}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                                    )}
                                </button>
                            ))}
                            <div className="hidden md:block my-2 border-t border-zinc-100 dark:border-zinc-800/50" />
                            <button
                                onClick={() => signOut()}
                                className="hidden md:flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                                Sign Out
                            </button>
                        </div>
                        {/* Mobile-only Logout (below tabs or somewhere else? Maybe just keep it in the list if space permits, but scrolling horizontal is fine). Re-adding it to the scrollable list for mobile might be tricky if mixed with tabs. Let's keep it hidden on mobile nav and add it to the bottom of the page content or assume user uses the slider/navbar for logout?
                         Actually, the user can logout from the navbar slider. This settings page is another way.
                         Let's just keep it hidden from the top nav on mobile to save space, or add it to the account tab?
                         Let's hide it on mobile nav and rely on the Account tab's "Delete Account" / add a logout there, or rely on Navbar.
                         Or, just make it the last item in the scrollable list.
                         */}
                    </nav>

                    {/* Content Area */}
                    <div className="flex-1">
                        <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-sm border border-zinc-100 dark:border-zinc-800/50">

                            {/* Profile Settings */}
                            {activeTab === "profile" && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center gap-6">
                                        <div className="relative group cursor-pointer">
                                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-zinc-100 dark:border-zinc-800">
                                                <Image
                                                    src={session?.user?.image || "https://imgs.search.brave.com/iiL6FIsWn1W2fHExlUdzmEXVolOVkj4jfy06SrdfTf8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/LnZlY3RvcnN0b2Nr/LmNvbS9pL3RodW1i/LWxhcmdlLzk3Lzcw/L3B1cnBsZS11c2Vy/LWljb24taW4tdGhl/LWNpcmNsZS1hLXNv/bGlkLWdyYWRpZW50/LXZlY3Rvci0yMzUx/OTc3MC5qcGc"}
                                                    alt="Profile"
                                                    width={96}
                                                    height={96}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Upload className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                                {session?.user?.name || "User"}
                                            </h2>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                                {session?.user?.email || "user@example.com"}
                                            </p>
                                            <Button variant="outline" size="sm" className="mt-2 h-8">
                                                Change Picture
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="name">Display Name</Label>
                                            <Input
                                                id="name"
                                                value={userData.name}
                                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                                className="max-w-md bg-zinc-50 dark:bg-zinc-950/50"
                                            />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            <textarea
                                                id="bio"
                                                value={userData.bio}
                                                onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                                                className="flex min-h-[100px] w-full max-w-md rounded-md border border-input bg-zinc-50 dark:bg-zinc-950/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Tell us about yourself..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Account Settings */}
                            {activeTab === "account" && (
                                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2">
                                            <Mail className="w-5 h-5 text-zinc-500" />
                                            Email Address
                                        </h3>
                                        <div className="max-w-md space-y-2">
                                            <Input
                                                disabled
                                                defaultValue={session?.user?.email || ""}
                                                className="bg-zinc-100 dark:bg-zinc-800"
                                            />
                                            <p className="text-xs text-zinc-500">
                                                Your email address is managed through your login provider.
                                            </p>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-red-500 flex items-center gap-2">
                                            <Shield className="w-5 h-5" />
                                            Danger Zone
                                        </h3>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                            Once you delete your account, there is no going back. Please be certain.
                                        </p>
                                        <div className="flex flex-col gap-3">
                                            <Button variant="outline" onClick={() => signOut()} className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 md:hidden">
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Log Out
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                className="w-full justify-start"
                                                onClick={handleDelete}
                                                disabled={loading}
                                            >
                                                {loading ? "Deleting..." : "Delete Account"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Notifications */}
                            {activeTab === "notifications" && (
                                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Push Notifications</Label>
                                            <p className="text-sm text-zinc-500">
                                                Receive notifications on your device
                                            </p>
                                        </div>
                                        <Switch />
                                    </div>
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Email Notifications</Label>
                                            <p className="text-sm text-zinc-500">
                                                Receive daily summaries and updates
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
                                <Button
                                    onClick={handleSave}
                                    className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                                    disabled={loading}
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
