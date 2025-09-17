export function Container({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-2 overflow-auto h-full">{children}</div>;
}
