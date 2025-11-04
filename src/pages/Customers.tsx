import * as React from "react";
import { motion } from "framer-motion";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Customer, CustomerTier, customerData as defaultData } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { ArrowUpDown, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

// ---
// Helper Components
// ---

function CustomerTierBadge({ tier }: { tier: CustomerTier }) {
  let className = "";
  if (tier === "Standard") className = "bg-gray-500/20 text-gray-500 border-gray-500/30";
  else if (tier === "Premium") className = "bg-blue-500/20 text-blue-500 border-blue-500/30";
  else if (tier === "VIP") className = "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
  return <Badge variant="outline" className={cn("font-medium", className)}>{tier}</Badge>;
}

const getInitials = (name: string) => {
  const names = name.split(' ');
  if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
  return (names[0][0] + names[names.length - 1][0]).toUpperCase();
};

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Company <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3 px-4">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary/20 text-primary-foreground/80 font-medium">
            {getInitials(row.getValue("companyName"))}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium">{row.getValue("companyName")}</span>
      </div>
    ),
  },
  {
    accessorKey: "contactName",
    header: "Contact Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "tier",
    header: "Tier",
    cell: ({ row }) => <CustomerTierBadge tier={row.getValue("tier")} />,
  },
  {
    accessorKey: "joinedDate",
    header: "Joined",
    cell: ({ row }) => new Date(row.getValue("joinedDate")).toLocaleDateString(),
  },
];

// ---
// Add New Customer Dialog Form
// ---

function CreateCustomerDialog({ onCustomerCreate }: { onCustomerCreate: (newCustomer: Customer) => void }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [companyName, setCompanyName] = React.useState("");
  const [contactName, setContactName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactName || !email) {
      toast.error("Please fill out Company Name, Contact Name, and Email.");
      return;
    }
    const newCustomer: Customer = {
      id: `CUST-${Math.floor(Math.random() * 900) + 100}`,
      companyName,
      contactName,
      email,
      phone,
      tier: "Standard",
      joinedDate: new Date().toISOString(),
    };
    onCustomerCreate(newCustomer);
    toast.success(`Customer ${newCustomer.companyName} created successfully!`);
    setIsOpen(false);
    setCompanyName("");
    setContactName("");
    setEmail("");
    setPhone("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Customer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Customer</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new customer to the system.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="companyName" className="text-right">Company</Label>
              <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="col-span-3" placeholder="e.g., Apex Logistics" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contactName" className="text-right">Contact Name</Label>
              <Input id="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} className="col-span-3" placeholder="e.g., Sarah Chen" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" placeholder="e.g., sarah@apex.com" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="col-span-3" placeholder="(555) 123-4567" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Customer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ---
// Main Customers Page Component
// ---

export function Customers() {
  const [data, setData] = React.useState(defaultData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  const handleCustomerCreate = (newCustomer: Customer) => {
    setData([newCustomer, ...data]);
  };

  return (
    <motion.div
      className="w-full space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground text-lg">
            Manage your customer accounts and relationships.
          </p>
        </div>
        <CreateCustomerDialog onCustomerCreate={handleCustomerCreate} />
      </div>

      {/* Filters and Controls */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter by company..."
          value={(table.getColumn("companyName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("companyName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border-.none">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
}
