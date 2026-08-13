"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

export default function QuotesPage() {
  const [quotes, setQuotes] =
    useState<any[]>([]);

  useEffect(() => {
    loadQuotes();
  }, []);

  const loadQuotes = async () => {
    const res =
      await api.get("/quotes");

    setQuotes(res.data.quotes);
  };

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    await api.put(
      `/quotes/${id}/status`,
      { status }
    );

    loadQuotes();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">
        Quotes
      </h1>

      <table className="w-full bg-white">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {quotes.map((quote) => (
            <tr key={quote._id}>
              <td>{quote.name}</td>

              <td>{quote.phone}</td>

              <td>{quote.location}</td>

              <td>
                <select
                  value={quote.status}
                  onChange={(e) =>
                    updateStatus(
                      quote._id,
                      e.target.value
                    )
                  }
                >
                  <option>new</option>
                  <option>contacted</option>
                  <option>quoted</option>
                  <option>won</option>
                  <option>lost</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}