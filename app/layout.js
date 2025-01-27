import Layout from "@/components/layout";
import "./globals.css";

export const metadata = {
  title: 'My Awesome Blog!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
