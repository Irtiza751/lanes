export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}
