import React, { useEffect, useState } from "react";
import { useAuth } from "@/utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/Dashboard";
import api from "@/utils/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TicketStatus from "@/components/TicketStatus";

export default function TicketsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const ticketsData = await api.get("/user/get-allTickets");
        console.log("Tickets Data:", ticketsData);
        setData(ticketsData.data.tickets);
      } catch (error) {
        console.error("Error fetching tickets data:", error);
      }
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <>
      <Dashboard>
        <h1 className="text-2xl font-semibold mb-4">Tickets</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Desciption</TableHead>
              <TableHead>Categorie</TableHead>
              <TableHead>Besoin</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">
                  {ticket.ticketDescription}
                </TableCell>
                <TableCell>{ticket.category}</TableCell>
                <TableCell>{ticket.needs}</TableCell>
                <TableCell>{ticket.date}</TableCell>
                <TableCell className="md:w-32">
                  <TicketStatus status={ticket.ticketStatus} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Dashboard>
    </>
  );
}
