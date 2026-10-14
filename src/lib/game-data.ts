export interface NgoaiKeepsake {
  id: string;
  title: string;
  actionLabel: string;
  location: string;
  iconType: "flame" | "moon" | "hearth" | "droplets" | "radio";
  rewardText: string;
  lines: string[];
}

export const NGOAI_KEEPSAKES: NgoaiKeepsake[] = [
  {
    id: "altar",
    title: "Bàn thờ gia tiên",
    actionLabel: "Thắp nén nhang trầm",
    location: "Gian chính Nhà Ngoại",
    iconType: "flame",
    rewardText: "Tâm tĩnh lặng — Giữ nếp nhà xưa",
    lines: [
      "Thắp cho ông bà nén nhang, mình sống có trước có sau, con nghen.",
      "Nhang cháy tới đâu thì lòng lắng tới đó. Con cứ thắp rồi ngồi một chút.",
      "Bàn thờ lau bằng khăn ẩm thôi, đừng chà mạnh tay. Đồ cũ, phải thương nó.",
      "Rằm ngoại cắm bó hoa dì Sen chừa, con nhớ giữ nếp đó nghen.",
      "Có chuyện gì trong bụng thì thưa với ông bà. Hổng ai cười con đâu.",
    ],
  },
  {
    id: "hammock",
    title: "Chiếc võng xếp hiên sau",
    actionLabel: "Đung đưa võng trưa hè",
    location: "Góc nhà mát rượi",
    iconType: "moon",
    rewardText: "+15 Sức khỏe — Nghe gió qua mái lá",
    lines: [
      "Cái võng này ngoại ru má con, rồi ru luôn con. Kẽo kẹt vậy mà ngủ ngon lắm.",
      "Trưa nắng cứ nằm võng nghe gió qua mái, đừng lo gì hết.",
      "Võng sờn rồi mà ngoại hổng nỡ thay. Nằm quen lưng rồi con.",
      "Nằm võng thì đung đưa chân thôi nghen, đừng đạp vô vách, ngoại mới quét vôi hồi tháng trước.",
      "Ngủ trưa một giấc cho đỡ mệt thôi, dậy ra vườn coi rau muống con tưới chưa.",
    ],
  },
  {
    id: "hearth",
    title: "Bếp củi chuối nếp nướng",
    actionLabel: "Chụm củi nướng chuối nếp",
    location: "Gian bếp tro hồng",
    iconType: "hearth",
    rewardText: "+20 Độ no — Thơm lừng cốt dừa",
    lines: [
      "Nhóm bếp thì chụm củi cho thưa, lửa mới thở được. Chụm dày quá nó ngộp.",
      "Chuối nướng phải trở tay cho đều. Nóng thì thổi, đừng bỏ.",
      "Nồi cơm để trên than hồng, ai về trễ cũng có cơm nóng. Con nhớ nghen.",
      "Nước cốt dừa chan lúc chuối còn nóng mới thơm. Để nguội là mất mùi.",
      "Bếp ấm thì nhà ấm. Con ăn cho no rồi hẵng đi chơi.",
    ],
  },
  {
    id: "water",
    title: "Lu nước mưa đất nung",
    actionLabel: "Múc gáo nước mưa mát lạnh",
    location: "Sân gạch bên hông nhà",
    iconType: "droplets",
    rewardText: "+20 Độ mát — Ngọt lành sương sớm",
    lines: [
      "Múc nước thì múc từ từ, đổ ào một cái là nước đục hết.",
      "Tưới sáng sớm, cây uống nước còn mát sương mới khỏe. Trưa nắng tưới là nấu rễ nó.",
      "Nhớ đậy nắp lu kẻo lăng quăng. Có nước sạch mới có rau xanh.",
      "Một gáo cho một gốc, đừng tham. Cây cũng biết no.",
      "Nước mưa hứng riêng một lu mà gội đầu, tóc mượt lắm con.",
    ],
  },
  {
    id: "porch",
    title: "Hiên nhà nghe đờn ca",
    actionLabel: "Ngồi lại hiên nhà uống trà",
    location: "Trước hiên nhà ngoại",
    iconType: "radio",
    rewardText: "Bình an — Lắng nghe nhịp chiều quê",
    lines: [
      "Chiều ra hiên ngồi, nghe cải lương, ngó trời đổi màu. Vậy là đủ một ngày.",
      "Ai đi ngang cũng ghé hiên uống chén trà. Hổng ai nghèo đi vì mời nhau một chén.",
      "Con đi đâu thì đi, cái hiên này vẫn còn đó cho con ghé.",
      "Sáng ngoại quét sân, lá xoài rụng nhiều là sắp có khách.",
      "Ngồi coi con chim chuyền cành cũng vui. Có thời giờ ngồi coi là giàu rồi.",
    ],
  },
];

export interface VillageCharacter {
  id: string;
  name: string;
  role: string;
  location: string;
  personality: string;
  portrait: string;
  portraitTalk: string;
  statusBadge: string;
  backstory: string;
  quotes: string[];
  questHint: string;
}

