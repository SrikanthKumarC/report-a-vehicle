"use client";
import React, { useState } from "react";
import { app } from "@/config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth(app);

  const handleSignUp = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("user", user, userCredential);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", errorCode, errorMessage);
        // ..
      });
    console.log("sign up", email, password);
  };

  return (
    <div className="flex flex-col max-w-sm mx-auto gap-2 mt-2">
      <h1 className="text-xl uppercase">Sign Up</h1>
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
      <button onClick={handleSignUp} className="border-2 p-2 rounded-md">
        Sign Up
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
