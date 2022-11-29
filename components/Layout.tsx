import { PropsWithChildren } from "react";

import { CustomNavbar } from "./CustomNavbar";

interface LayoutProp {
  navbarChildren: string | JSX.Element;
}

export const Layout = ({
  children,
  navbarChildren
}: PropsWithChildren<LayoutProp>) => (
  <>
    <CustomNavbar>{navbarChildren}</CustomNavbar>
    <div className="h-20"></div>
    {children}
  </>
);