export const VILLAGE_CHARACTERS: VillageCharacter[] = [
  {
    id: "ba-ngoai",
    name: "Bà Ngoại",
    role: "Linh hồn của căn nhà ba gian",
    location: "Hiên Nhà Ngoại — Xóm Bến Dừa",
    personality: "Hiền từ, chu đáo, thương con cháu hết mực",
    portrait: "/game-assets/pixel/portrait-grandma.png",
    portraitTalk: "/game-assets/pixel/portrait-grandma-talk.png",
    statusBadge: "NPC Cốt Lõi — Build #658",
    backstory:
      "Người giữ lửa cho căn nhà mái lá bên rặng dừa. Dù con cháu đi xa về gần, Ngoại luôn để dành phần cơm nóng trên bếp tro hồng và 3 luống đất sau hè chờ cháu về gieo hạt.",
    quotes: [
      "Trời ơi cục vàng của ngoại, mới về sao không báo trước để bà nấu cơm giặt mền gối cho con.",
      "Đi đâu cũng nhớ chạy chậm, tới bữa về ăn cơm nghen con.",
      "Rau muống con tự tay tưới nước mưa, luộc lên chấm kho quẹt là ngọt nhứt trên đời.",
    ],
    questHint: "Nhiệm vụ khởi đầu: Trồng và thu hoạch vụ rau muống đầu tiên sau hè nhà Ngoại.",
  },
  {
    id: "ong-tho-dia",
    name: "Ông Thổ Địa",
    role: "Thần bảo hộ Xóm Bến Dừa",
    location: "Miếu Đỏ Đầu Làng",
    personality: "Hào sảng Nam Bộ, hóm hỉnh, trọng chữ hiếu và lòng thảo thơm",
    portrait: "/game-assets/pixel/portrait-tho-dia.png",
    portraitTalk: "/game-assets/pixel/portrait-tho-dia-talk.png",
    statusBadge: "NPC Tương Tác — Build #658",
    backstory:
      "Vị thần dân gian gắn bó với từng gốc cây, bến nước miền Tây. Ông thường đứng phe phẩy quạt mo bên ngôi miếu nhỏ, chứng giám những việc làm tử tế của dân làng.",
    quotes: [
      "Mới về quê ngoại hả con? Ghé miếu thắp nén nhang thơm, sống có trước có sau thì đi đâu cũng bình an!",
      "Tay làm hàm nhai! Đem hạt giống về gieo 3 ô đất sau nhà ngoại là mai có lộc liền.",
      "Của thiên nhiên ban tặng, biết thương cây thương đất thì trời chẳng phụ lòng người.",
    ],
    questHint: "Tương tác: Thắp hương tại Miếu Đỏ và mở khóa Đại Luân Quay Lộc đầu mùa.",
  },
  {
    id: "co-sau-hien",
    name: "Cô Sáu Hiền",
    role: "Chủ sạp nông sản Chợ Bến Dừa",
    location: "Sạp Rau Củ Chợ Lớn",
    personality: "Xởi lởi, bộc trực, buôn bán giữ chữ tín",
    portrait: "/game-assets/pixel/portrait-vendor.png",
    portraitTalk: "/game-assets/pixel/portrait-vendor-talk.png",
    statusBadge: "Hệ Thống Giao Dịch — Build #658",
    backstory:
      "Người phụ nữ tần tảo thức dậy từ 5 giờ sáng để bày sạp rau củ, trứng gà ta mới đẻ. Cô Sáu luôn thu mua nông sản của người chơi với giá công bằng để khuyến khích tụi nhỏ chăm làm vườn.",
    quotes: [
      "Rau muống mới hái sáng nay còn đọng sương đây con! Trồng được bao nhiêu mang ra sạp cô thu mua hết!",
      "Mua thêm ổ trứng gà ta đem về biếu ngoại, trứng mới đẻ sáng nay lòng đỏ tươi rói.",
    ],
    questHint: "Hoạt động: Thu mua rau muống vườn nhà (+3.800 Xu Làng/bó) và bán nhu yếu phẩm.",
  },
  {
    id: "nghe-nhan-vinh",
    name: "Nghệ Nhân Vinh (Bảy Đờn Cò)",
    role: "Người giữ nhịp đờn ca tài tử bến sông",
    location: "Bến Đò Chợ Bến Dừa",
    personality: "Trầm mặc, sâu sắc, nặng lòng với làn điệu quê hương",
    portrait: "/game-assets/pixel/portrait-npc-vinh.png",
    portraitTalk: "/game-assets/pixel/portrait-npc-vinh-talk.png",
    statusBadge: "NPC Văn Hóa — Build #658",
    backstory:
      "Mỗi buổi chiều khi nắng ngả màu vàng cam trên mặt sông, chú Vinh lại mang cây đờn kìm ra bến nước so dây, dạo những câu vọng cổ mộc mạc cho bà con đi chợ chiều lắng nghe.",
    quotes: [
      "Con nước lớn ròng cũng như nhịp đời vậy con. Ngồi xuống nghe chú dạo một câu vọng cổ cho nhẹ lòng.",
      "Đờn ca không phải để khoe ngón nghề, mà để giữ lấy cái tình của người miền sông nước.",
    ],
    questHint: "Sự kiện theo giờ: Xuất hiện tại bến đò lúc 16:30 chiều hoàng hôn.",
  },
  {
    id: "chu-muoi",
    name: "Chú Mười Hàng Xóm",
    role: "Người láng giềng tối lửa tắt đèn có nhau",
    location: "Đầu Ngõ Xóm Bến Dừa",
    personality: "Chân chất, nghĩa tình, luôn sẵn lòng giúp đỡ hàng xóm",
    portrait: "/game-assets/pixel/portrait-npc-dung.png",
    portraitTalk: "/game-assets/pixel/portrait-npc-dung-talk.png",
    statusBadge: "NPC Cốt Truyện — Build #658",
    backstory:
      "Người hàng xóm lâu năm sát vách nhà Ngoại. Khi con cháu đi làm ăn xa, chính chú Mười là người thường xuyên sang quét lá sân trước, coi ngó mái ngói mỗi mùa mưa bão.",
    quotes: [
      "Về quê chơi hả con, lâu quá mới gặp lại! Vô nhà cất đồ đi, nãy chú mới quét giùm đám lá xoài ngoài sân rồi đó.",
      "Ở xóm này bà con thương nhau như người một nhà, cần gì cứ ới chú một tiếng nghen.",
    ],
    questHint: "Cốt truyện: Người dẫn chuyện và hỗ trợ người chơi chăm sóc ngôi nhà quê.",
  },
];

