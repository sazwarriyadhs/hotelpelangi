
'use client';

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BedDouble, UtensilsCrossed, Sparkles, PlusCircle, MoreVertical, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Type definitions
type Status = "Available" | "Occupied" | "Cleaning" | "Reserved";
type Room = { id: number; type: string; status: Status };
type Table = { id: number; capacity: number; status: Status };
type ResortAsset = { id: string; name: string; service: string; status: Status };

// Initial data
const initialRooms: Room[] = [
  { id: 101, type: "Standard", status: "Available" },
  { id: 102, type: "Standard", status: "Occupied" },
  { id: 103, type: "Standard", status: "Available" },
  { id: 104, type: "Standard", status: "Cleaning" },
  { id: 201, type: "Deluxe", status: "Available" },
  { id: 202, type: "Deluxe", status: "Occupied" },
  { id: 203, type: "Deluxe", status: "Occupied" },
  { id: 204, type: "Deluxe", status: "Available" },
  { id: 301, type: "Suite", status: "Available" },
  { id: 302, type: "Suite", status: "Cleaning" },
  { id: 303, type: "Suite", status: "Occupied" },
  { id: 401, type: "Penthouse", status: "Available" },
];

const initialTables: Table[] = [
  { id: 1, capacity: 2, status: "Available" },
  { id: 2, capacity: 2, status: "Occupied" },
  { id: 3, capacity: 4, status: "Available" },
  { id: 4, capacity: 4, status: "Reserved" },
  { id: 5, capacity: 4, status: "Available" },
  { id: 6, capacity: 6, status: "Occupied" },
  { id: 7, capacity: 6, status: "Available" },
  { id: 8, capacity: 8, status: "Available" },
];

const initialResortAssets: ResortAsset[] = [
  { id: 'spa1', name: "Spa Treatment Room 1", service: "Spa", status: "Available" },
  { id: 'spa2', name: "Spa Treatment Room 2", service: "Spa", status: "Occupied" },
  { id: 'fit1', name: "Yoga Mat 1", service: "Fitness", status: "Available" },
  { id: 'fit2', name: "Yoga Mat 2", service: "Fitness", status: "Available" },
  { id: 'poola', name: "Poolside Cabana A", service: "Pool", status: "Reserved" },
  { id: 'poolb', name: "Poolside Cabana B", service: "Pool", status: "Available" },
  { id: 'poolc', name: "Poolside Cabana C", service: "Pool", status: "Cleaning" },
];

const statusStyles: { [key in Status]: string } = {
  Available: "bg-green-100 border-green-300 text-green-800 dark:bg-green-900/50 dark:border-green-800 dark:text-green-300",
  Occupied: "bg-red-100 border-red-300 text-red-800 dark:bg-red-900/50 dark:border-red-800 dark:text-red-300",
  Cleaning: "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/50 dark:border-blue-800 dark:text-blue-300",
  Reserved: "bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900/50 dark:border-yellow-800 dark:text-yellow-300",
};

const statusOptions: Status[] = ["Available", "Occupied", "Cleaning", "Reserved"];

