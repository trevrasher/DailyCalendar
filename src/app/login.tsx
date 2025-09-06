import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
	const { data: session } = useSession();

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
			<h2>Login</h2>
			{session ? (
				<>
					<p>Signed in as {session.user?.email}</p>
					<button onClick={() => signOut()}>Sign out</button>
				</>
			) : (
				<>
					<button onClick={() => signIn('google')}>Sign in with Google</button>
				</>
			)}
		</div>
	);
}