export interface GameplayPillar {
  id: "explore" | "live" | "grow" | "connect";
  eyebrow: string;
  title: string;
  subtitle: string;
  status: "ready" | "in-dev";
  statusLabel: string;
  description: string;
  highlights: string[];
  image: string;
  secondarySprite: string;
  ctaLabel: string;
  ctaHref: string;
}

export const GAMEPLAY_PILLARS: GameplayPillar[] = [
  {
    id: "explore",
    eyebrow: "TRỤ CỘT 01 — EXPLORE",
    title: "Khám Phá Thế Giới & Văn Hóa Bản Địa",
    subtitle: "Dạo bước từ xóm nhỏ miền Tây đến những danh thắng trải dài khắp Việt Nam.",
    status: "ready",
    statusLabel: "Đã có trong Build #658 (Xóm Bến Dừa & 5 Vùng Đất)",
    description:
      "Mỗi vùng đất trong TRẢI ĐỜI đều mang kiến trúc, thời tiết, ánh sáng và nhịp sinh hoạt riêng biệt. Từ hàng dừa nghiêng bóng bên bờ kênh đến phố cổ Hội An rực sáng đèn lồng khi đêm xuống.",
    highlights: [
      "Môi trường biến đổi theo 4 trạng thái thời gian và thời tiết thực tế",
      "5 vùng đất đặc trưng: Xóm Bến Dừa, Hội An, Hà Nội, Quảng Ninh, Núi Bà Đen",
      "Hệ thống ánh sáng 2D Emissive tái hiện đèn lồng, miếu cổ và đom đóm đêm",
    ],
    image: "/game-assets/screenshots/world-thodia.png",
    secondarySprite: "/game-assets/pixel/mieu.png",
    ctaLabel: "Xem Bản Đồ 5 Vùng Đất",
    ctaHref: "#ban-do-viet-nam",
  },
  {
    id: "live",
    eyebrow: "TRỤ CỘT 02 — LIVE",
    title: "Sống Đời Bình Dị & Chăm Sóc Vườn Quê",
    subtitle: "Trồng rau, hứng nước mưa, nấu bữa cơm quê và lắng nghe ký ức gia đình.",
    status: "ready",
    statusLabel: "Đã có trong Build #658 (Nông trại & Kỷ vật)",
    description:
      "Tận hưởng nhịp sống thư thái của dòng game Cozy Life Simulation thuần Việt. Tự tay xới đất, gieo hạt, canh cơn mưa rào miền Tây tưới mát luống rau và ghé sạp chợ quê mỗi sáng.",
    highlights: [
      "Chu trình canh tác trực quan: Xới đất — Gieo hạt — Tưới nước mưa — Thu hoạch",
      "Câu cá sông bản địa và chăm sóc vật nuôi quanh hiên nhà",
      "Tương tác với các kỷ vật trong nhà Ngoại để tìm lại sự bình yên",
    ],
    image: "/game-assets/travel/garden.png",
    secondarySprite: "/game-assets/pixel/muong-3.png",
    ctaLabel: "Trải Nghiệm Trồng Rau Ngay",
    ctaHref: "#vuon-nha-ngoai",
  },
  {
    id: "grow",
    eyebrow: "TRỤ CỘT 03 — GROW",
    title: "Bồi Đắp Nhân Vật & Sưu Tầm Báu Vật",
    subtitle: "Tích lũy Xu Làng từ lao động, mở khóa trang phục, phương tiện và kỷ vật quý.",
    status: "ready",
    statusLabel: "Đã có trong Build #658 (Kinh tế Xu Làng & Vật phẩm)",
    description:
      "Mọi hoạt động lao động và khám phá đều mang lại thành quả xứng đáng. Từ những bó rau muống bán ở sạp Cô Sáu Hiền đến những khoáng sản quý hiếm tại hầm mỏ Quảng Ninh.",
    highlights: [
      "Hệ thống tiền tệ trong game minh bạch (Xu Làng), hoàn toàn tách biệt với tiền thật",
      "Bộ sưu tập 40 loài cá sông, khoáng thạch, cá Koi phong thủy và phương tiện di chuyển",
      "Đại Luân Quay Lộc đầu mùa tại Miếu Ông Thổ Địa với 8 nhóm vật phẩm kỷ niệm",
    ],
    image: "/game-assets/screenshots/shop-sauhien.png",
    secondarySprite: "/game-assets/mining/giant-diamond.png",
    ctaLabel: "Mở Đại Luân & Túi Đồ",
    ctaHref: "#vong-quay-nhan-qua",
  },
  {
    id: "connect",
    eyebrow: "TRỤ CỘT 04 — CONNECT",
    title: "Gắn Kết Cộng Đồng & Láng Giềng",
    subtitle: "Kết nối cùng các NPC sống động và hướng tới không gian sinh hoạt nhiều người chơi.",
    status: "in-dev",
    statusLabel: "NPC Schedule đã hoạt động • Multiplayer đang phát triển",
    description:
      "Thế giới TRẢI ĐỜI không bao giờ cô đơn. Các nhân vật trong xóm đều có lịch trình sinh hoạt theo giờ, và hệ thống tổ đội đào mỏ / giao lưu liên vùng đang được phát triển cho giai đoạn tiếp theo.",
    highlights: [
      "Hệ thống lịch trình NPC sống động theo từng khung giờ sáng, chiều, tối",
      "Định hướng tổ đội 2–4 người chơi cùng khai thác mỏ khoáng Quảng Ninh",
      "Không gian sinh hoạt chung tại bến đò, chợ quê và phố cổ",
    ],
    image: "/game-assets/travel/hoiAn.png",
    secondarySprite: "/game-assets/pixel/portrait-npc-vinh.png",
    ctaLabel: "Gặp Gỡ Nhân Vật Trong Xóm",
    ctaHref: "#nhan-vat",
  },
];

