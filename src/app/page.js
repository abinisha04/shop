"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { listenForNotifications } from "@/lib/firebase";

export default function ShopHome() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("shopEmail")) {
      router.push("/login");
      return;
    }

    fetchUsers();

    let unsubscribe;

    listenForNotifications((payload) => {
      alert(
        payload.notification?.title +
        ": " +
        payload.notification?.body
      );
    }).then((fn) => {
      unsubscribe = fn;
    });

    return () => unsubscribe?.();
  }, []);

  async function fetchUsers() {
    const response = await fetch("/api/users");
    const data = await response.json();

    setUsers(data);
  }

  async function sendNotification(status) {
    if (!selectedUser) {
      alert("Please select a user");
      return;
    }

    const response = await fetch("/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: selectedUser,
        status,
      }),
    });

    const data = await response.json();

    alert(data.message);
  }

  return (
    <div>
      <h1>Shop Home</h1>

      <h3>Registered Users</h3>

      {users.map((user) => (
        <div key={user.email}>
          <label>
            <input
              type="radio"
              name="user"
              value={user.email}
              checked={selectedUser === user.email}
              onChange={() => setSelectedUser(user.email)}
            />

            {user.name} - {user.email}
          </label>
        </div>
      ))}

      <br />

      <button onClick={() => sendNotification("Confirm")}>
        Confirm
      </button> <br/>

      <button onClick={() => sendNotification("Cancel")}>
        Cancel
      </button><br/>

      <button onClick={() => sendNotification("Done")}>
        Done
      </button><br/>
    </div>
  );
}