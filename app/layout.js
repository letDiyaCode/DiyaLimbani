import "./globals.css";
import Navbar from "../components/Navbar";
import NetworkBackground from "../components/NetworkBackground";
import CursorFX from "../components/CursorFX";

export const metadata = {
  title: "Diya Limbani",
  description: "Personal portfolio of Diya Limbani.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NetworkBackground variant="glow" />
        <CursorFX variant="glow" />
        <Navbar />
        <main className="page">{children}</main>
        <footer className="footer">
          <p>© {new Date().getFullYear()} Diya Limbani</p>
        </footer>
      </body>
    </html>
  );
}
