'use client'

import { app, db } from "@/config/firebase";
import { getAuth, onAuthStateChanged, User, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Reports = () => {
  const [user, setUser] = useState<User | null>(null);
  const [reports, setReports] = useState<DocumentData[]>([]);   

  useEffect(() => {
    if (!user?.uid) {
        return
    }
    const q = query(collection(db, "reports"), where("userId", "==", user.uid));
    const fetchReports = async () => {
        const querySnapshot = await getDocs(q);
        setReports(querySnapshot.docs.map((doc) => doc.data()));    
    }
    fetchReports();
  }, [user]);
  const router = useRouter();
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user", user.uid);
        setUser(user);
      } else {
        setUser(null);
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl mt-4 ">Reports</h1>
      <p className="mt-4 mb-2 font-light">Reports filed by {user?.email}</p>
      <p className="">Total Reports: {reports?.length}</p>
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
          className="p-2 rounded-lg bg-red-200"
        >Sign out </button>
        <button className="p-2 border rounded-lg ml-2" onClick={() => router.push('/')}>Home</button>

        {/* table for reports */}
        <table className="table-fixed w-full mt-2 rounded-sm">
            <thead className="border bg-red-300 text-red-900 font-thin">
                <tr>
                <th className="border">License Plate</th>
                <th className="border">Location</th>
                <th className="border">Date</th>
                </tr>
            </thead>
            <tbody className="border">
                {reports.map((report, index) => (
                    <tr key={index}>
                        <td className="border text-center">{report.licensePlate}</td>
                        <td className="border text-center">{report.location}</td>
                        <td className="border text-center">{new Date(report.datetime).toString()}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
  );
};
export default Reports;
