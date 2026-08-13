"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import StatCard from "@/components/StatCard";

import RecentTable from "@/components/RecentTable";

export default function Dashboard() {
  const [stats, setStats] =
    useState({
      users: 0,
      quotes: 0,
      tickets: 0,
      dealers: 0,
    });

  const [recentQuotes, setRecentQuotes] =
    useState([]);

  const [recentTickets, setRecentTickets] =
    useState([]);

  const [recentDealers, setRecentDealers] =
    useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const res = await api.get(
      "/dashboard/stats"
    );

    setStats(res.data.stats);

    setRecentQuotes(
      res.data.recentQuotes
    );

    setRecentTickets(
      res.data.recentTickets
    );

    setRecentDealers(
      res.data.recentDealers
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-5">
        <StatCard
          title="Users"
          value={stats.users}
        />

        <StatCard
          title="Quotes"
          value={stats.quotes}
        />

        <StatCard
          title="Tickets"
          value={stats.tickets}
        />

        <StatCard
          title="Dealers"
          value={stats.dealers}
        />
      </div>
      <div className="grid grid-cols-3 gap-5 mt-10">
        <RecentTable
          title="Recent Quotes"
          data={recentQuotes}
        />

        <RecentTable
          title="Recent Tickets"
          data={recentTickets}
        />

        <RecentTable
          title="Recent Dealers"
          data={recentDealers}
        />
      </div>
    </div>
  );
}