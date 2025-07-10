import React, { useEffect, useState } from "react";
import { useAuth } from "@/utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import Dashboard from "@/components/role_info/Dashboard";
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
      <Dashboard title={"Serv. Informatique Dashboard"}>
        <h1 className="text-2xl font-semibold mb-4">Tickets</h1>
        <div className="w-full">
          <div className="max-w-10/12 mx-auto">
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
                {data.length == 0 ? (
                  <TableRow className={undefined}>
                    <TableCell colSpan={5} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-medium">
                        {ticket.ticketDescription}
                      </TableCell>
                      <TableCell>{ticket.category}</TableCell>
                      <TableCell
                        className={"max-w-3xs break-words whitespace-normal"}
                      >
                        {ticket.needs}
                      </TableCell>
                      <TableCell>{ticket.date}</TableCell>
                      <TableCell className="md:w-32 max-w-md flex flex-col ">
                        <TicketStatus status={ticket.ticketStatus} />
                        {ticket.note && (
                          <div className="text-black text-md mt-2 break-words whitespace-normal max-w-xs text-center">
                            <span>
                              📌
                              <span className="italic font-semibold">
                                Commentaire:
                              </span>{" "}
                              {ticket.note}
                            </span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </Dashboard>
    </>
  );
}
