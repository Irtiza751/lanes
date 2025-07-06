import { Link, useLocation } from "react-router";
import { SideNav } from "../models/side-nav";
// import { Separator } from "@/shared/components/ui/seperator";
import { cn } from "@/shared/lib/cn";
import { EllipsisVertical } from "lucide-react";

interface NavItemProps {
  item: SideNav;
  level?: number;
}

export function NavItem({ item: menu, level = 0 }: NavItemProps) {
  const location = useLocation();

  return (
    <li key={menu.name} className="mb-2 capitalize text-muted-foreground">
      {!menu.icon ? (
        <div className="flex items-center mb-2 hover:bg-foreground/5 cursor-pointer py-1 px-2 rounded-md">
          <span className="flex-1 uppercase text-xs text-muted-foreground">{menu.name}</span>
        </div>
      ) : (
        <div className="flex gap-2 items-center mb-2 hover:bg-foreground/5 cursor-pointer py-1 px-2 rounded-md">
          <div className="flex gap-2 items-center flex-1">
          {menu.icon}
          <span className="capitalize text-foreground font-medium">{menu.name}</span>
          </div>
          {menu.options && (
            <button>
            <EllipsisVertical size={12} />
            </button>
          )}
        </div>
      )}

      {menu.children && menu.children.map((item) =>
        item.children ? (
          <NavItem key={item.name} item={item} level={level + 1} />
        ) : (
          <Link
            key={item.name}
            className={cn(
              'flex items-center gap-2 py-1 px-2 hover:bg-foreground/5 rounded-md mb-2 text-foreground',
              { 'bg-foreground/5': location.pathname === item.href },
              level > 0 && "ml-2"
            )}
            to={item.href}
          >
            {item.icon}
            {item.name}
          </Link>
        )
      )}
    </li>
  );
}