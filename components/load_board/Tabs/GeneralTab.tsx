"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { MoreVertical, Pen } from "lucide-react";
import { useState } from "react";

export default function GeneralTabs() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  return (
    <div>
      <Card className="border rounded-lg shadow-sm">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between ">
            <CardTitle className="text-lg font-semibold text-[#022f7e]">
              Route
            </CardTitle>
            <div className="flex items-center space-x-4">
              <Pen className="text-[#022f7e] cursor-pointer" />
              <MoreVertical className="text-[#022f7e] cursor-pointer" />
            </div>
          </div>
        </CardHeader>

      </Card>
    </div>
  );
}
