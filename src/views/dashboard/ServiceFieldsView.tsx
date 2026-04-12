"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import type { ServiceField } from "@/types/dashboard";
import { mockServiceFields } from "@/data/dashboard-mock";

export default function ServiceFieldsView() {
  const [fields, setFields] = useState<ServiceField[]>(mockServiceFields);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editField, setEditField] = useState<ServiceField | null>(null);
  const [form, setForm] = useState({ name: "", description: "", image: "" });

  const openAdd = () => {
    setEditField(null);
    setForm({ name: "", description: "", image: "" });
    setDialogOpen(true);
  };
  const openEdit = (f: ServiceField) => {
    setEditField(f);
    setForm({ name: f.name, description: f.description, image: f.image });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const now = new Date().toISOString().split("T")[0];
    if (editField) {
      setFields((prev) =>
        prev.map((f) =>
          f.id === editField.id ? { ...f, ...form, updatedAt: now } : f,
        ),
      );
    } else {
      setFields((prev) => [
        ...prev,
        { ...form, id: crypto.randomUUID(), createdAt: now, updatedAt: now },
      ]);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) setFields((prev) => prev.filter((f) => f.id !== deleteId));
    setDeleteId(null);
  };

  return (
    <>
      <PageHeader
        title="Service Fields"
        description="Manage engineering sectors and departments"
        action={
          <Button onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" /> Add Service Field
          </Button>
        }
      />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Field Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((f) => (
              <TableRow key={f.id}>
                <TableCell className="font-medium">{f.name}</TableCell>
                <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                  {f.description}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {f.createdAt}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {f.updatedAt}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(f)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteId(f.id)}
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
              {editField ? "Edit Service Field" : "Add Service Field"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Field Name"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
            />
            <Textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
            />
            <Input
              placeholder="Image URL"
              value={form.image}
              onChange={(e) =>
                setForm((f) => ({ ...f, image: e.target.value }))
              }
            />
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
            <AlertDialogTitle>Delete Service Field?</AlertDialogTitle>
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
