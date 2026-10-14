import type { Metadata } from "next";
import { Oswald, Chakra_Petch, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const oswaldTrailer = Oswald({
  subsets: ["vietnamese", "latin"],
  weight: ["600", "700"],
  variable: "--font-game-display",
  display: "swap",
});

const chakraHero = Chakra_Petch({
  subsets: ["vietnamese", "latin"],
  weight: ["600", "700"],
  variable: "--font-game-chakra",
  display: "swap",
});

const beVietnamUi = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-game-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TRẢI ĐỜI — Thế Giới Xã Hội Pixel Quê Hương Việt Nam",
  description:
    "Trở về quê ngoại Xóm Bến Dừa, gieo những hạt giống đầu tiên, ghé sạp rau Cô Sáu Hiền, lắng nghe 5 kỷ vật của Ngoại và quay Thiên Cơ Đại Luân Ông Thổ Địa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${oswaldTrailer.variable} ${chakraHero.variable} ${beVietnamUi.variable}`}
    >
      <body className="antialiased selection:bg-[#C99A35] selection:text-[#170E09]">
        {children}
      </body>
    </html>
  );
}