export interface WheelPrize {
  id: string;
  shortTitle: string;
  fullName: string;
  tier: "THẦN THOẠI" | "CỰC PHẨM" | "QUÝ HIẾM" | "LỘC QUÊ";
  tierColor: string;
  bgGradient: [string, string];
  accentHex: string;
  sprite: string;
  valueText: string;
  moneyBonus: number;
  lore: string;
  thoDiaQuote: string;
  codePrefix: string;
}

export const WHEEL_PRIZES: WheelPrize[] = [
  {
    id: "ferrari-sf90",
    shortTitle: "XE ĐỎ SF90",
    fullName: "Siêu Xe Thể Thao SF90 Độc Bản",
    tier: "THẦN THOẠI",
    tierColor: "#FFD700",
    bgGradient: ["#591512", "#2B0806"],
    accentHex: "#FF5E4D",
    sprite: "/game-assets/pixel/body.png",
    valueText: "Phương tiện sưu tầm đặc biệt",
    moneyBonus: 100000,
    lore: "Mẫu xe thể thao sưu tầm hiếm có tại Showroom Hà Nội, mang lại trải nghiệm di chuyển tốc độ cao trên các tuyến đường liên tỉnh.",
    thoDiaQuote: "Quay trúng luôn chiếc xe sưu tầm quý hiếm! Chạy qua đường làng nhớ giảm tốc độ kẻo bà con giật mình nghen con!",
    codePrefix: "TD-SF90XX",
  },
  {
    id: "giant-diamond",
    shortTitle: "KIM CƯƠNG MỎ",
    fullName: "Kim Cương Tinh Chế Quảng Ninh",
    tier: "THẦN THOẠI",
    tierColor: "#67E8F9",
    bgGradient: ["#143846", "#091B24"],
    accentHex: "#38BDF8",
    sprite: "/game-assets/mining/giant-diamond.png",
    valueText: "Khoáng vật hiếm vùng mỏ",
    moneyBonus: 50000,
    lore: "Viên kim cương nguyên khối phát sáng lấp lánh sau ca khai thác tại hầm mỏ Quảng Ninh.",
    thoDiaQuote: "Trời ban cho viên kim cương sáng rực! Nhớ giữ gìn cẩn thận trong túi đồ nghen chưa!",
    codePrefix: "TD-KIMCUONG",
  },
  {
    id: "supra-mk4",
    shortTitle: "SUPRA MK4",
    fullName: "Xe Thể Thao Supra Trắng Sáu Lộc",
    tier: "CỰC PHẨM",
    tierColor: "#F59E0B",
    bgGradient: ["#4A311B", "#26180C"],
    accentHex: "#FBBF24",
    sprite: "/game-assets/vehicles/supra-icon.png",
    valueText: "Bản độ tiệm Sáu Lộc",
    moneyBonus: 35000,
    lore: "Mẫu xe thể thao trắng tinh chỉnh tại tiệm Sửa Xe Sáu Lộc, thiết kế cân bằng cho các chặng du hành xa.",
    thoDiaQuote: "Có xe mới đi thăm thú khắp 5 vùng đất là nhất con rồi đó!",
    codePrefix: "TD-SUPRA",
  },
  {
    id: "ca-ho-mekong",
    shortTitle: "CÁ HÔ VUA",
    fullName: "Cá Hô Khổng Lồ Bến Sông",
    tier: "CỰC PHẨM",
    tierColor: "#34D399",
    bgGradient: ["#174233", "#0B241B"],
    accentHex: "#10B981",
    sprite: "/game-assets/fish/ca-ho.png",
    valueText: "Đứng đầu 40 loài cá sông",
    moneyBonus: 25000,
    lore: "Loài cá quý của dòng sông miền Tây. Chỉ những cần thủ kiên nhẫn canh chuẩn nhịp phao dưới bóng dừa mới câu được.",
    thoDiaQuote: "Con cá Hô này quý lắm! Đem về đãi cả xóm Bến Dừa một bữa thiệt xôm tụ nghen!",
    codePrefix: "TD-CAHOVUA",
  },
  {
    id: "emerald-treasure",
    shortTitle: "NGỌC LỤC BẢO",
    fullName: "Ngọc Lục Bảo Tinh Chế",
    tier: "QUÝ HIẾM",
    tierColor: "#A7F3D0",
    bgGradient: ["#1F4938", "#10281E"],
    accentHex: "#4ADE80",
    sprite: "/game-assets/mining/emerald.png",
    valueText: "+18.000 Xu Làng",
    moneyBonus: 18000,
    lore: "Tinh thể ngọc xanh biếc vừa ra lò tinh chế, mang sắc xanh mát lành của núi rừng.",
    thoDiaQuote: "Lộc xanh biếc như lá chuối sau hè! Cất kỹ trong ba lô đừng để rớt ngoài bến đò nghen con.",
    codePrefix: "TD-NGOCLUC",
  },
  {
    id: "koi-tricolor",
    shortTitle: "CÁ KOI QUÝ",
    fullName: "Cá Koi Tam Sắc Phong Thủy",
    tier: "QUÝ HIẾM",
    tierColor: "#FDBA74",
    bgGradient: ["#54291A", "#2C140C"],
    accentHex: "#FB923C",
    sprite: "/game-assets/koi/koi-tricolor.png",
    valueText: "Thả hồ cá nhà Ngoại",
    moneyBonus: 15000,
    lore: "Chú cá Koi ba màu Đỏ - Trắng - Đen bơi lượn uyển chuyển, làm sinh động thêm góc sân vườn quê.",
    thoDiaQuote: "Thả vô hồ nước trước hiên nhà cho nó bơi lượn, nhìn cá bơi là thấy lòng thư thái liền.",
    codePrefix: "TD-KOIVIP",
  },
  {
    id: "ngoai-gift",
    shortTitle: "QUÀ QUÊ NHÀ",
    fullName: "Nải Chuối Chín Cây & Lộc Đầu Mùa",
    tier: "LỘC QUÊ",
    tierColor: "#FDE68A",
    bgGradient: ["#513727", "#312015"],
    accentHex: "#EAB308",
    sprite: "/game-assets/pixel/banana-ripe.png",
    valueText: "+20.000 Xu Làng & 2 Nải chuối",
    moneyBonus: 20000,
    lore: "Nải chuối chín vàng ươm vừa đốn từ buồng chuối sau hè cùng khoản Xu Làng khởi đầu làm vốn.",
    thoDiaQuote: "Không có lộc nào quý bằng thành quả từ mảnh vườn quê hương đâu con ơi!",
    codePrefix: "TD-LOCNGOAI",
  },
  {
    id: "starter-farm",
    shortTitle: "MÙA GẶT ĐẦU",
    fullName: "Giỏ Hạt Giống Quê & Trứng Gà Mới Đẻ",
    tier: "LỘC QUÊ",
    tierColor: "#BEF264",
    bgGradient: ["#2D4A28", "#182915"],
    accentHex: "#84CC16",
    sprite: "/game-assets/pixel/eggs.png",
    valueText: "+12.000 Xu Làng & Hạt giống",
    moneyBonus: 12000,
    lore: "Hạt giống rau muống, cải xanh cùng ổ trứng gà ta mới nhặt sáng nay ở chuồng mái lá.",
    thoDiaQuote: "Tay làm hàm nhai! Đem hạt giống về gieo 3 ô đất sau nhà ngoại là mai có mùa gặt mới!",
    codePrefix: "TD-MUAGAT",
  },
];

