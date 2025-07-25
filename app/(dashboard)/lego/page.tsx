"use client";
import { columns } from "@/components/load_board/columns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Load } from "@/type";
import { fetchLoads } from "@/utils/fetchLoads";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const LegoPage = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [loadId, setLoadId] = useState("");

  const [loads, setLoads] = useState<Load[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleDelete = async (loadNumber: string) => {
    try {
      await fetch(`/api/load_board/${loadNumber}`, { method: "DELETE" });
      toast.success(`Load ${loadNumber} deleted successfully`);
      await loadData(); // Refresh data after delete
    } catch (error: any) {
      toast.error(`Failed to delete load: ${error.message}`);
    }
  };

  const loadData = async () => {
    try {
      const fetched = await fetchLoads();
      setLoads(fetched);
    } catch (err: any) {
      toast.error(`Error fetching loads: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const currentColumns = columns(handleDelete);

  const table = useReactTable({
    data: loads,
    columns: currentColumns,
    state: {
      sorting,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold text-[#142B52] mb-6">Lego Loads</h1>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by Load ID..."
            className="pl-10"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              table.setColumnFilters([
                {
                  id: "id",
                  value: e.target.value,
                },
              ]);
            }}
          />
        </div>

        {/* Right Actions */}
        <div className="flex gap-4">
          {/* Glue Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#40BF60] hover:bg-[#34a653] text-white">
                <Plus className="mr-2 h-4 w-4" />
                Glue Load
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Glue Load</DialogTitle>
                <DialogDescription>
                  Enter a Load ID to glue manually.
                </DialogDescription>
              </DialogHeader>
              <Input
                placeholder="Enter Load ID"
                value={loadId}
                onChange={(e) => setLoadId(e.target.value)}
              />
              <DialogFooter>
                <Button
                  onClick={() => {
                    console.log("Glue Load:", loadId);
                    setLoadId("");
                  }}
                >
                  Confirm Glue
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Sort Dropdown */}
          <Select
            value={sort}
            onValueChange={(value) => {
              setSort(value);
              setSorting([
                {
                  id: "id", // or any other column
                  desc: value === "latest",
                },
              ]);
            }}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-md border overflow-auto">
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
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
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
                <TableCell colSpan={columns.length} className="text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Rows per page:</span>
            <Select
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
      </div>
    </div>
  );
};

export default LegoPage;
