import "./globals.css";

export const metadata = {
  title: "Diya Limbani",
  description: "Personal portfolio of Diya Limbani.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
