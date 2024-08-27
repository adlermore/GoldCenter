import "@/styles/globals.scss";
import Header from "@/components/layout/Header.jsx";
import Footer from "@/components/layout/Footer.jsx";
import SuccessPopup from "@/components/layout/SuccessPopup.jsx";
import LoginPopup from "./(auth)/components/login/LoginPopup";
import RegisterPopup from "./(auth)/components/register/RegisterPopup";
import { JsonContextProvider } from "@/context/jsonContext";
import { Providers } from "../redux/providers";
import { Toaster } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const metadata = {
  title: "Gold Center",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  return (
    <JsonContextProvider>
      <html lang="en">
        <body className="flex flex-col siteBody  ">
          <Toaster position="bottom-right" />
          <Providers>
            <Header />
            <SuccessPopup />
            <div className="flex-1 main-wrapper">{children}</div>
            <LoginPopup />
            <RegisterPopup />
            <Footer />
          </Providers>
        </body>
      </html>
    </JsonContextProvider>
  );
}
