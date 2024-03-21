"use client";
import { app, db } from "@/config/firebase";
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

const Plate = () => {
  const [user, setUser] = useState<User | null>(null);
  const [plate, setPlate] = useState<string>("");
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  const handlePlate = async () => {
    if (!user) {
          console.log("user not logged in");
          return;
    }
    const q = query(
      collection(db, "reports"),
      where("licensePlate", "==", plate.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size === 0) {     
      console.log("No matching documents.");
    }
    setReports(querySnapshot.docs.map((doc) => doc.data()));
  };

  return (
    <>
      <div>
        <h1 className="text-xl text-black">Search Reports by Vehicle</h1>
        <input
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
          type="text"
          placeholder="Enter Vehicle Plate Number"
          className="border-2 border-black"
        />
        <button onClick={handlePlate} className="bg-black text-white">
          Search
        </button>
        <div>
          {reports.length === 0 && <p>No reports found</p>}
          {reports.length > 0 && <p>total reports: {reports.length}</p>}
          {reports.map((report, index) => {
            return (
              <div key={index} className="border-2 border-black p-2 m-2">
                <p>Plate: {report.licensePlate}</p>
                <p>Location: {report.location}</p>
                <p>Time: {new Date(report.datetime).toString()}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Plate;
