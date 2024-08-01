import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { ToastContainer } from "react-toastify";

import { generateMeta } from "~/utils/generateMeta";

import type { MetaFunction } from "@remix-run/node";

import "~/styles/tailwind.css";

export const meta: MetaFunction = generateMeta("Root");

/**
 * Layout component that renders the main structure of the application.
 * @param {React.ReactNode} children - The content to be rendered within the layout.
 * @returns {JSX.Element} The rendered layout component.
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main>{children}</main>
        <ToastContainer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Root component that renders the Outlet from Remix.
 * @returns {JSX.Element} The rendered root component.
 */
export default function App() {
  return <Outlet />;
}
