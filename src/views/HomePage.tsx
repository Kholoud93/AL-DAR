export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-4.25rem)] flex-col items-center justify-center bg-background px-6 py-16 sm:min-h-[calc(100vh-4.25rem)]">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          ALDAR Engineering Consultants
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Sustainable infrastructure and integrated design solutions.
        </p>
      </div>
    </main>
  );
}
