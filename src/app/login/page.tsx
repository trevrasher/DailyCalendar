"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
<div className="login-container">
  <h2 className="login-title">Login</h2>
  {session ? (
    <>
      <button className="login-button" onClick={() => signOut()}>Sign out</button>
    </>
  ) : (
    <>
      <button className="login-button" onClick={() => signIn('google')}>Sign in with Google</button>
    </>
  )}
</div>
  );
}