import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import Header from "./components/layout/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div>
          <Header />
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}