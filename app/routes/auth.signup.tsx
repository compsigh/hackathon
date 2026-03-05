import { Link } from "react-router";
import { authClient } from "~/lib/auth.client";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await authClient.signUp.email({
      name,
      email,
      password,
    });
    if (result.error) {
      setError(result.error.message ?? "Failed to sign up");
      setLoading(false);
    } else {
      window.location.href = "/register";
    }
  }

  async function handleGoogleSignup() {
    setError("");
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/register",
    });
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={handleGoogleSignup}
        className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-(--color-light-30) bg-(--color-light-10) px-4 py-3 transition-colors hover:bg-(--color-light-30)"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-(--color-light-30)" />
        <span className="text-sm text-(--color-light-50)">or</span>
        <div className="h-px flex-1 bg-(--color-light-30)" />
      </div>

      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm text-(--color-light-50)"
          >
            Display name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border border-(--color-light-30) bg-(--color-dark) px-4 py-2 text-(--color-light) outline-none focus:border-(--color-compsigh)"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm text-(--color-light-50)"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border border-(--color-light-30) bg-(--color-dark) px-4 py-2 text-(--color-light) outline-none focus:border-(--color-compsigh)"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm text-(--color-light-50)"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full rounded-lg border border-(--color-light-30) bg-(--color-dark) px-4 py-2 text-(--color-light) outline-none focus:border-(--color-compsigh)"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded-lg bg-(--color-compsigh) px-4 py-2 font-medium text-(--color-dark) transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="text-center text-sm text-(--color-light-50)">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-(--color-compsigh) hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
