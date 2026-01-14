"use client";

import { useTranslation } from "react-i18next";

import { Button } from "@/components/base/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/base/card";
import { Input } from "@/components/base/input";
import { Label } from "@/components/base/label";
import { Separator } from "@/components/base/separator";
import {
  AppleIcon,
  FacebookIcon,
  GithubIcon,
  GoogleIcon,
  MicrosoftIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";

type LoginProvider = "google" | "github" | "apple" | "microsoft" | "facebook";

interface LoginFormProps {
  /** Callback when form is submitted with email and password */
  onSubmit?: (email: string, password: string) => void;
  /** Callback when a social provider login button is clicked */
  onProviderLogin?: (provider: LoginProvider) => void;
  /** Callback when forgot password link is clicked */
  onForgotPassword?: () => void;
  /** Callback when sign up link is clicked */
  onSignUp?: () => void;
  /** Social login providers to display */
  providers?: LoginProvider[];
  /** Show the forgot password link */
  showForgotPassword?: boolean;
  /** Show the sign up link */
  showSignUp?: boolean;
  /** Custom title for the login form */
  title?: string;
  /** Custom description for the login form */
  description?: string;
  /** Loading state for the submit button */
  isLoading?: boolean;
  /** Additional class name for the card container */
  className?: string;
}

const providerIcons: Record<LoginProvider, React.ReactNode> = {
  google: <GoogleIcon className="size-4 p-0" />,
  github: <GithubIcon className="size-4 p-0" />,
  apple: <AppleIcon className="size-4 p-0" />,
  microsoft: <MicrosoftIcon className="size-4 p-0" />,
  facebook: <FacebookIcon className="size-4 p-0" />,
};

function LoginForm({
  onSubmit,
  onProviderLogin,
  onForgotPassword,
  onSignUp,
  providers = [],
  showForgotPassword = true,
  showSignUp = true,
  title,
  description,
  isLoading = false,
  className,
}: LoginFormProps) {
  const { t } = useTranslation("ui");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email, password);
  };

  const displayTitle = title ?? t("loginForm.title");
  const displayDescription = description ?? t("loginForm.description");

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{displayTitle}</CardTitle>
        <CardDescription>{displayDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="login-email">{t("loginForm.email")}</Label>
              <Input
                id="login-email"
                type="email"
                placeholder={t("loginForm.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="login-password">
                  {t("loginForm.password")}
                </Label>
                {showForgotPassword && (
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-muted-foreground hover:text-primary ml-auto text-sm underline-offset-4 hover:underline"
                    disabled={isLoading}
                  >
                    {t("loginForm.forgotPassword")}
                  </button>
                )}
              </div>
              <Input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t("loginForm.loggingIn") : t("loginForm.login")}
            </Button>
            {providers.length > 0 && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card text-muted-foreground px-2">
                      {t("loginForm.orContinueWith")}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {providers.map((provider) => (
                    <Button
                      key={provider}
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => onProviderLogin?.(provider)}
                      disabled={isLoading}
                    >
                      {providerIcons[provider]}
                      {t(`loginForm.providers.${provider}`)}
                    </Button>
                  ))}
                </div>
              </>
            )}
          </div>
        </form>
      </CardContent>
      {showSignUp && (
        <CardFooter className="justify-center">
          <p className="text-muted-foreground text-sm">
            {t("loginForm.noAccount")}{" "}
            <button
              type="button"
              onClick={onSignUp}
              className="text-primary underline-offset-4 hover:underline"
              disabled={isLoading}
            >
              {t("loginForm.signUp")}
            </button>
          </p>
        </CardFooter>
      )}
    </Card>
  );
}

export { LoginForm, type LoginFormProps, type LoginProvider };
