import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BedDouble, UtensilsCrossed, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const rooms = [
  { number: 101, type: "Standard", status: "Available" },
  { number: 102, type: "Standard", status: "Occupied" },
  { number: 103, type: "Standard", status: "Available" },
  { number: 104, type: "Standard", status: "Cleaning" },
  { number: 201, type: "Deluxe", status: "Available" },
  { number: 202, type: "Deluxe", status: "Occupied" },
  { number: 203, type: "Deluxe", status: "Occupied" },
  { number: 204, type: "Deluxe", status: "Available" },
  { number: 301, type: "Suite", status: "Available" },
  { number: 302, type: "Suite", status: "Cleaning" },
  { number: 303, type: "Suite", status: "Occupied" },
  { number: 401, type: "Penthouse", status: "Available" },
];

const tables = [
  { number: 1, capacity: 2, status: "Available" },
  { number: 2, capacity: 2, status: "Occupied" },
  { number: 3, capacity: 4, status: "Available" },
  { number: 4, capacity: 4, status: "Reserved" },
  { number: 5, capacity: 4, status: "Available" },
  { number: 6, capacity: 6, status: "Occupied" },
  { number: 7, capacity: 6, status: "Available" },
  { number: 8, capacity: 8, status: "Available" },
];

const statusStyles = {
  Available: "bg-green-100 border-green-300 text-green-800 dark:bg-green-900/50 dark:border-green-800 dark:text-green-300",
  Occupied: "bg-red-100 border-red-300 text-red-800 dark:bg-red-900/50 dark:border-red-800 dark:text-red-300",
  Cleaning: "bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900/50 dark:border-blue-800 dark:text-blue-300",
  Reserved: "bg-yellow-100 border-yellow-300 text-yellow-800 dark:bg-yellow-900/50 dark:border-yellow-800 dark:text-yellow-300",
};

export default function AvailabilityPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline md:text-4xl">Availability Overview</h1>
        <p className="text-muted-foreground">
          Real-time status of all your bookable assets.
        </p>
      </div>

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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rooms.map((room) => (
              <Card key={room.number} className={cn("transition-all hover:shadow-lg", statusStyles[room.status as keyof typeof statusStyles])}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Room {room.number}</span>
                    <Badge variant="outline" className="border-current">{room.status}</Badge>
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
           <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tables.map((table) => (
              <Card key={table.number} className={cn("transition-all hover:shadow-lg", statusStyles[table.status as keyof typeof statusStyles])}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Table {table.number}</span>
                    <Badge variant="outline" className="border-current">{table.status}</Badge>
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
            <Card className="flex flex-col items-center justify-center h-96 border-dashed">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Coming Soon</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground">Management for resort services and amenities will be available here.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
