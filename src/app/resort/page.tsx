
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { Leaf, Dumbbell, Waves, MoreHorizontal, PlusCircle, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSettings } from "@/hooks/use-settings";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Type definitions
type MenuItem = {
  id: string;
  name: string;
  price: { idr: number; usd: number };
};

type ServiceIcon = "Leaf" | "Dumbbell" | "Waves";

type ResortService = {
  id: string;
  title: string;
  description: string;
  actionText: string;
  icon: ServiceIcon;
  image: string;
  imageHint: string;
  menu?: MenuItem[];
};

const iconMap: { [key in ServiceIcon]: React.ElementType } = {
  Leaf: Leaf,
  Dumbbell: Dumbbell,
  Waves: Waves,
};

const iconOptions: ServiceIcon[] = ["Leaf", "Dumbbell", "Waves"];

// Initial data, converted from translation files to be manageable by state
const initialServices: ResortService[] = [
    {
        id: "spa",
        title: "Serenity Spa",
        description: "Indulge in rejuvenating treatments and therapies.",
        actionText: "View Treatments",
        icon: "Leaf",
        image: "https://placehold.co/600x400.png",
        imageHint: "spa massage therapy",
        menu: [
            { id: "balinese-massage", name: "Balinese Massage", price: { idr: 500000, usd: 35 } },
            { id: "hot-stone", name: "Hot Stone Therapy", price: { idr: 650000, usd: 45 } },
            { id: "facial", name: "Revitalizing Facial", price: { idr: 400000, usd: 28 } }
        ]
    },
    {
        id: "gym",
        title: "Fitness Center",
        description: "State-of-the-art equipment for your workout needs.",
        actionText: "Check Schedule",
        icon: "Dumbbell",
        image: "https://placehold.co/600x400.png",
        imageHint: "modern hotel gym",
        menu: []
    },
    {
        id: "pool",
        title: "Poolside Cabanas",
        description: "Relax in luxury with private poolside cabanas.",
        actionText: "Reserve Cabana",
        icon: "Waves",
        image: "https://placehold.co/600x400.png",
        imageHint: "poolside cabana resort",
        menu: [
            { id: "full-day", name: "Full Day Rental", price: { idr: 750000, usd: 50 } },
            { id: "half-day", name: "Half Day Rental (4 hours)", price: { idr: 450000, usd: 30 } }
        ]
    },
];

export default function ResortPage() {
  const { t } = useTranslation();
  const { currency } = useSettings();
  
  const [services, setServices] = useState<ResortService[]>(initialServices);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ResortService | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleOpenDialog = (item: ResortService | null = null) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const serviceData: ResortService = {
      id: editingItem ? editingItem.id : `service-${Date.now()}`,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      actionText: formData.get("actionText") as string,
      icon: formData.get("icon") as ServiceIcon,
      image: formData.get("image") as string,
      imageHint: formData.get("imageHint") as string,
      menu: editingItem?.menu ?? [], // Keep existing menu if editing, or empty array if new
    };

    if (editingItem) {
      setServices(services.map(s => s.id === editingItem.id ? serviceData : s));
    } else {
      setServices([...services, serviceData]);
    }

    setDialogOpen(false);
    setEditingItem(null);
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete === null) return;
    setServices(services.filter(s => s.id !== itemToDelete));
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const renderDialogContent = () => {
    const title = editingItem ? "Edit Resort Service" : "Add New Service";
    return (
        <DialogContent className="sm:max-w-lg">
            <form onSubmit={handleSave}>
                <DialogHeader>
                    <DialogTitle className="font-headline">{title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Title</Label>
                        <Input id="title" name="title" defaultValue={editingItem?.title} className="col-span-3" required />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">Description</Label>
                        <Textarea id="description" name="description" defaultValue={editingItem?.description} className="col-span-3" required />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="actionText" className="text-right">Action Text</Label>
                        <Input id="actionText" name="actionText" defaultValue={editingItem?.actionText} className="col-span-3" required />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="image" className="text-right">Image URL</Label>
                        <Input id="image" name="image" defaultValue={editingItem?.image} className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="imageHint" className="text-right">Image Hint</Label>
                        <Input id="imageHint" name="imageHint" defaultValue={editingItem?.imageHint} className="col-span-3" required />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="icon" className="text-right">Icon</Label>
                        <Select name="icon" defaultValue={editingItem?.icon}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select icon" />
                            </SelectTrigger>
                            <SelectContent>
                                {iconOptions.map(icon => <SelectItem key={icon} value={icon}>{icon}</SelectItem>)}
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
      <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline md:text-4xl">{t('resortPage.title')}</h1>
            <p className="text-muted-foreground">
              {t('resortPage.description')}
            </p>
          </div>
          <Button onClick={() => handleOpenDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Service
          </Button>
      </div>

       <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          {renderDialogContent()}
       </Dialog>
      
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the service.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => {
          const ServiceIconComponent = iconMap[service.icon];
          return (
            <Card key={service.id} className="overflow-hidden transition-all hover:shadow-xl flex flex-col">
               <CardHeader className="p-0 relative">
                  <Image
                      src={service.image}
                      alt={service.title}
                      width={600}
                      height={400}
                      className="aspect-video w-full object-cover"
                      data-ai-hint={service.imageHint}
                  />
                   <div className="absolute top-2 right-2">
                       <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                              <Button variant="secondary" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleOpenDialog(service)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteClick(service.id)} className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                   </div>
              </CardHeader>
              <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <ServiceIconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="mb-6">
                      {service.description}
                  </CardDescription>
                  
                  {service.menu && service.menu.length > 0 && (
                     <div className="mb-6">
                        <h4 className="font-semibold mb-2">{t('resortPage.viewMenu')}</h4>
                        <ul className="space-y-2 pt-2 border-t">
                            {service.menu.map((item) => (
                            <li key={item.id} className="flex justify-between text-sm">
                                <span>{item.name}</span>
                                <span className="font-semibold">{formatCurrency(currency === 'IDR' ? item.price.idr : item.price.usd, currency)}</span>
                            </li>
                            ))}
                        </ul>
                    </div>
                  )}

                  <div className="mt-auto">
                      <Button asChild className="w-full">
                        <Link href="/availability">{service.actionText}</Link>
                      </Button>
                  </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
