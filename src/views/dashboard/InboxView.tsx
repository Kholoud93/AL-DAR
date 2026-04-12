"use client";

import { useMemo, useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { CheckCheck, Trash2, Mail, MailOpen, Eye } from "lucide-react";
import { toast } from "sonner";
import type { ContactMessage } from "@/types/dashboard";
import { mockMessages } from "@/data/dashboard-mock";

type InboxFilter = "all" | "unread" | "read";

export default function InboxView() {
  const [messages, setMessages] = useState<ContactMessage[]>(mockMessages);
  const [filter, setFilter] = useState<InboxFilter>("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewMessage, setViewMessage] = useState<ContactMessage | null>(null);
  const [clearReadOpen, setClearReadOpen] = useState(false);
  const [clearAllOpen, setClearAllOpen] = useState(false);

  const unreadCount = messages.filter((m) => !m.isRead).length;
  const readCount = messages.filter((m) => m.isRead).length;

  const filtered = useMemo(() => {
    if (filter === "unread") return messages.filter((m) => !m.isRead);
    if (filter === "read") return messages.filter((m) => m.isRead);
    return messages;
  }, [messages, filter]);

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

  const markAllRead = () => {
    if (unreadCount === 0) return;
    setMessages((prev) => prev.map((m) => ({ ...m, isRead: true })));
    setViewMessage((vm) => (vm ? { ...vm, isRead: true } : null));
    toast.success("All messages marked as read.");
  };

  const confirmClearRead = () => {
    setMessages((prev) => prev.filter((m) => !m.isRead));
    setViewMessage((vm) => (vm?.isRead ? null : vm));
    setClearReadOpen(false);
    toast.success("Read messages removed.");
  };

  const confirmClearAll = () => {
    setMessages([]);
    setViewMessage(null);
    setClearAllOpen(false);
    toast.success("Inbox cleared.");
  };

  return (
    <>
      <PageHeader
        title="Inbox"
        description={`${messages.length} message${messages.length !== 1 ? "s" : ""} · ${unreadCount} unread`}
      />

      <Card className="min-w-0 overflow-hidden border-border/80 bg-background shadow-sm">
        <div className="flex flex-col gap-4 border-b p-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as InboxFilter)}
            className="w-full md:w-auto"
          >
            <TabsList className="grid h-auto w-full grid-cols-3 md:inline-flex md:w-auto">
              <TabsTrigger value="all" className="gap-1.5 px-3">
                All
                <span className="text-xs text-muted-foreground tabular-nums">
                  ({messages.length})
                </span>
              </TabsTrigger>
              <TabsTrigger value="unread" className="gap-1.5 px-3">
                Unread
                <span className="text-xs text-muted-foreground tabular-nums">
                  ({unreadCount})
                </span>
              </TabsTrigger>
              <TabsTrigger value="read" className="gap-1.5 px-3">
                Read
                <span className="text-xs text-muted-foreground tabular-nums">
                  ({readCount})
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              disabled={unreadCount === 0}
              onClick={markAllRead}
            >
              <CheckCheck className="h-4 w-4" />
              Read all
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={readCount === 0}
              onClick={() => setClearReadOpen(true)}
            >
              Clear read
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              disabled={messages.length === 0}
              onClick={() => setClearAllOpen(true)}
            >
              Clear all
            </Button>
          </div>
        </div>

        <Table className="bg-background text-sm md:text-xs">
          <TableHeader>
            <TableRow>
              <TableHead className="w-10" />
              <TableHead>From</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Received</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  {messages.length === 0
                    ? "No messages in your inbox."
                    : filter === "unread"
                      ? "No unread messages."
                      : filter === "read"
                        ? "No read messages."
                        : "No messages."}
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((m) => (
                <TableRow
                  key={m.id}
                  className={`cursor-pointer transition-colors ${
                    !m.isRead
                      ? "bg-info/5 font-semibold"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => openMessage(m)}
                >
                  <TableCell className="w-10">
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
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`View message from ${m.senderName}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          openMessage(m);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Delete message from ${m.senderName}`}
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
              ))
            )}
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
                <span className="text-sm text-muted-foreground">Received:</span>
                <p className="mt-0.5 text-sm font-medium">
                  {viewMessage.receivedAt}
                </p>
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
            <AlertDialogTitle>Delete message?</AlertDialogTitle>
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

      <AlertDialog open={clearReadOpen} onOpenChange={setClearReadOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove all read messages?</AlertDialogTitle>
            <AlertDialogDescription>
              {readCount} read message{readCount !== 1 ? "s" : ""} will be
              deleted. Unread messages stay in your inbox.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmClearRead}>
              Remove read
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={clearAllOpen} onOpenChange={setClearAllOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear entire inbox?</AlertDialogTitle>
            <AlertDialogDescription>
              All {messages.length} message{messages.length !== 1 ? "s" : ""}{" "}
              will be permanently removed. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmClearAll}
            >
              Clear all
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
