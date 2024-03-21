"use client";
import React, { useState } from "react";
import { app } from "@/config/firebase";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth(app);
  const router = useRouter();

  const handleSignIn = async () => {
   await setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return signInWithEmailAndPassword(auth, email, password);
  }).then(() => {
    // redirect to home
    router.push("/");
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("sign in", errorCode, errorMessage);
  });
  };

  return (
    <div className="flex flex-col max-w-sm mx-auto gap-2 mt-2">
      <Link href="/" className="p-3 m-2 border-2 rounded-lg bg-blue-200" >Home</Link>

      <h1 className="text-xl uppercase">Sign In</h1>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        value={email}
        className="border-2 p-2"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        name="password"
        type="password"
        value={password}
        className="border-2 p-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn} className="border-2 p-2 rounded-md">
        Sign In
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
