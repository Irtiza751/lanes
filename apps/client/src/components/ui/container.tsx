export function Container({ children }: { children: React.ReactNode }) {
  return <div className="p-2 overflow-auto">{children}</div>;
}
