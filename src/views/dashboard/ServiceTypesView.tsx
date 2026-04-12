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
import { Plus, Pencil, Trash2, Eye, ArrowLeft } from "lucide-react";
import type { ServiceType } from "@/types/dashboard";
import { mockServiceTypes, mockServiceFields } from "@/data/dashboard-mock";
import { Badge } from "@/components/ui/badge";

export default function ServiceTypesView() {
  const [types, setTypes] = useState<ServiceType[]>(mockServiceTypes);
  const [viewType, setViewType] = useState<ServiceType | null>(null);
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

  const getField = (id: string) =>
    mockServiceFields.find((f) => f.id === id);

  if (viewType) {
    const field = getField(viewType.serviceFieldId);
    return (
      <>
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => setViewType(null)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Service Types
        </Button>
        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-bold">
                {viewType.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Type ID: {viewType.id}
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Service field
              </h3>
              <Badge variant="secondary" className="text-sm">
                {field?.name || "—"}
              </Badge>
              {field?.description ? (
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {field.description}
                </p>
              ) : null}
            </div>
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <span className="text-muted-foreground">Created</span>
                <p className="font-medium">{viewType.createdAt}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Last updated</span>
                <p className="font-medium">{viewType.updatedAt}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setViewType(null);
                  openEdit(viewType);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit type
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteId(viewType.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        </Card>
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
              <AlertDialogAction
                onClick={() => {
                  handleDelete();
                  setViewType(null);
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
        title="Service Types"
        description="Manage sub-categories and tags for projects"
        action={
          <Button onClick={openAdd} variant="gradient">
            <Plus className="mr-2 h-4 w-4" /> Add Service Type
          </Button>
        }
      />
      <Card className="bg-background">
        <Table className="bg-background">
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
              <TableRow
                key={t.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setViewType(t)}
              >
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
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`View ${t.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewType(t);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Edit ${t.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(t);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Delete ${t.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(t.id);
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