export interface WorldRegion {
  id: string;
  name: string;
  regionArea: string;
  badge: string;
  status: "live" | "in-dev";
  statusText: string;
  mapCoords: { x: number; y: number };
  tagline: string;
  image: string;
  secondaryImage?: string;
  weather: string;
  accent: string;
  highlights: string[];
  npcs: string[];
  transport: string;
  signatureItem: {
    name: string;
    tier: string;
    sprite: string;
  };
}

export const WORLD_REGIONS: WorldRegion[] = [
  {
    id: "ben-dua",
    name: "Xóm Bến Dừa & Nhà Ngoại",
    regionArea: "Miền Tây Nam Bộ",
    badge: "KHU VỰC KHỞI ĐẦU",
    status: "live",
    statusText: "Đã hoạt động trong Build #658",
    mapCoords: { x: 42, y: 82 },
    tagline:
      "Nơi bắt đầu hành trình trở về: hàng dừa nghiêng bóng bên bến sông, ao sen, miếu Ông Thổ Địa và sạp rau Cô Sáu Hiền.",
    image: "/game-assets/screenshots/world-thodia.png",
    secondaryImage: "/game-assets/travel/garden.png",
    weather: "Nắng hạ 31°C — Gió sông mát rượi",
    accent: "#2B6657",
    highlights: [
      "Trồng 8 vụ mùa thời gian thực: Rau muống, Cải xanh, Ớt, Cà chua, Dưa hấu, Lúa nếp",
      "Câu 40 loài cá sông bản địa (Cá Hô, Cá Chép, Cá Bông Lau, Lươn đồng)",
      "Chăn nuôi gia cầm & chăm sóc hồ cá Koi phong thủy quanh nhà",
      "Tương tác với 5 Kỷ vật quê nhà và trò chuyện cùng các NPC xóm làng",
    ],
    npcs: ["Bà Ngoại", "Ông Thổ Địa", "Cô Sáu Hiền", "Nghệ nhân Vinh", "Chú Mười"],
    transport: "Đi bộ, Xe đạp, Đò ngang bến sông",
    signatureItem: {
      name: "Cá Hô Sông Tiền",
      tier: "Đặc Sản Miền Tây",
      sprite: "/game-assets/fish/ca-ho.png",
    },
  },
  {
    id: "hoi-an",
    name: "Phố Cổ Hội An",
    regionArea: "Duyên Hải Miền Trung",
    badge: "DI SẢN MIỀN TRUNG",
    status: "live",
    statusText: "Đã có cảnh quan & du hành trong Build #658",
    mapCoords: { x: 64, y: 52 },
    tagline:
      "Đèn lồng thắp sáng rực rỡ bên dòng sông Hoài, tiệm may cổ phục và những đêm rằm lung linh ánh nước.",
    image: "/game-assets/travel/hoiAn.png",
    secondaryImage: "/game-assets/screenshots/redesign-ornate-concept.png",
    weather: "Chiều hoàng hôn — Đèn lồng lên đèn",
    accent: "#D97706",
    highlights: [
      "Tiệm may cổ phục & phối đồ nhiều lớp trang phục truyền thống Việt Nam",
      "Hệ thống ánh sáng ban đêm (Night Emissive Lights) phản chiếu trên mặt nước",
      "Giao lưu cộng đồng, chụp ảnh kỷ niệm và dạo bước qua phố đèn lồng",
    ],
    npcs: ["Thợ may Hội An", "Cô bán đèn lồng", "Khách thập phương"],
    transport: "Xe buýt liên tỉnh từ Trạm Bến Dừa",
    signatureItem: {
      name: "Cá Koi Tam Sắc",
      tier: "Báu Vật Phố Cổ",
      sprite: "/game-assets/koi/koi-tricolor.png",
    },
  },
  {
    id: "ha-noi",
    name: "Phố Phường Hà Nội",
    regionArea: "Đồng Bằng Bắc Bộ",
    badge: "ĐÔ THỊ MIỀN BẮC",
    status: "live",
    statusText: "Đã có cảnh quan & Showroom trong Build #658",
    mapCoords: { x: 48, y: 20 },
    tagline:
      "Từ hàng cây cổ thụ ven hồ, phố xá nhộn nhịp đến khu trưng bày phương tiện và đường đua kỹ năng.",
    image: "/game-assets/travel/haNoi.png",
    weather: "Tiết thu dịu mát — Nhịp sống sôi động",
    accent: "#0D9488",
    highlights: [
      "Khu trưng bày & Tiệm Sửa Xe Sáu Lộc với các mẫu phương tiện đa dạng",
      "Đường đua Hà Nội Circuit: thử thách điều khiển phương tiện và bảng thành tích",
      "Hệ thống giao dịch và không gian dạo phố đô thị cổ kính pha lẫn hiện đại",
    ],
    npcs: ["Sáu Lộc (Thợ máy)", "Cảnh sát giao thông", "Quản lý Showroom"],
    transport: "Tuyến xe buýt Bắc - Nam & Phương tiện cá nhân",
    signatureItem: {
      name: "Supra MK4 Sáu Lộc",
      tier: "Phương Tiện Đô Thị",
      sprite: "/game-assets/vehicles/supra-icon.png",
    },
  },
  {
    id: "quang-ninh",
    name: "Mỏ Khoáng Quảng Ninh",
    regionArea: "Vùng Đông Bắc",
    badge: "KHU VỰC ĐẤT MỎ",
    status: "live",
    statusText: "Đã có hệ thống khoáng thạch trong Build #658",
    mapCoords: { x: 62, y: 16 },
    tagline:
      "Hành trình tiến vào hầm mỏ nhiều tầng, khai thác và tinh chế khoáng thạch quý hiếm cùng đồng đội.",
    image: "/game-assets/travel/quangNinh.png",
    weather: "Sương mù vùng mỏ — Lò tinh chế rực lửa",
    accent: "#0284C7",
    highlights: [
      "Hệ thống khoáng sản đa bậc: Than, Đồng, Bạc, Vàng, Hồng Ngọc, Ngọc Lục Bảo, Kim Cương",
      "Hoạt động khai thác quặng theo nhịp và tinh chế đá quý",
      "Định hướng mở rộng tính năng Tổ đội 2–4 người cùng chia sẻ Quỹ Tổ Mỏ",
    ],
    npcs: ["Đội trưởng Hầm Lò", "Thợ Máy Tinh Chế", "Thủ Quỹ Tổ Mỏ"],
    transport: "Xe chuyên dụng Vùng Mỏ Quảng Ninh",
    signatureItem: {
      name: "Kim Cương Đất Mỏ",
      tier: "Khoáng Thạch Hiếm",
      sprite: "/game-assets/mining/giant-diamond.png",
    },
  },
  {
    id: "tay-ninh",
    name: "Núi Bà Đen — Tây Ninh",
    regionArea: "Đông Nam Bộ",
    badge: "ĐANG PHÁT TRIỂN",
    status: "in-dev",
    statusText: "Đang phát triển mở rộng cho các bản cập nhật tới",
    mapCoords: { x: 46, y: 70 },
    tagline:
      "Đỉnh núi mây phủ cao 986m của vùng Đông Nam Bộ với cảnh sắc thiên nhiên hùng vĩ và những câu chuyện dân gian.",
    image: "/game-assets/travel/baDen.png",
    weather: "Mây mù bao phủ trên đỉnh 986m",
    accent: "#A96745",
    highlights: [
      "Đã hoàn thiện tranh phong cảnh nền (Environment Concept & Travel Preview)",
      "Đang thiết kế chuỗi nhiệm vụ khám phá văn hóa và thắng cảnh vùng núi",
      "Sẽ kết nối trực tiếp vào tuyến xe liên tỉnh từ Xóm Bến Dừa khi hoàn tất",
    ],
    npcs: ["Ẩn sĩ Núi Bà (Đang thiết kế)", "Ông Thổ Địa"],
    transport: "Tuyến xe liên tỉnh (Đang xây dựng)",
    signatureItem: {
      name: "Ngọc Lục Bảo Núi Thiêng",
      tier: "Báu Vật Mở Rộng",
      sprite: "/game-assets/mining/emerald.png",
    },
  },
];

