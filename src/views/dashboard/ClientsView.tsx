"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import { ImageUrlField } from "@/components/dashboard/ImageUrlField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Client } from "@/types/dashboard";
import { mockClients, mockProjects } from "@/data/dashboard-mock";

export default function ClientsView() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [viewClient, setViewClient] = useState<Client | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editClient, setEditClient] = useState<Client | null>(null);
  const [form, setForm] = useState({ name: "", logo: "" });

  const openAdd = () => {
    setEditClient(null);
    setForm({ name: "", logo: "" });
    setDialogOpen(true);
  };
  const openEdit = (c: Client) => {
    setEditClient(c);
    setForm({ name: c.name, logo: c.logo });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const now = new Date().toISOString().split("T")[0];
    if (editClient) {
      setClients((prev) =>
        prev.map((c) =>
          c.id === editClient.id ? { ...c, ...form, updatedAt: now } : c,
        ),
      );
    } else {
      setClients((prev) => [
        ...prev,
        { ...form, id: crypto.randomUUID(), createdAt: now, updatedAt: now },
      ]);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) setClients((prev) => prev.filter((c) => c.id !== deleteId));
    setDeleteId(null);
  };

  if (viewClient) {
    const linkedProjects = mockProjects.filter(
      (p) => p.clientId === viewClient.id,
    ).length;

    return (
      <>
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => setViewClient(null)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Clients
        </Button>
        <Card className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <Avatar className="h-24 w-24 shrink-0 border">
              {viewClient.logo ? (
                <AvatarImage src={viewClient.logo} alt={viewClient.name} />
              ) : (
                <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                  {viewClient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="min-w-0 flex-1 space-y-4">
              <div>
                <h2 className="font-heading text-2xl font-bold">
                  {viewClient.name}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Client ID: {viewClient.id}
                </p>
              </div>
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <span className="text-muted-foreground">Created</span>
                  <p className="font-medium">{viewClient.createdAt}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Last updated</span>
                  <p className="font-medium">{viewClient.updatedAt}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Projects</span>
                  <p className="font-medium">{linkedProjects}</p>
                </div>
                {viewClient.logo ? (
                  <div className="sm:col-span-2">
                    <span className="text-muted-foreground">Logo</span>
                    <p className="break-all font-mono text-xs font-medium">
                      {viewClient.logo.length > 120
                        ? `${viewClient.logo.slice(0, 120)}…`
                        : viewClient.logo}
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setViewClient(null);
                    openEdit(viewClient);
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit client
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeleteId(viewClient.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </div>
            </div>
          </div>
        </Card>
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Client?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDelete();
                  setViewClient(null);
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
        title="Clients"
        description="Manage client names and logos"
        action={
          <Button
            onClick={openAdd}
            variant="gradient"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Client
          </Button>
        }
      />
      <Card className="bg-background">
        <Table className="bg-background">
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((c) => (
              <TableRow
                key={c.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setViewClient(c)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      {c.logo ? (
                        <AvatarImage src={c.logo} alt={c.name} />
                      ) : (
                        <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                          {c.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="font-medium">{c.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {c.createdAt}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {c.updatedAt}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`View ${c.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewClient(c);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Edit ${c.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(c);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Delete ${c.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(c.id);
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
              {editClient ? "Edit Client" : "Add Client"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Client Name"
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({ ...f, name: e.target.value }))
              }
            />
            <ImageUrlField
              label="Logo"
              value={form.logo}
              onChange={(v) => setForm((f) => ({ ...f, logo: v }))}
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
            <AlertDialogTitle>Delete Client?</AlertDialogTitle>
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
