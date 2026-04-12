"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Camera, Loader2, Lock, Save, User } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "@/components/dashboard/PageHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  DASHBOARD_PROFILE_STORAGE_KEY,
  PROFILE_UPDATED_EVENT,
  defaultDashboardProfile,
  initialsFromName,
  readStoredDashboardProfile,
  type StoredDashboardProfile,
} from "@/lib/dashboard-profile-storage";

export default function ProfileView() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formId = useId();

  const [fullName, setFullName] = useState(defaultDashboardProfile.fullName);
  const [email, setEmail] = useState(defaultDashboardProfile.email);
  const [phone, setPhone] = useState(defaultDashboardProfile.phone);
  const [role, setRole] = useState(defaultDashboardProfile.role);
  const [department, setDepartment] = useState(defaultDashboardProfile.department);
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    const parsed = readStoredDashboardProfile();
    if (!parsed) return;
    setFullName(parsed.fullName);
    setEmail(parsed.email);
    setPhone(parsed.phone);
    setRole(parsed.role);
    setDepartment(parsed.department);
    setAvatarDataUrl(parsed.avatarDataUrl);
  }, []);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be 2MB or smaller.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") setAvatarDataUrl(result);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }, []);

  const saveProfile = async () => {
    setSavingProfile(true);
    const payload: StoredDashboardProfile = {
      fullName: fullName.trim() || defaultDashboardProfile.fullName,
      email: email.trim() || defaultDashboardProfile.email,
      phone: phone.trim(),
      role: role.trim() || defaultDashboardProfile.role,
      department: department.trim(),
      avatarDataUrl,
    };
    try {
      localStorage.setItem(
        DASHBOARD_PROFILE_STORAGE_KEY,
        JSON.stringify(payload),
      );
      window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT));
      await new Promise((r) => setTimeout(r, 200));
      toast.success("Profile saved.");
    } catch {
      toast.error("Could not save profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const updatePassword = async () => {
    if (!newPassword && !confirmPassword) {
      toast.info("Enter a new password to update.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setSavingPassword(true);
    try {
      await new Promise((r) => setTimeout(r, 300));
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated locally. Connect an API to persist.");
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="min-w-0 space-y-6 md:space-y-6">
      <PageHeader
        title="Profile"
        description="Your account details and security preferences"
      />

      <div className="grid min-w-0 gap-6 md:gap-5 lg:grid-cols-[minmax(0,260px)_1fr]">
        <Card className="h-fit min-w-0 border-border/80 bg-background shadow-sm">
          <CardHeader className="text-center md:py-4">
            <div className="mx-auto flex flex-col items-center gap-4 md:gap-3">
              <Avatar className="h-28 w-28 border-2 border-border text-2xl md:h-24 md:w-24 md:text-xl">
                {avatarDataUrl ? (
                  <AvatarImage src={avatarDataUrl} alt="" />
                ) : null}
                <AvatarFallback className="bg-muted font-heading text-2xl font-semibold md:text-xl">
                  {initialsFromName(fullName)}
                </AvatarFallback>
              </Avatar>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="sr-only"
                onChange={handleFile}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="h-4 w-4" />
                Upload photo
              </Button>
              <p className="text-xs text-muted-foreground">
                JPG, PNG, WebP or GIF · max 2MB
              </p>
            </div>
            <Separator className="my-2" />
            <CardTitle className="font-heading text-lg">{fullName}</CardTitle>
            <CardDescription>{role}</CardDescription>
          </CardHeader>
        </Card>

        <div className="space-y-6">
          <Card className="border-border/80 bg-background shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="font-heading text-lg">
                  Personal information
                </CardTitle>
              </div>
              <CardDescription>
                Update how you appear in the dashboard and in communications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor={`${formId}-name`}>Full name</Label>
                  <Input
                    id={`${formId}-name`}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${formId}-email`}>Email</Label>
                  <Input
                    id={`${formId}-email`}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${formId}-phone`}>Phone</Label>
                  <Input
                    id={`${formId}-phone`}
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${formId}-role`}>Role</Label>
                  <Input
                    id={`${formId}-role`}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${formId}-dept`}>Department</Label>
                  <Input
                    id={`${formId}-dept`}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  type="button"
                  onClick={saveProfile}
                  disabled={savingProfile}
                  className="gap-2"
                >
                  {savingProfile ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/80 bg-background shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="font-heading text-lg">Security</CardTitle>
              </div>
              <CardDescription>
                Set a new password. This demo only validates locally until an API
                is connected.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor={`${formId}-pw1`}>New password</Label>
                  <Input
                    id={`${formId}-pw1`}
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${formId}-pw2`}>Confirm password</Label>
                  <Input
                    id={`${formId}-pw2`}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={updatePassword}
                  disabled={savingPassword}
                  className="gap-2"
                >
                  {savingPassword ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Lock className="h-4 w-4" />
                  )}
                  Update password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