export interface GalleryMediaItem {
  id: string;
  title: string;
  category: "gameplay" | "ui" | "environment" | "concept";
  categoryLabel: string;
  image: string;
  aspectLabel: string;
  caption: string;
  details: string;
  spriteBadge?: string;
}

export const GALLERY_MEDIA_ITEMS: GalleryMediaItem[] = [
  {
    id: "scene-ben-dua",
    title: "Toàn Cảnh Xóm Bến Dừa & Miếu Ông Địa",
    category: "gameplay",
    categoryLabel: "In-Game Gameplay (Build #658)",
    image: "/game-assets/screenshots/world-thodia.png",
    aspectLabel: "1212×702 • Thực tế từ Build #658",
    caption: "Bối cảnh trung tâm Xóm Bến Dừa với ngôi miếu nhỏ, ao sen và rặng dừa miền Tây.",
    details:
      "Hình chụp trực tiếp từ bản dựng hiện tại (Pixel Build #658), tích hợp lớp phát sáng ban đêm cho miếu thờ và hiệu ứng thời tiết.",
    spriteBadge: "/game-assets/pixel/mieu.png",
  },
  {
    id: "scene-shop-sau-hien",
    title: "Sạp Rau Củ Cô Sáu Hiền & Chợ Quê",
    category: "gameplay",
    categoryLabel: "In-Game Gameplay (Build #658)",
    image: "/game-assets/screenshots/shop-sauhien.png",
    aspectLabel: "Thực tế từ Build #658",
    caption: "Giao diện tương tác mua bán nông sản và trò chuyện cùng Cô Sáu Hiền tại chợ làng.",
    details:
      "Hệ thống cửa hàng và hội thoại NPC trong phiên bản thử nghiệm hiện tại, nơi người chơi bán rau thu hoạch và mua nhu yếu phẩm.",
    spriteBadge: "/game-assets/pixel/portrait-vendor.png",
  },
  {
    id: "scene-garden",
    title: "Mảnh Vườn Quê & Luống Rau Sau Hè",
    category: "gameplay",
    categoryLabel: "In-Game Gameplay (Build #658)",
    image: "/game-assets/travel/garden.png",
    aspectLabel: "Cảnh quan nông trại Build #658",
    caption: "Không gian vườn nhà yên bình nơi người chơi xới đất, gieo hạt và tưới nước mưa.",
    details:
      "Môi trường canh tác nông nghiệp gắn liền với nhịp sống gia đình và chu kỳ nắng mưa tự nhiên.",
    spriteBadge: "/game-assets/pixel/muong-3.png",
  },
  {
    id: "ui-settings-bamboo",
    title: "Giao Diện Cài Đặt Khung Tre Thủ Công",
    category: "ui",
    categoryLabel: "Hệ Thống Giao Diện (UI)",
    image: "/game-assets/screenshots/settings-bamboo.png",
    aspectLabel: "UI In-Game Build #658",
    caption: "Bảng điều khiển âm thanh, đài phát thanh làng quê và tùy chỉnh hiển thị.",
    details:
      "Thiết kế giao diện sử dụng chất liệu gỗ và tre đan truyền thống, đồng bộ với thẩm mỹ làng quê Việt Nam.",
    spriteBadge: "/game-assets/ornaments/decor/flower-gold.png",
  },
  {
    id: "ui-ornate-concept",
    title: "Nghiên Cứu Khung Giao Diện Gỗ Chạm & Sơn Mài",
    category: "concept",
    categoryLabel: "Concept Art & UI Direction",
    image: "/game-assets/screenshots/redesign-ornate-concept.png",
    aspectLabel: "UI Art Direction Concept",
    caption: "Bản thiết kế định hướng khung viền gỗ chạm khắc và bảng màu ấm áp cho hệ thống menu.",
    details:
      "Tài liệu concept art nghiên cứu cách kết hợp họa tiết truyền thống Việt Nam vào giao diện trò chơi hiện đại.",
    spriteBadge: "/game-assets/ornaments/decor/paper-seal.png",
  },
  {
    id: "env-hoi-an",
    title: "Phố Cổ Hội An Đêm Đèn Lồng",
    category: "environment",
    categoryLabel: "Cảnh Quan Vùng Đất",
    image: "/game-assets/travel/hoiAn.png",
    aspectLabel: "Bối cảnh vùng miền Build #658",
    caption: "Sắc vàng ấm áp của hàng trăm chiếc đèn lồng phản chiếu trên dòng sông Hoài.",
    details:
      "Một trong 5 vùng đất văn hóa trong TRẢI ĐỜI, tập trung vào nghệ thuật ánh sáng ban đêm và trang phục truyền thống.",
    spriteBadge: "/game-assets/ornaments/decor/lantern.png",
  },
  {
    id: "env-ha-noi",
    title: "Không Gian Phố Phường Hà Nội",
    category: "environment",
    categoryLabel: "Cảnh Quan Vùng Đất",
    image: "/game-assets/travel/haNoi.png",
    aspectLabel: "Bối cảnh vùng miền Build #658",
    caption: "Nhịp sống đô thị miền Bắc với kiến trúc phố cổ và các hoạt động giao lưu.",
    details:
      "Khu vực đại diện cho miền Bắc với tiệm độ xe Sáu Lộc, showroom phương tiện và đường đua kỹ năng.",
    spriteBadge: "/game-assets/vehicles/supra-icon.png",
  },
  {
    id: "env-quang-ninh",
    title: "Vùng Mỏ & Vịnh Di Sản Quảng Ninh",
    category: "environment",
    categoryLabel: "Cảnh Quan Vùng Đất",
    image: "/game-assets/travel/quangNinh.png",
    aspectLabel: "Bối cảnh vùng miền Build #658",
    caption: "Cảnh quan vùng mỏ Đông Bắc nơi diễn ra hoạt động khai thác và tinh chế khoáng sản.",
    details:
      "Mang đến nhịp độ gameplay sôi động hơn với hệ thống hầm mỏ nhiều tầng và bộ sưu tập đá quý.",
    spriteBadge: "/game-assets/mining/giant-diamond.png",
  },
  {
    id: "env-ba-den",
    title: "Đỉnh Núi Bà Đen Tây Ninh Trong Sương",
    category: "concept",
    categoryLabel: "Concept & Khu Vực Đang Phát Triển",
    image: "/game-assets/travel/baDen.png",
    aspectLabel: "Environment Preview",
    caption: "Khung cảnh biển mây trên đỉnh núi cao nhất Nam Bộ đang trong quá trình phát triển mở rộng.",
    details:
      "Minh họa định hướng môi trường cho khu vực tâm linh và khám phá thiên nhiên sẽ mở cửa trong các bản cập nhật tiếp theo.",
    spriteBadge: "/game-assets/mining/emerald.png",
  },
];

