import type { Metadata, Viewport } from "next";
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
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-game-ui",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#142C2A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nolyminhdz-dev.github.io"),
  title: {
    default: "TRẢI ĐỜI — Một Thế Giới Việt Nam Để Sống, Khám Phá Và Kết Nối",
    template: "%s | TRẢI ĐỜI",
  },
  description:
    "Bắt đầu từ Xóm Bến Dừa miền Tây. Trải nghiệm đời sống, trồng rau, trò chuyện cùng Bà Ngoại & Ông Thổ Địa, khám phá 5 vùng đất Việt Nam. Bản thử nghiệm Pixel Build #658 hướng tới Unity 6 Stylized 3D Anime.",
  keywords: [
    "Trải Đời",
    "Game Trải Đời",
    "Xóm Bến Dừa",
    "Game Việt Nam",
    "Cozy Life Simulation",
    "Unity 6 Stylized 3D Anime",
  ],
  authors: [{ name: "TRẢI ĐỜI Team" }],
  creator: "TRẢI ĐỜI Team",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://nolyminhdz-dev.github.io/",
    siteName: "TRẢI ĐỜI",
    title: "TRẢI ĐỜI — Một Thế Giới Việt Nam Để Sống, Khám Phá Và Kết Nối",
    description:
      "Bắt đầu từ Xóm Bến Dừa miền Tây. Gặp gỡ những con người thân thuộc, chăm sóc mảnh vườn quê và khám phá 5 vùng đất Việt Nam.",
    images: [
      {
        url: "/game-assets/screenshots/world-thodia.png",
        width: 1212,
        height: 702,
        alt: "TRẢI ĐỜI — Toàn cảnh Xóm Bến Dừa & Miếu Ông Thổ Địa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TRẢI ĐỜI — Một Thế Giới Việt Nam Để Sống, Khám Phá Và Kết Nối",
    description:
      "Khám phá thế giới đời sống và văn hóa Việt Nam từ Xóm Bến Dừa miền Tây.",
    images: ["/game-assets/screenshots/world-thodia.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <body className="antialiased selection:bg-[#F2D39B] selection:text-[#142C2A]">
        {children}
      </body>
    </html>
  );
}
