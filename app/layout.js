import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Diya Limbani",
  description: "Personal portfolio of Diya Limbani.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-glow" aria-hidden="true" />
        <Navbar />
        <main className="page">{children}</main>
        <footer className="footer">
          <p>© {new Date().getFullYear()} Diya Limbani</p>
        </footer>
      </body>
    </html>
  );
}
