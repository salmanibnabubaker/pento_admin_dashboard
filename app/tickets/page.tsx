"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

interface Ticket {
  _id: string;
  ticketNumber: string;
  name: string;
  phone: string;
  type: string;
  status: string;
  description: string;
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const res = await api.get("/tickets");
      setTickets(res.data.tickets);
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      await api.put(`/tickets/${id}/status`, {
        status,
      });

      loadTickets();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Ticket Management
      </h1>

      <div className="bg-white rounded-xl shadow overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                Ticket
              </th>

              <th className="p-4 text-left">
                Customer
              </th>

              <th className="p-4 text-left">
                Type
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
            {tickets.map((ticket) => (
              <tr
                key={ticket._id}
                className="border-b"
              >
                <td className="p-4">
                  {ticket.ticketNumber}
                </td>

                <td className="p-4">
                  {ticket.name}
                </td>

                <td className="p-4">
                  {ticket.type}
                </td>

                <td className="p-4">
                  {ticket.phone}
                </td>

                <td className="p-4">
                  <select
                    className="border p-2 rounded"
                    value={ticket.status}
                    onChange={(e) =>
                      updateStatus(
                        ticket._id,
                        e.target.value
                      )
                    }
                  >
                    <option value="open">
                      Open
                    </option>

                    <option value="in-progress">
                      In Progress
                    </option>

                    <option value="resolved">
                      Resolved
                    </option>

                    <option value="closed">
                      Closed
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