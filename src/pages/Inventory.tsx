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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Pallet, PalletStatus } from "@/lib/types";
import { palletData as defaultData } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { ArrowUpDown, PlusCircle } from "lucide-react";
import { toast } from "sonner";

// ---
// Helper Components
// ---

// Status Badge for the Table
function PalletStatusBadge({ status }: { status: PalletStatus }) {
  let className = "";
  if (status === "In Warehouse") className = "bg-blue-500/20 text-blue-500 border-blue-500/30";
  else if (status === "Loading") className = "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
  else if (status === "Shipped") className = "bg-gray-500/20 text-gray-500 border-gray-500/30";
  else if (status === "Damaged") className = "bg-red-500/20 text-red-500 border-red-500/30";
  return <Badge variant="outline" className={cn("font-medium", className)}>{status}</Badge>;
}

// Column Definitions for React Table
export const columns: ColumnDef<Pallet>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Pallet ID <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "contents",
    header: "Contents",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <PalletStatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "weight",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Weight (lbs) <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="text-right font-medium">{row.getValue("weight")}</div>,
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "created",
    header: "Created",
    cell: ({ row }) => new Date(row.getValue("created")).toLocaleDateString(),
  },
];

// ---
// Add New Pallet Dialog Form
// ---

function CreatePalletDialog({ onPalletCreate }: { onPalletCreate: (newPallet: Pallet) => void }) {
  const [isOpen, setIsOpen] = React.useState(false);

  // Simple form state
  const [contents, setContents] = React.useState("");
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [weight, setWeight] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contents || !origin || !destination || !weight) {
      toast.error("Please fill out all fields.");
      return;
    }

    const newPallet: Pallet = {
      id: `PLT-${Math.floor(Math.random() * 900) + 100}`, // Random ID
      contents,
      origin,
      destination,
      weight: parseInt(weight, 10),
      status: "In Warehouse",
      created: new Date().toISOString(),
    };

    onPalletCreate(newPallet);
    toast.success(`Pallet ${newPallet.id} created successfully!`);

    // Reset form and close
    setIsOpen(false);
    setContents("");
    setOrigin("");
    setDestination("");
    setWeight("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Pallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Pallet</DialogTitle>
            <DialogDescription>
              Fill in the details below to register a new pallet in the warehouse.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contents" className="text-right">Contents</Label>
              <Input id="contents" value={contents} onChange={(e) => setContents(e.target.value)} className="col-span-3" placeholder="e.g., Electronics" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="origin" className="text-right">Origin</Label>
              <Input id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} className="col-span-3" placeholder="e.g., Supplier A" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="destination" className="text-right">Destination</Label>
              <Input id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} className="col-span-3" placeholder="e.g., Rack 4B" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">Weight (lbs)</Label>
              <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="col-span-3" placeholder="e.g., 1200" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Pallet</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


// ---
// Main Inventory Page Component
// ---

export function Inventory() {
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

  const handlePalletCreate = (newPallet: Pallet) => {
    setData([newPallet, ...data]);
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
          <h1 className="text-4xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground text-lg">
            Search, filter, and manage all pallets in your network.
          </p>
        </div>
        <CreatePalletDialog onPalletCreate={handlePalletCreate} />
      </div>

      {/* Filters and Controls */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter by contents..."
          value={(table.getColumn("contents")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("contents")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      {/* Data Table */}
      <Card>
        <CardContent className="p-0">
          <div className="rounded-md border-none">
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
