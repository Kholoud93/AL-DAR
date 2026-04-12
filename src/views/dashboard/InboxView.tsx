"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, Mail, MailOpen } from "lucide-react";
import type { ContactMessage } from "@/types/dashboard";
import { mockMessages } from "@/data/dashboard-mock";

export default function InboxView() {
  const [messages, setMessages] = useState<ContactMessage[]>(mockMessages);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewMessage, setViewMessage] = useState<ContactMessage | null>(null);

  const openMessage = (m: ContactMessage) => {
    if (!m.isRead) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === m.id ? { ...msg, isRead: true } : msg,
        ),
      );
    }
    setViewMessage({ ...m, isRead: true });
  };

  const handleDelete = () => {
    if (deleteId) {
      setMessages((prev) => prev.filter((m) => m.id !== deleteId));
      if (viewMessage?.id === deleteId) setViewMessage(null);
    }
    setDeleteId(null);
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <>
      <PageHeader
        title="Inbox"
        description={`${unreadCount} unread message${unreadCount !== 1 ? "s" : ""}`}
      />
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              <TableHead>From</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Received</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((m) => (
              <TableRow
                key={m.id}
                className={`cursor-pointer transition-colors ${
                  !m.isRead
                    ? "bg-info/5 font-semibold"
                    : "hover:bg-muted/50"
                }`}
                onClick={() => openMessage(m)}
              >
                <TableCell className="w-8">
                  {m.isRead ? (
                    <MailOpen className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Mail className="h-4 w-4 text-info" />
                  )}
                </TableCell>
                <TableCell className={!m.isRead ? "font-semibold" : ""}>
                  {m.senderName}
                </TableCell>
                <TableCell
                  className={`text-sm ${!m.isRead ? "font-semibold" : "text-muted-foreground"}`}
                >
                  {m.subject}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {m.receivedAt}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteId(m.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!viewMessage} onOpenChange={() => setViewMessage(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              Message from {viewMessage?.senderName}
            </DialogTitle>
          </DialogHeader>
          {viewMessage && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Email:</span>{" "}
                  <span className="ml-1 font-medium">{viewMessage.email}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Phone:</span>{" "}
                  <span className="ml-1 font-medium">{viewMessage.phone}</span>
                </div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Subject:</span>
                <p className="mt-0.5 font-medium">{viewMessage.subject}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Message:</span>
                <p className="mt-1 rounded-lg bg-muted p-3 text-sm leading-relaxed">
                  {viewMessage.body}
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setDeleteId(viewMessage.id);
                    setViewMessage(null);
                  }}
                >
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" /> Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message?</AlertDialogTitle>
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