export interface DevPhase {
  id: string;
  phaseLabel: string;
  badge: string;
  status: "current" | "in-development";
  title: string;
  engine: string;
  summary: string;
  completedItems: string[];
  inProgressItems: string[];
}

export const DEVELOPMENT_ROADMAP: DevPhase[] = [
  {
    id: "phase-pixel-658",
    phaseLabel: "GIAI ĐOẠN HIỆN TẠI (ĐÃ KIỂM CHỨNG)",
    badge: "PIXEL BUILD #658 — ĐANG HOẠT ĐỘNG",
    status: "current",
    title: "Phiên Bản Nền Tảng 2D Pixel Art & Tương Tác Đời Sống",
    engine: "Custom 2D Pixel Build #658 & Next.js Interactive Web Showcase",
    summary:
      "Hoàn thiện vòng lặp gameplay cốt lõi tại Xóm Bến Dừa, hệ thống nhân vật, nông trại, thời tiết và bộ khung thẩm mỹ văn hóa Việt Nam.",
    completedItems: [
      "Thế giới Xóm Bến Dừa với chu kỳ 4 trạng thái thời tiết và ánh sáng Emissive ban đêm",
      "Hệ thống NPC có chân dung biểu cảm (talk/blink/rest) và lịch trình sinh hoạt theo giờ",
      "Cơ chế trồng trọt 8 vụ mùa, câu 40 loài cá sông và khai thác 10 loại khoáng sản",
      "Hệ thống tiền tệ Xu Làng, Sạp Cô Sáu Hiền, 5 Kỷ vật Nhà Ngoại và Đại Luân Quay Lộc",
      "Trình diễn tương tác trực tiếp ngay trên nền tảng Web (GitHub Pages & Vercel)",
    ],
    inProgressItems: [
      "Mở rộng chuỗi nhiệm vụ cốt truyện tại khu vực Núi Bà Đen (Tây Ninh)",
      "Tinh chỉnh cân bằng kinh tế Xu Làng và trải nghiệm trên thiết bị di động",
    ],
  },
  {
    id: "phase-unity6-anime",
    phaseLabel: "ĐỊNH HƯỚNG DÀI HẠN (R&D)",
    badge: "UNITY 6 STYLIZED 3D ANIME — ĐANG NGHIÊN CỨU",
    status: "in-development",
    title: "Nâng Cấp Thế Giới Mở 3D Anime Giàu Ánh Sáng Trên Unity 6",
    engine: "Unity 6 (Universal Render Pipeline • Stylized Toon & Atmospheric Lighting)",
    summary:
      "Chuyển hóa thế giới TRẢI ĐỜI sang không gian 3D Anime có chiều sâu môi trường, ánh sáng tự nhiên và khả năng kết nối nhiều người chơi.",
    completedItems: [
      "Xác lập định hướng mỹ thuật (Art Direction), bảng màu di sản Việt và hệ thống phân vùng địa lý",
      "Hoàn thiện kịch bản thế giới, tính cách nhân vật cốt lõi và cấu trúc kinh tế đời sống",
    ],
    inProgressItems: [
      "Xây dựng bộ tài nguyên 3D Stylized Anime (Nhân vật Bà Ngoại, Ông Thổ Địa, kiến trúc nhà ba gian)",
      "Nghiên cứu hệ thống ánh sáng URP, chu kỳ Ngày/Đêm 3D và hiệu ứng thời tiết trong Unity 6",
      "Phát triển hạ tầng kết nối nhiều người chơi (Multiplayer) cho hoạt động chợ quê và đào mỏ tổ đội",
    ],
  },
];

