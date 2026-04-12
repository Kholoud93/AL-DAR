"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import type { Country } from "@/types/dashboard";
import { mockCountries } from "@/data/dashboard-mock";
import {
  loadCountries,
  saveCountries,
} from "@/lib/dashboard-countries-storage";
import { toast } from "sonner";

export default function CountriesView() {
  const [countries, setCountries] = useState<Country[]>(mockCountries);
  const [viewCountry, setViewCountry] = useState<Country | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editCountry, setEditCountry] = useState<Country | null>(null);
  const [form, setForm] = useState({ name: "", code: "" });

  useEffect(() => {
    setCountries(loadCountries());
  }, []);

  const openAdd = () => {
    setEditCountry(null);
    setForm({ name: "", code: "" });
    setDialogOpen(true);
  };

  const openEdit = (c: Country) => {
    setEditCountry(c);
    setForm({ name: c.name, code: c.code });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const name = form.name.trim();
    const code = form.code.trim().toUpperCase().slice(0, 2);
    if (!name) {
      toast.error("Country name is required.");
      return;
    }
    if (!/^[A-Z]{2}$/.test(code)) {
      toast.error("Use a 2-letter ISO country code (e.g. SA, AE).");
      return;
    }
    const now = new Date().toISOString().split("T")[0];
    let next: Country[];
    if (editCountry) {
      next = countries.map((c) =>
        c.id === editCountry.id
          ? { ...c, name, code, updatedAt: now }
          : c,
      );
    } else {
      if (countries.some((c) => c.code === code)) {
        toast.error("That country code is already in use.");
        return;
      }
      next = [
        ...countries,
        {
          id: crypto.randomUUID(),
          name,
          code,
          createdAt: now,
          updatedAt: now,
        },
      ];
    }
    setCountries(next);
    saveCountries(next);
    toast.success(editCountry ? "Country updated." : "Country added.");
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const next = countries.filter((c) => c.id !== deleteId);
    setCountries(next);
    saveCountries(next);
    toast.success("Country removed.");
    setDeleteId(null);
  };

  if (viewCountry) {
    return (
      <>
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => setViewCountry(null)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Countries
        </Button>
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h2 className="font-heading text-2xl font-bold">
                {viewCountry.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Country ID: {viewCountry.id}
              </p>
            </div>
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <span className="text-muted-foreground">ISO code</span>
                <div className="mt-1">
                  <Badge
                    variant="secondary"
                    className="font-mono text-sm font-semibold tracking-wide"
                  >
                    {viewCountry.code}
                  </Badge>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Created</span>
                <p className="font-medium">{viewCountry.createdAt}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Last updated</span>
                <p className="font-medium">{viewCountry.updatedAt}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setViewCountry(null);
                  openEdit(viewCountry);
                }}
              >
                <Pencil className="mr-2 h-4 w-4" /> Edit country
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setDeleteId(viewCountry.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </Button>
            </div>
          </div>
        </Card>
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete country?</AlertDialogTitle>
              <AlertDialogDescription>
                Projects that use this country will keep its ID until you edit
                them. You can add the country again later with the same code.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDelete();
                  setViewCountry(null);
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
        title="Countries"
        description="Manage countries available when creating projects"
        action={
          <Button onClick={openAdd} variant="gradient">
            <Plus className="mr-2 h-4 w-4" /> Add Country
          </Button>
        }
      />
      <Card className="bg-background">
        <Table className="bg-background">
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {countries.map((c) => (
              <TableRow
                key={c.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setViewCountry(c)}
              >
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="font-mono text-xs font-semibold tracking-wide"
                  >
                    {c.code}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
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
                        setViewCountry(c);
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
              {editCountry ? "Edit Country" : "Add Country"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="country-name">Country name</Label>
              <Input
                id="country-name"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Qatar"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country-code">ISO code (2 letters)</Label>
              <Input
                id="country-code"
                value={form.code}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    code: e.target.value.toUpperCase().slice(0, 2),
                  }))
                }
                placeholder="QA"
                maxLength={2}
                className="font-mono uppercase"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete country?</AlertDialogTitle>
            <AlertDialogDescription>
              Projects that use this country will keep its ID until you edit
              them. You can add the country again later with the same code.
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
