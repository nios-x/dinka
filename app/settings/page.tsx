"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { toast } from "sonner";
import {
  User,
  Palette,
  Shield,
  VolumeX,
  LogOut,
  Camera,
  Loader2,
  Monitor,
  Moon,
  Sun,
  Trash2,
  AtSign,
  MapPin,
  Link as LinkIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import PageHeader from "@/components/shell/PageHeader";
import MutedAccounts from "@/components/settings/MutedAccounts";
import { Avatar } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

/**
 * Settings.
 *
 * Three sections on one scrollable page rather than a nested menu — there is
 * not enough here to justify making people navigate for it. The save button
 * only wakes up once something has actually changed.
 */

type Form = {
  name: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  pronouns: string;
  image: string;
};

const EMPTY: Form = {
  name: "",
  username: "",
  bio: "",
  location: "",
  website: "",
  pronouns: "",
  image: "",
};

export default function Page() {
  const { data: session, update } = useSession();
  const { theme, setTheme } = useTheme();
  const [form, setForm] = React.useState<Form>(EMPTY);
  const [initial, setInitial] = React.useState<Form>(EMPTY);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [provider, setProvider] = React.useState<string | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const me = session?.user as { id?: string; name?: string | null; image?: string | null } | undefined;

  React.useEffect(() => {
    if (!me?.id) return;
    fetch("/api/v1/getuserdetails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: me.id }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d?.user) return;
        const next: Form = {
          name: d.user.name ?? "",
          username: d.user.username ?? "",
          bio: d.user.bio ?? "",
          location: d.user.location ?? "",
          website: d.user.website ?? "",
          pronouns: d.user.pronouns ?? "",
          image: d.user.pic ?? d.user.image ?? "",
        };
        setForm(next);
        setInitial(next);
        setProvider(d.user.provider ?? null);
      })
      .catch(() => toast.error("Could not load your profile"))
      .finally(() => setLoading(false));
  }, [me?.id]);

  const dirty = JSON.stringify(form) !== JSON.stringify(initial);

  const set = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const pickImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Pick an image under 8MB");
      return;
    }

    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/v1/user/upload-image", { method: "POST", body });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error);
      setForm((f) => ({ ...f, image: data.url }));
      toast.success("Picture ready — save to apply it");
    } catch {
      toast.error("Could not upload that image");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/v1/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setInitial(form);
      await update?.({ name: form.name, image: form.image });
      toast.success("Profile saved");
    } catch (err: any) {
      toast.error(err?.message ?? "Could not save those changes");
    } finally {
      setSaving(false);
    }
  };

  const deleteAccount = async () => {
    setConfirmDelete(false);
    try {
      const res = await fetch("/api/v1/user/delete", { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Your account has been deleted");
      await signOut({ callbackUrl: "/" });
    } catch {
      toast.error("Could not delete your account");
    }
  };

  return (
    <>
      <PageHeader
        title="Settings"
        subtitle="Your profile, appearance and account"
        actions={
          <button
            type="button"
            onClick={save}
            disabled={!dirty || saving}
            className={cn(
              "press flex h-9 items-center gap-1.5 rounded-full px-4 text-[0.82rem] font-semibold transition-colors",
              dirty ? "bg-glaze text-glaze-on hover:bg-glaze-hover" : "bg-tile-sunk text-ink-4"
            )}
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? "Saving" : "Save"}
          </button>
        }
      />

      <div className="space-y-3 p-3 sm:p-4">
        {/* ── Profile ── */}
        <Section icon={<User size={16} />} title="Profile" note="This is what other people see.">
          {loading ? (
            <div className="space-y-3">
              <div className="skeleton h-20 w-20 rounded-full" />
              <div className="skeleton h-10 w-full rounded-[var(--r-field)]" />
              <div className="skeleton h-24 w-full rounded-[var(--r-field)]" />
            </div>
          ) : (
            <>
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <Avatar src={form.image} name={form.name} userId={me?.id} size="2xl" />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    aria-label="Change your picture"
                    className="press absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full bg-glaze text-glaze-on ring-[3px] ring-tile"
                  >
                    {uploading ? <Loader2 size={15} className="animate-spin" /> : <Camera size={15} />}
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={pickImage}
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[1rem] font-semibold text-ink">{form.name || "Your name"}</p>
                  <p className="meta truncate">{session?.user?.email}</p>
                  {me?.id && (
                    <Link
                      href={`/profile?id=${me.id}`}
                      className="mt-1 inline-block text-[0.8rem] font-medium text-glaze hover:underline dark:text-teal"
                    >
                      View your profile
                    </Link>
                  )}
                </div>
              </div>

              <Field label="Display name" htmlFor="name">
                <input
                  id="name"
                  value={form.name}
                  onChange={set("name")}
                  maxLength={50}
                  placeholder="What people should call you"
                  className={inputClass}
                />
              </Field>

              <Field label="Handle" htmlFor="username" hint="Letters, numbers, dots and underscores.">
                <span className="relative block">
                  <AtSign
                    size={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3"
                  />
                  <input
                    id="username"
                    value={form.username}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, username: e.target.value.replace(/[^a-zA-Z0-9_.]/g, "") }))
                    }
                    maxLength={32}
                    placeholder="yourhandle"
                    className={cn(inputClass, "pl-9")}
                  />
                </span>
              </Field>

              <Field label="Bio" htmlFor="bio" hint={`${form.bio.length}/300`}>
                <textarea
                  id="bio"
                  value={form.bio}
                  onChange={set("bio")}
                  maxLength={300}
                  rows={3}
                  placeholder="A line or two about you"
                  className={cn(inputClass, "h-auto resize-y py-2.5 leading-relaxed")}
                />
              </Field>

              <div className="grid gap-3 sm:grid-cols-2">
                <Field label="Location" htmlFor="location">
                  <span className="relative block">
                    <MapPin
                      size={15}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3"
                    />
                    <input
                      id="location"
                      value={form.location}
                      onChange={set("location")}
                      maxLength={60}
                      placeholder="Where you are"
                      className={cn(inputClass, "pl-9")}
                    />
                  </span>
                </Field>

                <Field label="Pronouns" htmlFor="pronouns">
                  <input
                    id="pronouns"
                    value={form.pronouns}
                    onChange={set("pronouns")}
                    maxLength={30}
                    placeholder="they/them"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Website" htmlFor="website">
                <span className="relative block">
                  <LinkIcon
                    size={15}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-3"
                  />
                  <input
                    id="website"
                    value={form.website}
                    onChange={set("website")}
                    maxLength={200}
                    inputMode="url"
                    placeholder="yoursite.com"
                    className={cn(inputClass, "pl-9")}
                  />
                </span>
              </Field>
            </>
          )}
        </Section>

        {/* ── Appearance ── */}
        <Section icon={<Palette size={16} />} title="Appearance" note="Applies on this device.">
          <div className="grid grid-cols-3 gap-2">
            {[
              { key: "light", label: "Light", Icon: Sun },
              { key: "dark", label: "Dark", Icon: Moon },
              { key: "system", label: "System", Icon: Monitor },
            ].map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setTheme(opt.key)}
                aria-pressed={theme === opt.key}
                className={cn(
                  "press flex flex-col items-center gap-2 rounded-[var(--r-field)] border py-4 text-[0.82rem] font-semibold transition-colors",
                  theme === opt.key
                    ? "border-glaze bg-glaze-softer text-ink"
                    : "border-line text-ink-2 hover:border-line-strong"
                )}
              >
                <opt.Icon size={19} />
                {opt.label}
              </button>
            ))}
          </div>
        </Section>

        {/* ── Muted ── */}
        <Section
          icon={<VolumeX size={16} />}
          title="Muted accounts"
          note="Their posts stay out of your feed. They are never told."
        >
          <MutedAccounts />
        </Section>

        {/* ── Account ── */}
        <Section icon={<Shield size={16} />} title="Account">
          <div className="space-y-1">
            <Row label="Email" value={session?.user?.email ?? "—"} />
            <Row
              label="Signed in with"
              value={
                provider === "Google"
                  ? "Google"
                  : provider === "Email"
                    ? "Email and password"
                    : "—"
              }
            />
          </div>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="press mt-2 flex w-full items-center gap-2.5 rounded-[var(--r-field)] px-3.5 py-3 text-left text-[0.9rem] font-semibold text-ink transition-colors hover:bg-tile-sunk"
          >
            <LogOut size={16} />
            Sign out
          </button>

          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="press flex w-full items-center gap-2.5 rounded-[var(--r-field)] px-3.5 py-3 text-left text-[0.9rem] font-semibold text-ember transition-colors hover:bg-ember-soft"
          >
            <Trash2 size={16} />
            Delete account
          </button>
        </Section>
      </div>

      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              Your posts, messages, stories and followers are removed permanently. This cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep my account</AlertDialogCancel>
            <AlertDialogAction onClick={deleteAccount} className="bg-ember text-white hover:bg-ember/90">
              Delete everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const inputClass =
  "h-11 w-full rounded-[var(--r-field)] border border-line bg-tile px-3.5 text-[0.9rem] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-glaze";

function Section({
  icon,
  title,
  note,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="tile p-4">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-tile-sunk text-ink-2">
          {icon}
        </span>
        <div className="min-w-0">
          <h2 className="text-[1rem] font-semibold text-ink">{title}</h2>
          {note && <p className="meta">{note}</p>}
        </div>
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <label htmlFor={htmlFor} className="text-[0.82rem] font-semibold text-ink-2">
          {label}
        </label>
        {hint && <span className="meta">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[var(--r-field)] px-3.5 py-2.5">
      <span className="text-[0.875rem] text-ink-2">{label}</span>
      <span className="min-w-0 truncate text-[0.875rem] font-medium text-ink">{value}</span>
    </div>
  );
}
