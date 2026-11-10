import React, { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  UserRound,
  LockKeyhole,
  Save,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  Mail,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import { updateUserProfile, changeUserPassword } from "../services/authService";

const inputClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10";

const labelClass = "text-sm font-medium text-white/70";

const Settings = () => {
  const { user, setUser } = useAuth();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [profileMessage, setProfileMessage] = useState(null);
  const [passwordMessage, setPasswordMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    setProfileMessage(null);
    setProfileLoading(true);

    try {
      const data = await updateUserProfile(profile);

      setUser(data.user);

      setProfileMessage({
        type: "success",
        text: data.message || "Profile updated successfully.",
      });
    } catch (error) {
      setProfileMessage({
        type: "error",
        text: error.message || "Unable to update your profile.",
      });
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    setPasswordMessage(null);

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordMessage({
        type: "error",
        text: "New password and confirmation do not match.",
      });
      return;
    }

    if (passwords.newPassword.length < 6) {
      setPasswordMessage({
        type: "error",
        text: "New password must contain at least 6 characters.",
      });
      return;
    }

    setPasswordLoading(true);

    try {
      const data = await changeUserPassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setPasswordMessage({
        type: "success",
        text: data.message || "Password changed successfully.",
      });
    } catch (error) {
      setPasswordMessage({
        type: "error",
        text: error.message || "Unable to change your password.",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const Message = ({ message }) => {
    if (!message) return null;

    const isSuccess = message.type === "success";

    return (
      <div
        role="alert"
        className={`mt-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
          isSuccess
            ? "border-green-500/20 bg-green-500/10 text-green-400"
            : "border-red-500/20 bg-red-500/10 text-red-400"
        }`}
      >
        {isSuccess ? (
          <CheckCircle2 className="size-4 shrink-0" />
        ) : (
          <AlertCircle className="size-4 shrink-0" />
        )}

        {message.text}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl p-6 lg:p-10">
      {/* Page heading */}
      <div>
        <p className="text-sm text-purple-400">PREFERENCES</p>

        <h2 className="mt-2 text-3xl font-semibold">Settings</h2>

        <p className="mt-3 text-sm text-white/40">
          Manage your Nexora account and security preferences.
        </p>
      </div>

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        {/* Profile settings */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-purple-500/10">
              <UserRound className="size-5 text-purple-400" />
            </div>

            <div>
              <h3 className="font-semibold">Profile information</h3>
              <p className="mt-1 text-xs text-white/40">
                Update your personal account details.
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className={labelClass}>
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleProfileChange}
                placeholder="Your full name"
                className={inputClass}
                required
                maxLength={80}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-white/30" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  placeholder="you@example.com"
                  className={`${inputClass} pl-11`}
                  required
                />
              </div>
            </div>

            <Message message={profileMessage} />

            <button
              type="submit"
              disabled={profileLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-medium transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {profileLoading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}

              {profileLoading ? "Saving changes..." : "Save profile"}
            </button>
          </form>
        </section>

        {/* Password settings */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-purple-500/10">
              <LockKeyhole className="size-5 text-purple-400" />
            </div>

            <div>
              <h3 className="font-semibold">Password and security</h3>
              <p className="mt-1 text-xs text-white/40">
                Keep your Nexora account secure.
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="currentPassword" className={labelClass}>
                Current password
              </label>

              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter current password"
                className={inputClass}
                autoComplete="current-password"
                required
              />
            </div>

            <div>
              <label htmlFor="newPassword" className={labelClass}>
                New password
              </label>

              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                className={inputClass}
                autoComplete="new-password"
                minLength={6}
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm new password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                className={inputClass}
                autoComplete="new-password"
                minLength={6}
                required
              />
            </div>

            <Message message={passwordMessage} />

            <button
              type="submit"
              disabled={passwordLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-medium transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {passwordLoading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : (
                <LockKeyhole className="size-4" />
              )}

              {passwordLoading ? "Updating password..." : "Change password"}
            </button>
          </form>
        </section>
      </div>

      {/* Account information */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <div className="flex items-center gap-3">
          <SettingsIcon className="size-5 text-white/40" />

          <div>
            <p className="text-sm font-medium">Nexora account</p>
            <p className="mt-1 text-xs text-white/40">
              Your account information is securely managed through Nexora
              authentication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
