import "./globals.css";

export const metadata = {
  title: "KhataFlow - Personal Finance",
  description: "A simple, responsive personal-finance web application.",
};

/*
// Previous implementation:
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

// Changed because: Need to include Navbar and Footer for Phase 2 Home Page layout.
*/

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/context/AuthContext";

// OLD CODE: previous implementation preserved for project history.
// export default function RootLayout({ children }) {
//   return (
//     <html lang="en" className="h-full antialiased scroll-smooth">
//       <body className="min-h-full flex flex-col">
//         <Navbar />
//         <main className="flex-1">
//           {children}
//         </main>
//         <Footer />
//       </body>
//     </html>
//   );
// }
// REASON FOR CHANGE: Wrapping the application with AuthProvider for global authentication state.

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
