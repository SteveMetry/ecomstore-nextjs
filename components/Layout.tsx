import { PropsWithChildren } from "react";

import { CustomNavbar } from "./CustomNavbar";

interface LayoutProp {
  navbarChildren: string | JSX.Element;
  className?: string;
}

export const Layout = ({
  children,
  navbarChildren,
  className
}: PropsWithChildren<LayoutProp>) => (
  <div className={className}>
    <CustomNavbar>{navbarChildren}</CustomNavbar>
    <div className="h-20"></div>
    {children}
  </div>
);
