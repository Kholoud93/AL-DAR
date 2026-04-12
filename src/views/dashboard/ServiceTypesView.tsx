"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { ServiceType } from "@/types/dashboard";
import { mockServiceTypes, mockServiceFields } from "@/data/dashboard-mock";
import { Badge } from "@/components/ui/badge";

export default function ServiceTypesView() {
  const [types, setTypes] = useState<ServiceType[]>(mockServiceTypes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editType, setEditType] = useState<ServiceType | null>(null);
  const [form, setForm] = useState({ name: "", serviceFieldId: "" });

  const openAdd = () => {
    setEditType(null);
    setForm({ name: "", serviceFieldId: "" });
    setDialogOpen(true);
  };
  const openEdit = (t: ServiceType) => {
    setEditType(t);
    setForm({ name: t.name, serviceFieldId: t.serviceFieldId });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const now = new Date().toISOString().split("T")[0];
    if (editType) {
      setTypes((prev) =>
        prev.map((t) =>
          t.id === editType.id ? { ...t, ...form, updatedAt: now } : t,
        ),
      );
    } else {
      setTypes((prev) => [
        ...prev,
        { ...form, id: crypto.randomUUID(), createdAt: now, updatedAt: now },
      ]);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) setTypes((prev) => prev.filter((t) => t.id !== deleteId));
    setDeleteId(null);
  };

  const getFieldName = (id: string) =>
    mockServiceFields.find((f) => f.id === id)?.name || "—";

  return (
    <>
      <PageHeader
        title="Service Types"
        description="Manage sub-categories and tags for projects"
        action={
          <Button onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" /> Add Service Type
          </Button>
        }
      />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type Name</TableHead>
              <TableHead>Service Field</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {types.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{getFieldName(t.serviceFieldId)}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {t.createdAt}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {t.updatedAt}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(t)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteId(t.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editType ? "Edit Service Type" : "Add Service Type"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Type Name"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
            />
            <Select
              value={form.serviceFieldId}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, serviceFieldId: v }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Service Field" />
              </SelectTrigger>
              <SelectContent>
                {mockServiceFields.map((field) => (
                  <SelectItem key={field.id} value={field.id}>
                    {field.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button onClick={handleSave} disabled={!form.name}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Service Type?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
