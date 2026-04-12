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
    <div className="grid min-w-0 grid-cols-1 gap-1.5 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:gap-x-4 sm:gap-y-0">
      <dt className="text-xs font-medium text-muted-foreground sm:pt-0.5">
        {label}
      </dt>
      <dd className="min-w-0 break-words text-sm text-foreground">{children}</dd>
    </div>
  );
}

function CertificateCard({ cert }: { cert: Certificate }) {
  return (
    <Card className="min-w-0 overflow-hidden border-border/80 bg-card/80 shadow-sm">
      <CardHeader className="border-b border-border/60 bg-muted/30 p-4 pb-4 sm:p-6 sm:pb-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0 flex-1 space-y-1">
            <CardTitle className="font-heading text-base font-semibold leading-snug break-words sm:text-lg">
              {cert.title}
            </CardTitle>
            <CardDescription className="text-sm break-words">
              {cert.shortName}
            </CardDescription>
          </div>
          <Badge
            variant={statusVariant(cert.status)}
            className="w-fit shrink-0 self-start sm:self-auto"
          >
            {cert.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-5 sm:px-6 sm:pb-6 sm:pt-6">
        <dl className="space-y-4 sm:space-y-5">
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
                className="inline-flex max-w-full items-start gap-1.5 break-all font-medium text-primary underline-offset-4 hover:underline sm:items-center sm:break-words"
              >
                <span className="min-w-0">{cert.verificationUrl}</span>
                <ExternalLink
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-80 sm:mt-0"
                  aria-hidden
                />
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
    <div className="min-w-0 max-w-full">
      <PageHeader
        title="Certificates"
        description="Company credentials, accreditations, and professional registrations. All fields shown below are illustrative mock data."
      />

      <div className="space-y-5 sm:space-y-6">
        {mockCertificates.map((cert) => (
          <CertificateCard key={cert.id} cert={cert} />
        ))}
      </div>
    </div>
  );
}
