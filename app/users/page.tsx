"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface User {
  _id: string;
  telegramId: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(
    []
  );

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/users");

      setUsers(res.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Telegram Users
      </h1>

      <div className="bg-white rounded-xl shadow overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Username
              </th>

              <th className="p-4 text-left">
                Telegram ID
              </th>

              <th className="p-4 text-left">
                Joined
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b"
              >
                <td className="p-4">
                  {user.firstName}{" "}
                  {user.lastName}
                </td>

                <td className="p-4">
                  {user.username || "-"}
                </td>

                <td className="p-4">
                  {user.telegramId}
                </td>

                <td className="p-4">
                  {new Date(
                    user.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}