"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import { ImageUrlField } from "@/components/dashboard/ImageUrlField";
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
import { Plus, Pencil, Trash2, Eye, ArrowLeft } from "lucide-react";
import type { ServiceField } from "@/types/dashboard";
import { mockServiceFields } from "@/data/dashboard-mock";

export default function ServiceFieldsView() {
  const [fields, setFields] = useState<ServiceField[]>(mockServiceFields);
  const [viewField, setViewField] = useState<ServiceField | null>(null);
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

  if (viewField) {
    return (
      <>
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => setViewField(null)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Service Fields
        </Button>
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-bold">
                {viewField.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Field ID: {viewField.id}
              </p>
            </div>
            {viewField.image ? (
              <div className="overflow-hidden rounded-lg border bg-muted/30">
                <img
                  src={viewField.image}
                  alt=""
                  className="max-h-64 w-full object-contain"
                />
              </div>
            ) : null}
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Description
              </h3>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {viewField.description || "—"}
              </p>
            </div>
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <span className="text-muted-foreground">Created</span>
                <p className="font-medium">{viewField.createdAt}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Last updated</span>
                <p className="font-medium">{viewField.updatedAt}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setViewField(null);
                  openEdit(viewField);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit field
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteId(viewField.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        </Card>
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
              <AlertDialogAction
                onClick={() => {
                  handleDelete();
                  setViewField(null);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Service Fields"
        description="Manage engineering sectors and departments"
        action={
          <Button onClick={openAdd} variant="gradient">
            <Plus className="mr-2 h-4 w-4" /> Add Service Field
          </Button>
        }
      />
      <Card className="bg-background">
        <Table className="bg-background">
          <TableHeader>
            <TableRow>
              <TableHead>Field Name</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((f) => (
              <TableRow
                key={f.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setViewField(f)}
              >
                <TableCell className="font-medium">{f.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {f.createdAt}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {f.updatedAt}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`View ${f.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewField(f);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Edit ${f.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(f);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Delete ${f.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(f.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
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
            <ImageUrlField
              label="Image"
              value={form.image}
              onChange={(v) => setForm((f) => ({ ...f, image: v }))}
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
