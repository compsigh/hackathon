import { Form } from "react-router";
import type { Route } from "./+types/_admin.users";
import { db } from "~/db/db.server";
import { user } from "~/db/schema.server";
import { eq } from "drizzle-orm";

export async function loader({}: Route.LoaderArgs) {
  const users = await db
    .select({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      registrationComplete: user.registrationComplete,
      graduationYear: user.graduationYear,
      createdAt: user.createdAt,
    })
    .from(user)
    .orderBy(user.createdAt);

  return { users };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = String(formData.get("intent"));

  switch (intent) {
    case "set-role": {
      const userId = String(formData.get("userId"));
      const role = String(formData.get("role")) as "user" | "admin";
      await db.update(user).set({ role }).where(eq(user.id, userId));
      return { success: true };
    }
    case "delete-user": {
      const userId = String(formData.get("userId"));
      await db.delete(user).where(eq(user.id, userId));
      return { success: true };
    }
    default:
      return { error: "Unknown action" };
  }
}

export default function AdminUsersPage({ loaderData }: Route.ComponentProps) {
  const { users } = loaderData;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Users ({users.length})</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-(--color-light-10)">
              <th className="px-4 py-3 font-medium text-(--color-light-50)">Name</th>
              <th className="px-4 py-3 font-medium text-(--color-light-50)">Email</th>
              <th className="px-4 py-3 font-medium text-(--color-light-50)">Role</th>
              <th className="px-4 py-3 font-medium text-(--color-light-50)">Registered</th>
              <th className="px-4 py-3 font-medium text-(--color-light-50)">Grad Year</th>
              <th className="px-4 py-3 font-medium text-(--color-light-50)">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-(--color-light-10)">
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3 text-(--color-light-50)">{u.email}</td>
                <td className="px-4 py-3">
                  <Form method="post" className="inline">
                    <input type="hidden" name="intent" value="set-role" />
                    <input type="hidden" name="userId" value={u.id} />
                    <input
                      type="hidden"
                      name="role"
                      value={u.role === "admin" ? "user" : "admin"}
                    />
                    <button
                      type="submit"
                      className={`cursor-pointer rounded px-2 py-0.5 text-xs ${
                        u.role === "admin"
                          ? "bg-(--color-compsigh)/20 text-(--color-compsigh)"
                          : "bg-(--color-light-10) text-(--color-light-50)"
                      }`}
                    >
                      {u.role}
                    </button>
                  </Form>
                </td>
                <td className="px-4 py-3">
                  {u.registrationComplete ? (
                    <span className="text-green-400">Yes</span>
                  ) : (
                    <span className="text-(--color-light-50)">No</span>
                  )}
                </td>
                <td className="px-4 py-3 text-(--color-light-50)">
                  {u.graduationYear ?? "—"}
                </td>
                <td className="px-4 py-3">
                  <Form method="post" className="inline">
                    <input type="hidden" name="intent" value="delete-user" />
                    <input type="hidden" name="userId" value={u.id} />
                    <button
                      type="submit"
                      className="cursor-pointer text-xs text-red-400 hover:underline"
                      onClick={(e) => {
                        if (!confirm("Delete this user?")) e.preventDefault();
                      }}
                    >
                      Delete
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
