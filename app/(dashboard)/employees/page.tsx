import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EmployeePage() {
  return (
    <div className="flex h-screen p-4 space-x-4">
      {/* Sidebar */}
      <div className="w-1/3 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">List of Employees</h2>
          <Button variant="outline">+ Add Filters</Button>
        </div>

        <Card>
          <CardHeader className="pb-2">Management</CardHeader>
          <CardContent className="space-y-2">
            <Input placeholder="Search" />
            <div className="space-y-2">
              {/* Example employee row */}
              <div className="flex justify-between items-center text-sm">
                <div>200</div>
                <div className="flex-1 ml-2">Doreen Barch</div>
                <Badge variant="secondary">Offline</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">Other</CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <div>205</div>
                <div className="flex-1 ml-2">Scot Hester</div>
                <Badge variant="secondary">Online</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teams table */}
      <div className="flex-1 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Teams</h2>
          <div className="flex items-center space-x-2">
            <Select>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Sort by ..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
            <Button>Create Team</Button>
          </div>
        </div>

        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ext</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Example team member row */}
                <TableRow>
                  <TableCell className="text-blue-600 underline cursor-pointer">
                    504 - Alice (Maryam)
                  </TableCell>
                  <TableCell>Online</TableCell>
                  <TableCell>632</TableCell>
                  <TableCell>(877) 486-1253</TableCell>
                  <TableCell>alice@example.com</TableCell>
                </TableRow>
                {/* Repeat for other team members */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
