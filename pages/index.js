import Head from 'next/head'
import Link from 'next/link'
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from '../components/AuthProvider'

export default function Home() {
  const auth = getAuth();
  const { user } = useAuth();
  console.log(user);
  return (
    <div>
      <Head>
        <title>Next.js with Firebase</title>
      </Head>
      <main>
        {
          user ? (
            <button
              type="button"
              onClick={() => {
                signOut(auth).catch((err) => {
                  console.log(err);
                })
              }}
            >
              Logout
            </button>
          ) : (
            <p>Try the <Link href="/login"><a>login</a></Link> page</p>
          )
        }
        <p>User: {user ? user.uid : "None"}</p>
      </main>
    </div>
  )
}
