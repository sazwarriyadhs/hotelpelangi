
'use client';

import { useState } from 'react';
import { MoreHorizontal, PlusCircle, Edit, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from '@/lib/utils';

type Status = "Confirmed" | "Checked-in" | "Seated" | "Pending" | "Checked-out";
type ReservationType = "Room" | "Restaurant";

type Reservation = {
  id: number;
  guest: string;
  type: ReservationType;
  details: string;
  checkIn: string;
  checkOut: string;
  status: Status;
};

const initialReservations: Reservation[] = [
  {
    id: 1,
    guest: "Liam Johnson",
    type: "Room",
    details: "Deluxe King - #204",
    checkIn: "2024-08-15",
    checkOut: "2024-08-18",
    status: "Confirmed",
  },
  {
    id: 2,
    guest: "Olivia Smith",
    type: "Restaurant",
    details: "Table for 2",
    checkIn: "2024-08-16",
    checkOut: "-",
    status: "Seated",
  },
  {
    id: 3,
    guest: "Noah Williams",
    type: "Room",
    details: "Standard Queen - #112",
    checkIn: "2024-08-16",
    checkOut: "2024-08-17",
    status: "Checked-in",
  },
  {
    id: 4,
    guest: "Emma Brown",
    type: "Room",
    details: "Presidential Suite - #401",
    checkIn: "2024-08-20",
    checkOut: "2024-08-25",
    status: "Pending",
  },
  {
    id: 5,
    guest: "James Jones",
    type: "Restaurant",
    details: "Table for 6",
    checkIn: "2024-08-17",
    checkOut: "-",
    status: "Confirmed",
  },
  {
    id: 6,
    guest: "Ava Garcia",
    type: "Room",
    details: "Standard Twin - #108",
    checkIn: "2024-08-15",
    checkOut: "2024-08-16",
    status: "Checked-out",
  },
];

const statusVariant = {
    "Confirmed": "default",
    "Checked-in": "secondary",
    "Seated": "secondary",
    "Pending": "outline",
    "Checked-out": "destructive",
} as const;

const statusOptions: Status[] = ["Pending", "Confirmed", "Checked-in", "Seated", "Checked-out"];
const typeOptions: ReservationType[] = ["Room", "Restaurant"];

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Reservation | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleOpenDialog = (item: Reservation | null = null) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const reservationData: Reservation = {
      id: editingItem ? editingItem.id : Date.now(),
      guest: formData.get("guest") as string,
      type: formData.get("type") as ReservationType,
      details: formData.get("details") as string,
      checkIn: formData.get("checkIn") as string,
      checkOut: formData.get("checkOut") as string,
      status: formData.get("status") as Status,
    };

    if (editingItem) {
      setReservations(reservations.map(r => r.id === editingItem.id ? reservationData : r));
    } else {
      setReservations([...reservations, reservationData]);
    }

    setDialogOpen(false);
    setEditingItem(null);
  };

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete === null) return;
    setReservations(reservations.filter(r => r.id !== itemToDelete));
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };
  
  const renderDialogContent = () => {
    const title = editingItem ? "Edit Reservation" : "Add New Reservation";
    return (
        <DialogContent className="sm:max-w-[480px]">
            <form onSubmit={handleSave}>
                <DialogHeader>
                    <DialogTitle className="font-headline">{title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="guest" className="text-right">Guest Name</Label>
                        <Input id="guest" name="guest" defaultValue={editingItem?.guest} className="col-span-3" required />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-right">Type</Label>
                        <Select name="type" defaultValue={editingItem?.type}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                {typeOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="details" className="text-right">Details</Label>
                        <Input id="details" name="details" defaultValue={editingItem?.details} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="checkIn" className="text-right">Check-in</Label>
                        <Input id="checkIn" name="checkIn" type="date" defaultValue={editingItem?.checkIn} className="col-span-3" required />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="checkOut" className="text-right">Check-out</Label>
                        <Input id="checkOut" name="checkOut" type="date" defaultValue={editingItem?.checkOut} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <Select name="status" defaultValue={editingItem?.status}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
  };

  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-bold font-headline md:text-4xl">Reservations</h1>
            <p className="text-muted-foreground">
                Manage all guest and customer reservations.
            </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          {renderDialogContent()}
        </Dialog>
      
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the reservation.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="font-headline">Current Bookings</CardTitle>
                        <CardDescription>An overview of all reservations.</CardDescription>
                    </div>
                    <Button onClick={() => handleOpenDialog()}>
                        <PlusCircle className="mr-2 h-4 w-4" /> Add Reservation
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Guest</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>Check-in / Date</TableHead>
                    <TableHead>Check-out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>
                    <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                        <TableCell className="font-medium">{reservation.guest}</TableCell>
                        <TableCell>{reservation.type}</TableCell>
                        <TableCell>{reservation.details}</TableCell>
                        <TableCell>{reservation.checkIn}</TableCell>
                        <TableCell>{reservation.checkOut}</TableCell>
                        <TableCell>
                            <Badge variant={statusVariant[reservation.status as keyof typeof statusVariant]}>{reservation.status}</Badge>
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleOpenDialog(reservation)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteClick(reservation.id)} className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                Showing <strong>1-{reservations.length}</strong> of <strong>{reservations.length}</strong> reservations
                </div>
            </CardFooter>
        </Card>
    </div>
  );
}

    