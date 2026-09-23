"use client";

import { LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  isNavigationItemActive,
  type NavigationItem,
} from "@/lib/navigation";
import { cn } from "@/lib/utils";

type MobileNavigationProps = {
  items: NavigationItem[];
  isAuthenticated: boolean;
  isLoading: boolean;
  isLoggingOut: boolean;
  onLogout: () => void;
};

export function MobileNavigation({
  items,
  isAuthenticated,
  isLoading,
  isLoggingOut,
  onLogout,
}: MobileNavigationProps) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="icon-lg" aria-label="Mở menu" />
        }
      >
        <Menu aria-hidden="true" />
      </SheetTrigger>
      <SheetContent className="w-[min(22rem,88vw)]">
        <SheetHeader className="border-b pr-12">
          <SheetTitle>Điều hướng</SheetTitle>
          <SheetDescription>
            Khám phá thông tin và quản lý chăm sóc của bạn.
          </SheetDescription>
        </SheetHeader>
        <nav aria-label="Điều hướng di động" className="flex flex-col gap-1 px-3">
          {items.map((item) => {
            const active = isNavigationItemActive(pathname, item.href);
            return (
              <SheetClose
                key={item.href}
                render={
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-2.5 font-medium text-foreground transition-colors hover:bg-muted",
                      active && "bg-primary/10 font-semibold text-primary",
                    )}
                  />
                }
              >
                {item.label}
              </SheetClose>
            );
          })}
        </nav>
        <div className="mt-auto border-t p-4">
          {isLoading ? null : isAuthenticated ? (
            <SheetClose
              render={
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  disabled={isLoggingOut}
                  onClick={onLogout}
                />
              }
            >
              <LogOut aria-hidden="true" />
              {isLoggingOut ? "Đang thoát..." : "Đăng xuất"}
            </SheetClose>
          ) : (
            <SheetClose
              render={
                <Link
                  href="/dang-nhap"
                  className={cn(buttonVariants(), "w-full")}
                />
              }
            >
              Đăng nhập
            </SheetClose>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
