import { Form, redirect, useActionData } from "react-router";
import type { Route } from "./+types/register";
import { auth } from "~/lib/auth.server";
import { db } from "~/db/db.server";
import { user } from "~/db/schema.server";
import { eq } from "drizzle-orm";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) throw redirect("/login");

  const [dbUser] = await db
    .select()
    .from(user)
    .where(eq(user.id, session.user.id));
  if (dbUser?.registrationComplete) throw redirect("/dashboard");

  return { user: session.user };
}

export async function action({ request }: Route.ActionArgs) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) throw redirect("/login");

  const formData = await request.formData();
  const firstName = String(formData.get("firstName") ?? "").trim();
  const displayName = String(formData.get("displayName") ?? "").trim();
  const graduationYear = Number(formData.get("graduationYear"));

  if (!firstName) return { error: "First name is required" };
  if (!displayName) return { error: "Display name is required" };
  if (!graduationYear || graduationYear < 2020 || graduationYear > 2035) {
    return { error: "Please enter a valid graduation year" };
  }

  await db
    .update(user)
    .set({
      firstName,
      name: displayName,
      graduationYear,
      registrationComplete: true,
    })
    .where(eq(user.id, session.user.id));

  throw redirect("/dashboard");
}

export default function RegisterPage({ loaderData }: Route.ComponentProps) {
  const actionData = useActionData<typeof action>();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h1 className="font-proto-mono text-4xl font-semibold [text-shadow:0_0_20px_var(--color-compsigh-60)]">
            <span className="animate-[fade_2s_linear_infinite]">&#9654;</span>
            DEPLOY/<span className="text-(--color-compsigh)">25</span>
          </h1>
          <p className="mt-4 text-(--color-light-50)">
            Complete your registration
          </p>
        </div>

        <Form method="post" className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="mb-1 block text-sm text-(--color-light-50)"
            >
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="w-full rounded-lg border border-(--color-light-30) bg-(--color-dark) px-4 py-2 text-(--color-light) outline-none focus:border-(--color-compsigh)"
            />
          </div>
          <div>
            <label
              htmlFor="displayName"
              className="mb-1 block text-sm text-(--color-light-50)"
            >
              Display name
            </label>
            <input
              id="displayName"
              name="displayName"
              type="text"
              required
              defaultValue={loaderData.user.name}
              className="w-full rounded-lg border border-(--color-light-30) bg-(--color-dark) px-4 py-2 text-(--color-light) outline-none focus:border-(--color-compsigh)"
            />
          </div>
          <div>
            <label
              htmlFor="graduationYear"
              className="mb-1 block text-sm text-(--color-light-50)"
            >
              Expected graduation year
            </label>
            <input
              id="graduationYear"
              name="graduationYear"
              type="number"
              min="2020"
              max="2035"
              required
              className="w-full rounded-lg border border-(--color-light-30) bg-(--color-dark) px-4 py-2 text-(--color-light) outline-none focus:border-(--color-compsigh)"
            />
          </div>
          {actionData?.error && (
            <p className="text-sm text-red-400">{actionData.error}</p>
          )}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-(--color-compsigh) px-4 py-2 font-medium text-(--color-dark) transition-opacity hover:opacity-90"
          >
            Complete registration
          </button>
        </Form>
      </div>
    </main>
  );
}
