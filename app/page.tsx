"use client";
import { app, db } from "@/config/firebase";
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    licensePlate: "",
    location: "",
    datetime: "",
  });

       const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //  check if user is logged in
    //  if not redirect to login
    //  if logged in, submit the form
    e.preventDefault();
    if (!user?.uid) {
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "reports"), {
        licensePlate: formData.licensePlate.toLowerCase(),
        location: formData.location,
        datetime: formData.datetime,
        userId: user.uid,
      });
      console.log("Document written with ID: ", docRef.id);
      setFormData({
        licensePlate: "",
        location: "",
        datetime: "",
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user", user.uid);
        setUser(user);
      } else {
        setUser(null);
        console.log("user signed out");
      }
    });

    return () => unsubscribe();
  }, []); 
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl capitalize ">Report a vehicle - Unofficial</h1>
      {user && <h1>Welcome {user.email}</h1>}
      {user ? (
        <div className="flex">
        <button
          onClick={() => {
            const auth = getAuth(app);
            signOut(auth)
              .then(() => {
                setUser(null);
              })
              .catch((error) => {
                console.log("sign out error", error);
              });
          }}
          className="p-2 m-2 rounded-lg bg-red-200"
        >
          Sign out
        </button>
        <Link href={'/reports'} className="bg-blue-200 p-2 m-2 rounded-lg">My Reports</Link>
        
        <Link href={'/searchPlate'} className="bg-blue-200 p-2 m-2 rounded-lg">Search Vehicle Reports</Link>
        </div>
      ) : (
        <div className=" mt-4">
          <Link href="/signin" className="p-3 m-2 rounded-lg bg-blue-200">
            Login
          </Link>{" "}
          or
          <Link href="/signup" className="p-3 m-2 rounded-lg bg-blue-200">
            Signup
          </Link>
        </div>
      )}

      {/* a report driving form with license plate and location and datetime*/}
      <form onSubmit={handleSubmit} className="flex flex-col mt-4 items-center justify-center w-full">
        <input
          type="text"
          placeholder="License Plate"
          required
          className="w-1/2 p-3 m-2 border-2 rounded-lg"
          value={formData.licensePlate}
          onChange={(e) =>
            setFormData({ ...formData, licensePlate: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Location"
          required
          className="w-1/2 p-3 m-2 border-2 rounded-lg"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />
        <input
          type="datetime-local"
          required
          className="w-1/2 p-3 m-2 border-2 rounded-lg"
          value={formData.datetime}
          onChange={(e) =>
            setFormData({ ...formData, datetime: e.target.value })
          }
        />
        <button type="submit" className="w-1/2 p-3 m-2 border-2 rounded-lg">
          Report
        </button>
      </form>
    </main>
  );

        }