export const MISSING_ANIME_ASSETS_CHECKLIST = [
  {
    priority: "P0 — Quan trọng nhất",
    category: "Key Visual & Hero Art",
    item: "Tranh Key Visual 3D Anime phân tách lớp (Foreground / Midground / Background) cảnh Xóm Bến Dừa",
    currentFallback: "Đang sử dụng cảnh thực tế từ bản Pixel Build #658 (world-thodia.png)",
  },
  {
    priority: "P0 — Quan trọng nhất",
    category: "Character 3D Renders",
    item: "Bộ mẫu 3D / Cel-shaded Portrait độ phân giải cao cho Bà Ngoại, Ông Thổ Địa, Cô Sáu Hiền và Nhân vật chính",
    currentFallback: "Đang sử dụng bộ Sprite & Portrait Pixel chính thức của Build #658",
  },
  {
    priority: "P1 — Ưu tiên cao",
    category: "Unity 6 Environment Captures",
    item: "Ảnh chụp môi trường 3D in-engine từ Unity 6 (URP Lighting) cho 5 vùng đất Việt Nam",
    currentFallback: "Đang sử dụng bộ ảnh vùng miền 2D hiện có trong thư mục travel/",
  },
  {
    priority: "P1 — Ưu tiên cao",
    category: "Official Gameplay Trailer",
    item: "Video Trailer chính thức (WebM/MP4 60FPS) giới thiệu thế giới và chuyển động 3D",
    currentFallback: "Đang sử dụng Thư viện Ảnh Tương Tác (Interactive Lightbox Gallery)",
  },
];
