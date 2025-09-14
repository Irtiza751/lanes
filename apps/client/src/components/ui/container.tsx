export function Container({ children }: { children: React.ReactNode }) {
  return <div className="px-4 py-2 overflow-auto h-full">{children}</div>;
}
