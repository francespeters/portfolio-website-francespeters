import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import Header from "./components/layout/Header";
import CursorProvider from "./components/providers/CursorProvider";
import Footer from "./components/layout/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CursorProvider>
          <div>
            <Header />
          </div>
          <main>{children}</main>
          <div>
            <Footer />
          </div>
        </CursorProvider>

      </body>
    </html>
  );
}