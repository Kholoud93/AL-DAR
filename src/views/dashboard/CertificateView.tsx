"use client";

import type { ReactNode } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockCertificates } from "@/data/dashboard-mock";
import type { Certificate, CertificateStatus } from "@/types/dashboard";
import { ExternalLink } from "lucide-react";

function statusVariant(
  status: CertificateStatus,
): "default" | "secondary" | "destructive" {
  if (status === "Active") return "default";
  if (status === "Expiring soon") return "secondary";
  return "destructive";
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-4">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="text-sm text-foreground">{children}</dd>
    </div>
  );
}

function CertificateCard({ cert }: { cert: Certificate }) {
  return (
    <Card className="overflow-hidden border-border/80 bg-card/80 shadow-sm">
      <CardHeader className="border-b border-border/60 bg-muted/30 pb-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            <CardTitle className="font-heading text-lg leading-snug">
              {cert.title}
            </CardTitle>
            <CardDescription className="text-sm">{cert.shortName}</CardDescription>
          </div>
          <Badge variant={statusVariant(cert.status)} className="w-fit shrink-0">
            {cert.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <dl className="space-y-4">
          <DetailRow label="Issuing body">{cert.issuingBody}</DetailRow>
          <DetailRow label="Credential / license ID">{cert.credentialId}</DetailRow>
          <DetailRow label="Issue date">{cert.issueDate}</DetailRow>
          <DetailRow label="Expiry date">
            {cert.expiryDate.trim() ? cert.expiryDate : "No expiry (lifetime)"}
          </DetailRow>
          <DetailRow label="Category">{cert.category}</DetailRow>
          <DetailRow label="Scope & standards">
            <span className="whitespace-normal">{cert.scope}</span>
          </DetailRow>
          <DetailRow label="Registered address">
            <span className="whitespace-normal">{cert.registeredAddress}</span>
          </DetailRow>
          <DetailRow label="Verification">
            {cert.verificationUrl ? (
              <a
                href={cert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-primary underline-offset-4 hover:underline"
              >
                {cert.verificationUrl}
                <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
              </a>
            ) : (
              <span className="text-muted-foreground">Not provided</span>
            )}
          </DetailRow>
          <DetailRow label="Notes">
            <span className="whitespace-normal text-muted-foreground">
              {cert.additionalNotes}
            </span>
          </DetailRow>
        </dl>
      </CardContent>
    </Card>
  );
}

export default function CertificateView() {
  return (
    <div>
      <PageHeader
        title="Certificates"
        description="Company credentials, accreditations, and professional registrations. All fields shown below are illustrative mock data."
      />

      <div className="space-y-6">
        {mockCertificates.map((cert) => (
          <CertificateCard key={cert.id} cert={cert} />
        ))}
      </div>
    </div>
  );
}
