"use client";
import { useActionState } from "react";
import { signin } from "@/app/actions/auth-actions";
import Loader from "@/components/loader";

export default function LoginPage() {
  const [formState, formAction, isPending] = useActionState(signin, {});

  return (
    <div className="max-w-md mx-auto bg-white mt-16 p-8 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form action={formAction} className="space-y-4">
        <div>
          <label htmlFor="username" className="block font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {formState.errors && (
          <ul className="text-sm">
            {Object.keys(formState.errors).map((error) => (
              <li key={error} className="text-red-500">{formState.errors[error]}</li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader />
              <span className="ml-2">Signing In...</span>
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  )
}
