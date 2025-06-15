import { Outlet } from "react-router";

function BoardLayout() {
  return (
    <main>
      <h1>Board Layout</h1>
      <Outlet />
    </main>
  );
}

export default BoardLayout;
