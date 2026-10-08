import { NavLink, Outlet } from "react-router-dom";
import { useTree } from "@/app/tree/tree-context";

export function AppShell() {
  const { tree } = useTree();

  return (
    <div className="shell">
      <header className="shell-header">
        <NavLink to="/" end className="wordmark">
          <span className="wordmark-mark" aria-hidden="true" />
          FileTree
        </NavLink>
        <nav className="shell-nav" aria-label="Główne">
          <NavLink to="/" end className={navClass}>
            Import
          </NavLink>
          {tree ? (
            <NavLink to="/tree" className={navClass}>
              Eksplorator
            </NavLink>
          ) : null}
        </nav>
      </header>
      <main className="shell-main">
        <Outlet />
      </main>
    </div>
  );
}

function navClass({ isActive }: { isActive: boolean }): string {
  return isActive ? "shell-link is-active" : "shell-link";
}
