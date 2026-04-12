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
import type { TeamMember } from "@/types/dashboard";
import { mockTeam } from "@/data/dashboard-mock";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TeamView() {
  const [team, setTeam] = useState<TeamMember[]>(mockTeam);
  const [viewMember, setViewMember] = useState<TeamMember | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editMember, setEditMember] = useState<TeamMember | null>(null);
  const [form, setForm] = useState({
    fullName: "",
    position: "",
    specialization: "",
    photo: "",
  });

  const openAdd = () => {
    setEditMember(null);
    setForm({ fullName: "", position: "", specialization: "", photo: "" });
    setDialogOpen(true);
  };
  const openEdit = (m: TeamMember) => {
    setEditMember(m);
    setForm({
      fullName: m.fullName,
      position: m.position,
      specialization: m.specialization,
      photo: m.photo,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const now = new Date().toISOString().split("T")[0];
    if (editMember) {
      setTeam((prev) =>
        prev.map((m) =>
          m.id === editMember.id ? { ...m, ...form, updatedAt: now } : m,
        ),
      );
    } else {
      setTeam((prev) => [
        ...prev,
        { ...form, id: crypto.randomUUID(), createdAt: now, updatedAt: now },
      ]);
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) setTeam((prev) => prev.filter((m) => m.id !== deleteId));
    setDeleteId(null);
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  if (viewMember) {
    return (
      <>
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => setViewMember(null)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Team
        </Button>
        <Card className="p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <Avatar className="h-24 w-24 shrink-0 border">
              {viewMember.photo ? (
                <AvatarImage src={viewMember.photo} alt={viewMember.fullName} />
              ) : null}
              <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                {getInitials(viewMember.fullName)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-4">
              <div>
                <h2 className="font-heading text-2xl font-bold">
                  {viewMember.fullName}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Member ID: {viewMember.id}
                </p>
              </div>
              <div className="grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <span className="text-muted-foreground">Position</span>
                  <p className="font-medium">{viewMember.position}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Specialization</span>
                  <p className="font-medium">{viewMember.specialization}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Created</span>
                  <p className="font-medium">{viewMember.createdAt}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Last updated</span>
                  <p className="font-medium">{viewMember.updatedAt}</p>
                </div>
                {viewMember.photo ? (
                  <div className="sm:col-span-2">
                    <span className="text-muted-foreground">Photo</span>
                    <p className="break-all font-mono text-xs font-medium">
                      {viewMember.photo.length > 120
                        ? `${viewMember.photo.slice(0, 120)}…`
                        : viewMember.photo}
                    </p>
                  </div>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setViewMember(null);
                    openEdit(viewMember);
                  }}
                >
                  <Pencil className="mr-2 h-4 w-4" /> Edit member
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setDeleteId(viewMember.id)}
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
              <AlertDialogTitle>Delete Member?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDelete();
                  setViewMember(null);
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
        title="Team"
        description="Manage staff members and roles"
        action={
          <Button onClick={openAdd} variant="gradient">
            <Plus className="mr-2 h-4 w-4" /> Add Member
          </Button>
        }
      />
      <Card className="bg-background">
        <Table className="bg-background">
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.map((m) => (
              <TableRow
                key={m.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setViewMember(m)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      {m.photo ? (
                        <AvatarImage src={m.photo} alt={m.fullName} />
                      ) : null}
                      <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                        {getInitials(m.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{m.fullName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{m.position}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {m.specialization}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {m.createdAt}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`View ${m.fullName}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewMember(m);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Edit ${m.fullName}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openEdit(m);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Delete ${m.fullName}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteId(m.id);
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
              {editMember ? "Edit Member" : "Add Member"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) =>
                setForm((f) => ({ ...f, fullName: e.target.value }))
              }
            />
            <Input
              placeholder="Position"
              value={form.position}
              onChange={(e) =>
                setForm((f) => ({ ...f, position: e.target.value }))
              }
            />
            <Input
              placeholder="Specialization"
              value={form.specialization}
              onChange={(e) =>
                setForm((f) => ({ ...f, specialization: e.target.value }))
              }
            />
            <ImageUrlField
              label="Photo"
              value={form.photo}
              onChange={(v) => setForm((f) => ({ ...f, photo: v }))}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSave} disabled={!form.fullName}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Member?</AlertDialogTitle>
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
