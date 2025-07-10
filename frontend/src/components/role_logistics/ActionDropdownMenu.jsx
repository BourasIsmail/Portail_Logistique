import React from "react";
import { ArchiveIcon, MoreHorizontal, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import TicketStatus from "@/components/TicketStatus";
import api from "@/utils/api";
import { useState } from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ActionDropdownMenu({ row, refreshTable }) {
  const [status, setStatus] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async () => {
    if (!status) {
      toast.error("Veuillez sélectionner un statut.");
      return;
    }

    try {
      console.log("Updating ticket status:", row.getValue("id"), status, note);
      await api.put(`/admin/update-ticket-status/${row.getValue("id")}`, {
        status,
        note,
      });
      toast.success("Statut du ticket mis à jour avec succès.");
      refreshTable();
    } catch (error) {
      console.error("Error updating ticket status:", error);
    }
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0" size={undefined}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={undefined}>
          <DialogTrigger asChild>
            <DropdownMenuItem className={undefined} inset={undefined}>
              <RefreshCcw className="h-4 w-4" />
              Modifier
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuSeparator className={undefined} />
          <DropdownMenuItem
            onClick={async () => {
              try {
                console.log("Archiving ticket:", row.getValue("id"));
                await api.put(`/admin/archive-ticket/${row.getValue("id")}`);
                toast.success("Ticket archivé ");
                refreshTable();
              } catch (error) {
                console.error("Error archiving ticket:", error);
              }
            }}
            className={undefined}
            inset={undefined}
          >
            <ArchiveIcon className="h-4 w-4" />
            Archiver
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className={"text-center text-xl"}>
            Modifier Demande
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-1">
          <div className="flex flex-col w-md">
            <ul>
              <li className="text-md font-medium mb-2 ">
                <span className="font-bold max-w-32 break-words whitespace-normal">
                  Description :
                </span>{" "}
                {row.getValue("ticketDescription")}
              </li>
              <li className="text-md font-medium mb-2">
                <span className="font-bold">Date :</span>{" "}
                {new Date(row.getValue("date")).toLocaleDateString("fr-FR")}
              </li>

              <li className="text-md font-medium mb-2">
                <span className="font-bold">Entité :</span>{" "}
                {row.getValue("service")}
              </li>
              <li className="text-md font-medium mb-2">
                <span className="font-bold">Catégorie :</span>{" "}
                {row.getValue("category")}
              </li>
              <li className="text-md font-medium mb-2">
                <span className="font-bold max-w-32 break-words whitespace-normal">
                  Observations :
                </span>{" "}
                {row.getValue("observation") || "Aucune observation"}
              </li>
              <li className="text-md font-medium mb-2">
                <span className="font-bold">Besoins :</span>{" "}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Besion</TableHead>
                      <TableHead>Quantité</TableHead>
                      <TableHead>Affectation</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {row.getValue("needs").map((need, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium overflow-hidden text-ellipsis whitespace-nowrap">
                          {need.name}
                        </TableCell>
                        <TableCell className={"text-center"}>
                          {need.quantity}
                        </TableCell>
                        <TableCell
                          className={
                            "max-w-32 overflow-hidden text-ellipsis whitespace-nowrap"
                          }
                        >
                          {need.affectation || "Non spécifié"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </li>
            </ul>
          </div>
          <div className="flex flex-col w-md">
            <div className="flex flex-col flex-1 ">
              <label className="font-bold text-md mb-2">
                Modifier le statut du demande :
              </label>
              <Select
                name="status"
                onValueChange={(value) => setStatus(value)}
                value={status}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Statut du demande" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOUMISE">
                    <TicketStatus status="SOUMISE" />
                  </SelectItem>
                  <SelectItem value="EN_COURS_DE_VALIDATION">
                    <TicketStatus status="EN_COURS_DE_VALIDATION" />
                  </SelectItem>
                  <SelectItem value="APPROUVEE">
                    <TicketStatus status="APPROUVEE" />
                  </SelectItem>
                  <SelectItem value="REJETEE">
                    <TicketStatus status="REJETEE" />
                  </SelectItem>
                  <SelectItem value="EN_COURS_DE_TRAITEMENT">
                    <TicketStatus status="EN_COURS_DE_TRAITEMENT" />
                  </SelectItem>
                  <SelectItem value="PRETE_A_ETRE_LIVREE">
                    <TicketStatus status="PRETE_A_ETRE_LIVREE" />
                  </SelectItem>
                  <SelectItem value="LIVREE">
                    <TicketStatus status="LIVREE" />
                  </SelectItem>
                  <SelectItem value="CLOTUREE">
                    <TicketStatus status="CLOTUREE" />
                  </SelectItem>
                  <SelectItem value="ANNULEE">
                    <TicketStatus status="ANNULEE" />
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <label className="font-bold text-md mb-2 mt-4">
                Commentaire (optionnel) :
              </label>
              <textarea
                name="note"
                rows={3}
                required={false}
                className="w-full p-2 border border-gray-300 rounded-md "
                placeholder="Ajouter un commentaire..."
                onChange={(e) => setNote(e.target.value)}
                value={note}
              ></textarea>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
