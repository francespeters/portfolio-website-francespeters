import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import CursorProvider from "./components/providers/CursorProvider";
import Footer from "./components/layout/Footer";
import NewHeader from "./components/layout/NewHeader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CursorProvider>
          <div>
            <NewHeader />
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