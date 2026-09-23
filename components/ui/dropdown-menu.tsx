"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function DropdownMenu(props: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root {...props} />;
}

function DropdownMenuTrigger(props: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger {...props} />;
}

function DropdownMenuContent({
  className,
  align = "end",
  sideOffset = 8,
  ...props
}: MenuPrimitive.Popup.Props & {
  align?: MenuPrimitive.Positioner.Props["align"];
  sideOffset?: number;
}) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner align={align} sideOffset={sideOffset} className="z-50 outline-none">
        <MenuPrimitive.Popup
          className={cn(
            "min-w-56 origin-[var(--transform-origin)] rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-lg outline-none transition data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0",
            className,
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

const itemClassName =
  "flex min-h-9 cursor-default items-center gap-2 rounded-lg px-2.5 py-2 text-sm outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-muted data-highlighted:text-foreground [&_svg]:size-4 [&_svg]:shrink-0";

function DropdownMenuItem({ className, ...props }: MenuPrimitive.Item.Props) {
  return (
    <MenuPrimitive.Item
      className={cn(itemClassName, className)}
      {...props}
    />
  );
}

function DropdownMenuLinkItem({
  className,
  closeOnClick = true,
  ...props
}: MenuPrimitive.LinkItem.Props) {
  return (
    <MenuPrimitive.LinkItem
      closeOnClick={closeOnClick}
      className={cn(itemClassName, className)}
      {...props}
    />
  );
}

function DropdownMenuLabel({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn("px-2.5 py-2 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLinkItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
};
