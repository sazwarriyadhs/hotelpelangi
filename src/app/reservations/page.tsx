import { MoreHorizontal } from "lucide-react";

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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const reservations = [
  {
    guest: "Liam Johnson",
    type: "Room",
    details: "Deluxe King - #204",
    checkIn: "2024-08-15",
    checkOut: "2024-08-18",
    status: "Confirmed",
  },
  {
    guest: "Olivia Smith",
    type: "Restaurant",
    details: "Table for 2",
    checkIn: "2024-08-16",
    checkOut: "-",
    status: "Seated",
  },
  {
    guest: "Noah Williams",
    type: "Room",
    details: "Standard Queen - #112",
    checkIn: "2024-08-16",
    checkOut: "2024-08-17",
    status: "Checked-in",
  },
  {
    guest: "Emma Brown",
    type: "Room",
    details: "Presidential Suite - #401",
    checkIn: "2024-08-20",
    checkOut: "2024-08-25",
    status: "Pending",
  },
  {
    guest: "James Jones",
    type: "Restaurant",
    details: "Table for 6",
    checkIn: "2024-08-17",
    checkOut: "-",
    status: "Confirmed",
  },
  {
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

export default function ReservationsPage() {
  return (
    <div className="flex flex-col gap-8">
        <div>
            <h1 className="text-3xl font-bold font-headline md:text-4xl">Reservations</h1>
            <p className="text-muted-foreground">
                Manage all guest and customer reservations.
            </p>
        </div>
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="font-headline">Current Bookings</CardTitle>
                        <CardDescription>An overview of all reservations.</CardDescription>
                    </div>
                     <Dialog>
                      <DialogTrigger asChild>
                        <Button>Add Reservation</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="font-headline">Create Reservation</DialogTitle>
                          <DialogDescription>
                            Fill in the details to create a new reservation. Click save when you're done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Guest Name
                            </Label>
                            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="details" className="text-right">
                              Details
                            </Label>
                            <Input id="details" defaultValue="Room 201" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save reservation</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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
                {reservations.map((reservation, index) => (
                    <TableRow key={index}>
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
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
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
                Showing <strong>1-6</strong> of <strong>32</strong> reservations
                </div>
            </CardFooter>
        </Card>
    </div>
  );
}
