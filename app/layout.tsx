import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import Header from "./components/layout/Header";
import ProjectRouteBodyClass from "./components/layout/ProjectRouteBodyClass";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProjectRouteBodyClass />
        <div className="mx-auto max-w-[1400px] px-6">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}