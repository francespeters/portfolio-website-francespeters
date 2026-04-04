import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import '../fonts.css';

import Header from "./components/layout/Header";
import CursorProvider from "./components/providers/CursorProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CursorProvider>
          <div>
            <Header />
          </div>
          <main>{children}</main>
        </CursorProvider>
      </body>
    </html>
  );
}