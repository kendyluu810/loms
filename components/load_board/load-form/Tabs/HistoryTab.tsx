"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExtendedLoadRow } from "@/type";

function niceLabel(s: string) {
  // "pickup:Completed" -> "Pickup — Completed"
  const [point, st] = s.split(":");
  const cap = (t: string) => t.replace(/\b\w/g, (c) => c.toUpperCase());
  return `${cap((point ?? "").replace(/\[(\d+)\]/, " $1"))} — ${cap(st ?? "")}`;
}

export default function HistoryTab({ load }: { load: ExtendedLoadRow }) {
  const items = [...(load.statusHistory ?? [])].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">History</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-500">
          No history yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">History</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.map((it, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="h-2 w-2 rounded-full mt-2 border" />
            <div className="flex-1">
              <div className="text-sm font-medium text-[#022f7e]">
                {niceLabel(it.status)}
              </div>
              <div className="text-xs text-gray-500">
                {new Date(it.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
