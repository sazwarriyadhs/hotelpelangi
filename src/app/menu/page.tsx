import { MoreHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const menuItems = [
  {
    name: "Grilled Salmon",
    category: "Main Course",
    price: 24.50,
    stockStatus: "In Stock",
  },
  {
    name: "Caesar Salad",
    category: "Appetizer",
    price: 12.00,
    stockStatus: "In Stock",
  },
  {
    name: "New York Cheesecake",
    category: "Dessert",
    price: 9.50,
    stockStatus: "Low Stock",
  },
  {
    name: "Filet Mignon",
    category: "Main Course",
    price: 45.00,
    stockStatus: "In Stock",
  },
  {
    name: "Margarita Pizza",
    category: "Main Course",
    price: 18.00,
    stockStatus: "Out of Stock",
  },
  {
    name: "Iced Tea",
    category: "Beverage",
    price: 4.00,
    stockStatus: "In Stock",
  },
];

const stockStatusVariant = {
    "In Stock": "default",
    "Low Stock": "secondary",
    "Out of Stock": "destructive"
} as const;

export default function MenuPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline md:text-4xl">Restaurant Menu</h1>
        <p className="text-muted-foreground">
          Manage your menu items, pricing, and inventory.
        </p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-headline">Menu Items</CardTitle>
              <CardDescription>A list of all items available in the restaurant.</CardDescription>
            </div>
            <Button>Add New Item</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={stockStatusVariant[item.stockStatus as keyof typeof stockStatusVariant]}>{item.stockStatus}</Badge>
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
                        <DropdownMenuItem>Edit Item</DropdownMenuItem>
                        <DropdownMenuItem>Update Stock</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete Item</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
