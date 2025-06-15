import { Outlet } from "react-router";

// function AuthLayout({ children }: { children: React.ReactNode }) {
//   return <main>{children}</main>;
// }

function AuthLayout() {
  return (
    <main>
      <h1>Auth Layout</h1>
      <Outlet />
    </main>
  );
}

export default AuthLayout;
