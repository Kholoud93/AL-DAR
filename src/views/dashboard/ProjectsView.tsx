"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import type { Project } from "@/types/dashboard";
import {
  mockProjects,
  mockClients,
  mockServiceFields,
  mockServiceTypes,
} from "@/data/dashboard-mock";

const statusColors: Record<string, string> = {
  "In Progress": "bg-info/15 text-info border-info/30",
  Completed: "bg-success/15 text-success border-success/30",
  "On Hold": "bg-warning/15 text-warning border-warning/30",
};

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewProject, setViewProject] = useState<Project | null>(null);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "In Progress" as Project["status"],
    location: "",
    clientId: "",
    serviceFieldId: "",
    serviceTypeIds: [] as string[],
  });

  const resetForm = () =>
    setForm({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "In Progress",
      location: "",
      clientId: "",
      serviceFieldId: "",
      serviceTypeIds: [],
    });

  const openAdd = () => {
    resetForm();
    setEditProject(null);
    setDialogOpen(true);
  };
  const openEdit = (p: Project) => {
    setEditProject(p);
    setForm({
      name: p.name,
      description: p.description,
      startDate: p.startDate,
      endDate: p.endDate,
      status: p.status,
      location: p.location,
      clientId: p.clientId,
      serviceFieldId: p.serviceFieldId,
      serviceTypeIds: p.serviceTypeIds,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const now = new Date().toISOString().split("T")[0];
    if (editProject) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editProject.id ? { ...p, ...form, updatedAt: now } : p,
        ),
      );
    } else {
      const newP: Project = {
        ...form,
        id: crypto.randomUUID(),
        images: [],
        createdAt: now,
        updatedAt: now,
      };
      setProjects((prev) => [...prev, newP]);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) setProjects((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  };

  const toggleServiceType = (id: string) => {
    setForm((prev) => ({
      ...prev,
      serviceTypeIds: prev.serviceTypeIds.includes(id)
        ? prev.serviceTypeIds.filter((s) => s !== id)
        : [...prev.serviceTypeIds, id],
    }));
  };

  if (viewProject) {
    const client = mockClients.find((c) => c.id === viewProject.clientId);
    const field = mockServiceFields.find(
      (f) => f.id === viewProject.serviceFieldId,
    );
    const types = mockServiceTypes.filter((t) =>
      viewProject.serviceTypeIds.includes(t.id),
    );
    return (
      <>
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => setViewProject(null)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
        </Button>
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold">
                {viewProject.name}
              </h2>
              <Badge
                className={`mt-2 ${statusColors[viewProject.status]}`}
              >
                {viewProject.status}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setViewProject(null);
                  openEdit(viewProject);
                }}
              >
                <Pencil className="mr-1.5 h-3.5 w-3.5" /> Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteId(viewProject.id)}
              >
                <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Location:</span>{" "}
              <span className="ml-2 font-medium">{viewProject.location}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Client:</span>{" "}
              <span className="ml-2 font-medium">{client?.name || "—"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Start Date:</span>{" "}
              <span className="ml-2 font-medium">{viewProject.startDate}</span>
            </div>
            <div>
              <span className="text-muted-foreground">End Date:</span>{" "}
              <span className="ml-2 font-medium">{viewProject.endDate}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Service Field:</span>{" "}
              <span className="ml-2 font-medium">{field?.name || "—"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">Service Types:</span>
              {types.map((t) => (
                <Badge key={t.id} variant="secondary">
                  {t.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-muted-foreground">Description:</span>
            <p className="mt-1 text-sm">{viewProject.description}</p>
          </div>
        </Card>
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Project?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDelete();
                  setViewProject(null);
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
        title="Projects"
        description="Manage your firm's portfolio"
        action={
          <Button onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" /> Add Project
          </Button>
        }
      />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((p) => (
              <TableRow
                key={p.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setViewProject(p)}
              >
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>
                  <Badge className={statusColors[p.status]}>{p.status}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {p.createdAt}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {p.updatedAt}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewProject(p);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(p);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(p.id);
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
        <DialogContent className="max-h-[85vh] max-w-lg overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editProject ? "Edit Project" : "Add Project"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Project Name"
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
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, startDate: e.target.value }))
                }
              />
              <Input
                type="date"
                value={form.endDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, endDate: e.target.value }))
                }
              />
            </div>
            <Select
              value={form.status}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, status: v as Project["status"] }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Location"
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
            />
            <Select
              value={form.clientId}
              onValueChange={(v) => setForm((f) => ({ ...f, clientId: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Client" />
              </SelectTrigger>
              <SelectContent>
                {mockClients.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={form.serviceFieldId}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, serviceFieldId: v }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Service Field" />
              </SelectTrigger>
              <SelectContent>
                {mockServiceFields.map((field) => (
                  <SelectItem key={field.id} value={field.id}>
                    {field.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div>
              <p className="mb-2 text-sm font-medium">Service Types</p>
              <div className="flex flex-wrap gap-2">
                {mockServiceTypes.map((t) => (
                  <Badge
                    key={t.id}
                    variant={
                      form.serviceTypeIds.includes(t.id) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleServiceType(t.id)}
                  >
                    {t.name}
                  </Badge>
                ))}
              </div>
            </div>
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
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
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
