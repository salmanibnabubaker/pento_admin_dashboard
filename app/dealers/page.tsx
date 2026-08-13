"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Dealer {
  _id: string;
  name: string;
  city: string;
  phone: string;
  email: string;
  businessName: string;
  status: string;
}

export default function DealersPage() {
  const [dealers, setDealers] = useState<
    Dealer[]
  >([]);

  useEffect(() => {
    loadDealers();
  }, []);

  const loadDealers = async () => {
    try {
      const res = await api.get("/dealers");

      setDealers(res.data.dealers);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await api.put(`/dealers/${id}/status`, {
        status,
      });

      loadDealers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dealer Applications
      </h1>

      <div className="bg-white rounded-xl shadow overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Business
              </th>

              <th className="p-4 text-left">
                City
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {dealers.map((dealer) => (
              <tr
                key={dealer._id}
                className="border-b"
              >
                <td className="p-4">
                  {dealer.name}
                </td>

                <td className="p-4">
                  {dealer.businessName}
                </td>

                <td className="p-4">
                  {dealer.city}
                </td>

                <td className="p-4">
                  {dealer.phone}
                </td>

                <td className="p-4">
                  <select
                    className="border p-2 rounded"
                    value={dealer.status}
                    onChange={(e) =>
                      updateStatus(
                        dealer._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="new">
                      New
                    </option>

                    <option value="contacted">
                      Contacted
                    </option>

                    <option value="approved">
                      Approved
                    </option>

                    <option value="rejected">
                      Rejected
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}