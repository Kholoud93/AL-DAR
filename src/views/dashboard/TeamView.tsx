"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { TeamMember } from "@/types/dashboard";
import { mockTeam } from "@/data/dashboard-mock";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function TeamView() {
  const [team, setTeam] = useState<TeamMember[]>(mockTeam);
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

  return (
    <>
      <PageHeader
        title="Team"
        description="Manage staff members and roles"
        action={
          <Button onClick={openAdd}>
            <Plus className="mr-2 h-4 w-4" /> Add Member
          </Button>
        }
      />
      <Card>
        <Table>
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
              <TableRow key={m.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
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
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(m)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteId(m.id)}
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
            <Input
              placeholder="Photo URL"
              value={form.photo}
              onChange={(e) =>
                setForm((f) => ({ ...f, photo: e.target.value }))
              }
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
