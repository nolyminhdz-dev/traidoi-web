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
  themeColor: "#193D34",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const SITE_TITLE = "TRẢI ĐỜI — Về Xóm Chơi! | Game Đời Sống & Khám Phá Việt Nam";
const SITE_DESCRIPTION =
  "Trở về Xóm Bến Dừa yên bình miền Tây sông nước. Trải nghiệm đời sống nông thôn bình dị, chăm sóc mảnh vườn rau củ, quay lộc đầu mùa, chuyện trò cùng Bà Ngoại & Ông Thổ Địa, và tự do khám phá 5 vùng đất kỳ thú của Việt Nam.";
const SITE_URL = "https://nolyminhdz-dev.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | TRẢI ĐỜI",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Trải Đời",
    "Game Trải Đời",
    "Về Xóm Chơi",
    "Xóm Bến Dừa",
    "Game Việt Nam",
    "Game Nông Trại Việt Nam",
    "Cozy Life Sim",
    "Khám Phá Việt Nam",
    "Bà Ngoại",
    "Ông Thổ Địa",
    "Trò Chơi Dân Gian",
  ],
  authors: [{ name: "TRẢI ĐỜI Team" }],
  creator: "TRẢI ĐỜI Team",
  publisher: "TRẢI ĐỜI Studio",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "TRẢI ĐỜI",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
      <body className="antialiased selection:bg-[#F5CC72] selection:text-[#193D34]">
        {children}
      </body>
    </html>
  );
}