export default function AvailabilityPage() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [resortAssets, setResortAssets] = useState<ResortAsset[]>(initialResortAssets);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"room" | "table" | "asset" | null>(null);
  const [editingItem, setEditingItem] = useState<Room | Table | ResortAsset | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: string; id: number | string } | null>(null);

  const handleOpenDialog = (type: "room" | "table" | "asset", item: Room | Table | ResortAsset | null = null) => {
    setDialogType(type);
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (dialogType === 'room') {
        const roomData: Room = {
            id: Number(formData.get("id")),
            type: formData.get("type") as string,
            status: formData.get("status") as Status,
        };
        if (editingItem) {
            setRooms(rooms.map(r => r.id === (editingItem as Room).id ? roomData : r));
        } else {
            setRooms([...rooms, roomData]);
        }
    } else if (dialogType === 'table') {
        const tableData: Table = {
            id: Number(formData.get("id")),
            capacity: Number(formData.get("capacity")),
            status: formData.get("status") as Status,
        };
        if (editingItem) {
            setTables(tables.map(t => t.id === (editingItem as Table).id ? tableData : t));
        } else {
            setTables([...tables, tableData]);
        }
    } else if (dialogType === 'asset') {
        const assetData: ResortAsset = {
            id: editingItem ? (editingItem as ResortAsset).id : `asset-${Date.now()}`,
            name: formData.get("name") as string,
            service: formData.get("service") as string,
            status: formData.get("status") as Status,
        };
        if (editingItem) {
            setResortAssets(resortAssets.map(a => a.id === (editingItem as ResortAsset).id ? assetData : a));
        } else {
            setResortAssets([...resortAssets, assetData]);
        }
    }
    
    setDialogOpen(false);
    setEditingItem(null);
  };

  const handleDeleteClick = (type: string, id: number | string) => {
    setItemToDelete({ type, id });
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    const { type, id } = itemToDelete;
    if (type === 'room') {
      setRooms(rooms.filter(r => r.id !== id));
    } else if (type === 'table') {
      setTables(tables.filter(t => t.id !== id));
    } else if (type === 'asset') {
      setResortAssets(resortAssets.filter(a => a.id !== id));
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const renderDialogContent = () => {
    if (!dialogType) return null;
    
    let title = "";
    let content = null;

    switch (dialogType) {
        case 'room':
            title = editingItem ? "Edit Room" : "Add New Room";
            content = (
                <>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="id" className="text-right">Room Number</Label>
                            <Input id="id" name="id" type="number" defaultValue={(editingItem as Room)?.id} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">Type</Label>
                            <Input id="type" name="type" defaultValue={(editingItem as Room)?.type} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">Status</Label>
                             <Select name="status" defaultValue={(editingItem as Room)?.status}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </>
            );
            break;
        case 'table':
            title = editingItem ? "Edit Table" : "Add New Table";
            content = (
                 <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="id" className="text-right">Table Number</Label>
                        <Input id="id" name="id" type="number" defaultValue={(editingItem as Table)?.id} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="capacity" className="text-right">Capacity</Label>
                        <Input id="capacity" name="capacity" type="number" defaultValue={(editingItem as Table)?.capacity} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <Select name="status" defaultValue={(editingItem as Table)?.status}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            );
            break;
        case 'asset':
            title = editingItem ? "Edit Resort Asset" : "Add New Resort Asset";
            content = (
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Asset Name</Label>
                        <Input id="name" name="name" defaultValue={(editingItem as ResortAsset)?.name} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="service" className="text-right">Service</Label>
                         <Select name="service" defaultValue={(editingItem as ResortAsset)?.service}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select service" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Spa">Spa</SelectItem>
                                <SelectItem value="Fitness">Fitness</SelectItem>
                                <SelectItem value="Pool">Pool</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <Select name="status" defaultValue={(editingItem as ResortAsset)?.status}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            );
            break;
    }
    return (
        <DialogContent>
            <form onSubmit={handleSave}>
                <DialogHeader>
                    <DialogTitle className="font-headline">{title}</DialogTitle>
                </DialogHeader>
                {content}
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
        <h1 className="text-3xl font-bold font-headline md:text-4xl">Availability Overview</h1>
        <p className="text-muted-foreground">
          Real-time status of all your bookable assets.
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
                    This action cannot be undone. This will permanently delete the item.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Tabs defaultValue="rooms">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="rooms">
            <BedDouble className="mr-2 h-4 w-4" /> Rooms
          </TabsTrigger>
          <TabsTrigger value="restaurant">
            <UtensilsCrossed className="mr-2 h-4 w-4" /> Restaurant
          </TabsTrigger>
          <TabsTrigger value="resort">
            <Sparkles className="mr-2 h-4 w-4" /> Resort
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rooms" className="mt-6">
            <div className="flex justify-end mb-4">
                <Button onClick={() => handleOpenDialog('room')}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Room
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {rooms.map((room) => (
                <Card key={room.id} className={cn("transition-all hover:shadow-lg", statusStyles[room.status])}>
                    <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Room {room.id}</span>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="border-current">{room.status}</Badge>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical className="h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleOpenDialog('room', room)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDeleteClick('room', room.id)} className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className="text-sm font-medium">{room.type}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </TabsContent>

        <TabsContent value="restaurant" className="mt-6">
            <div className="flex justify-end mb-4">
                <Button onClick={() => handleOpenDialog('table')}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Table
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tables.map((table) => (
              <Card key={table.id} className={cn("transition-all hover:shadow-lg", statusStyles[table.status])}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Table {table.id}</span>
                     <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-current">{table.status}</Badge>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleOpenDialog('table', table)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteClick('table', table.id)} className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-sm font-medium">Capacity: {table.capacity} guests</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resort" className="mt-6">
            <div className="flex justify-end mb-4">
                <Button onClick={() => handleOpenDialog('asset')}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Asset
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {resortAssets.map((asset) => (
                <Card key={asset.id} className={cn("transition-all hover:shadow-lg", statusStyles[asset.status])}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span>{asset.name}</span>
                       <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-current">{asset.status}</Badge>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical className="h-4 w-4" /></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleOpenDialog('asset', asset)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleDeleteClick('asset', asset.id)} className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium">{asset.service}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

    