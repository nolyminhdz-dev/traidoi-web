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
    role: "Người giữ lửa nhà ba gian",
    location: "Hiên Nhà Ngoại — Xóm Bến Dừa",
    personality: "Hiền từ, chu đáo, thương con cháu hết mực",
    portrait: "/game-assets/pixel/portrait-grandma.png",
    portraitTalk: "/game-assets/pixel/portrait-grandma-talk.png",
    statusBadge: "Xóm Bến Dừa",
    backstory:
      "Ngoại luôn để dành phần cơm nóng trên bếp tro hồng và ba luống đất sau hè chờ con cháu về gieo hạt.",
    quotes: [
      "Trời ơi cục vàng của ngoại, mới về sao không báo trước để bà nấu cơm giặt mền gối cho con.",
      "Đi đâu cũng nhớ chạy chậm, tới bữa về ăn cơm nghen con.",
      "Rau muống con tự tay tưới nước mưa, luộc lên chấm kho quẹt là ngọt nhứt trên đời.",
    ],
    questHint: "Trồng và thu hoạch vụ rau muống đầu tiên sau hè nhà Ngoại.",
  },
  {
    id: "ong-tho-dia",
    name: "Ông Thổ Địa",
    role: "Thần bảo hộ Xóm Bến Dừa",
    location: "Miếu Đỏ Đầu Làng",
    personality: "Hào sảng Nam Bộ, hóm hỉnh, trọng lòng thảo thơm",
    portrait: "/game-assets/pixel/portrait-tho-dia.png",
    portraitTalk: "/game-assets/pixel/portrait-tho-dia-talk.png",
    statusBadge: "Miếu Đỏ Đầu Làng",
    backstory:
      "Vị thần dân gian gắn bó với từng gốc cây, bến nước miền Tây, luôn ban lộc lành cho người chăm làm việc thiện.",
    quotes: [
      "Mới về quê ngoại hả con? Ghé miếu thắp nén nhang thơm, sống có trước có sau thì đi đâu cũng bình an!",
      "Tay làm hàm nhai! Đem hạt giống về gieo 3 ô đất sau nhà ngoại là mai có lộc liền.",
      "Của thiên nhiên ban tặng, biết thương cây thương đất thì trời chẳng phụ lòng người.",
    ],
    questHint: "Thắp nhang tại Miếu Đỏ và mở vòng quay nhận lộc đầu mùa.",
  },
  {
    id: "co-sau-hien",
    name: "Cô Sáu Hiền",
    role: "Chủ sạp nông sản Chợ Bến Dừa",
    location: "Sạp Rau Củ Chợ Quê",
    personality: "Xởi lởi, bộc trực, buôn bán giữ chữ tín",
    portrait: "/game-assets/pixel/portrait-vendor.png",
    portraitTalk: "/game-assets/pixel/portrait-vendor-talk.png",
    statusBadge: "Chợ Bến Dừa",
    backstory:
      "Thức dậy từ 5 giờ sáng để bày sạp rau củ tươi rói và thu mua nông sản vườn nhà với giá hậu hĩnh.",
    quotes: [
      "Rau muống mới hái sáng nay còn đọng sương đây con! Trồng được bao nhiêu mang ra sạp cô thu mua hết!",
      "Mua thêm ổ trứng gà ta đem về biếu ngoại, trứng mới đẻ sáng nay lòng đỏ tươi rói.",
    ],
    questHint: "Bán rau muống thu hoạch (+3.800 Xu Làng/bó) và mua trứng gà ta.",
  },
  {
    id: "nghe-nhan-vinh",
    name: "Nghệ Nhân Vinh",
    role: "Người giữ nhịp đờn ca bến sông",
    location: "Bến Đò Chợ Bến Dừa",
    personality: "Trầm mặc, sâu sắc, nặng lòng với làn điệu quê hương",
    portrait: "/game-assets/pixel/portrait-npc-vinh.png",
    portraitTalk: "/game-assets/pixel/portrait-npc-vinh-talk.png",
    statusBadge: "Bến Đò Chiều",
    backstory:
      "Mỗi buổi chiều hoàng hôn trên mặt sông, chú Vinh lại mang cây đờn kìm ra bến nước dạo câu vọng cổ mộc mạc.",
    quotes: [
      "Con nước lớn ròng cũng như nhịp đời vậy con. Ngồi xuống nghe chú dạo một câu vọng cổ cho nhẹ lòng.",
      "Đờn ca không phải để khoe ngón nghề, mà để giữ lấy cái tình của người miền sông nước.",
    ],
    questHint: "Lắng nghe đờn ca tài tử bên bến sông mỗi buổi chiều tà.",
  },
  {
    id: "chu-muoi",
    name: "Chú Mười Hàng Xóm",
    role: "Người láng giềng nghĩa tình",
    location: "Đầu Ngõ Xóm Bến Dừa",
    personality: "Chân chất, hiếu khách, luôn sẵn lòng giúp đỡ bà con",
    portrait: "/game-assets/pixel/portrait-npc-dung.png",
    portraitTalk: "/game-assets/pixel/portrait-npc-dung-talk.png",
    statusBadge: "Xóm Giềng",
    backstory:
      "Người hàng xóm sát vách luôn sang quét lá xoài ngoài sân và coi ngó mái ngói giúp Ngoại mỗi mùa mưa.",
    quotes: [
      "Về quê chơi hả con, lâu quá mới gặp lại! Vô nhà cất đồ đi, nãy chú mới quét giùm đám lá xoài ngoài sân rồi đó.",
      "Ở xóm này bà con thương nhau như người một nhà, cần gì cứ ới chú một tiếng nghen.",
    ],
    questHint: "Trò chuyện để khám phá những câu chuyện đời thường quanh xóm.",
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
    tierColor: "#F5CC72",
    bgGradient: ["#6E1D18", "#350C09"],
    accentHex: "#E98065",
    sprite: "/game-assets/pixel/body.png",
    valueText: "Phương tiện sưu tầm đặc biệt",
    moneyBonus: 100000,
    lore: "Mẫu xe thể thao sưu tầm hiếm có tại Showroom Hà Nội.",
    thoDiaQuote: "Quay trúng luôn chiếc xe sưu tầm quý hiếm! Chạy qua đường làng nhớ giảm tốc độ nghen con!",
    codePrefix: "TD-SF90XX",
  },
  {
    id: "giant-diamond",
    shortTitle: "KIM CƯƠNG MỎ",
    fullName: "Kim Cương Tinh Chế Quảng Ninh",
    tier: "THẦN THOẠI",
    tierColor: "#8BD3F4",
    bgGradient: ["#194657", "#0C232C"],
    accentHex: "#8BD3F4",
    sprite: "/game-assets/mining/giant-diamond.png",
    valueText: "Khoáng vật hiếm vùng mỏ",
    moneyBonus: 50000,
    lore: "Viên kim cương nguyên khối lấp lánh từ vùng mỏ Quảng Ninh.",
    thoDiaQuote: "Trời ban cho viên kim cương sáng rực! Nhớ giữ gìn cẩn thận trong túi đồ nghen chưa!",
    codePrefix: "TD-KIMCUONG",
  },
  {
    id: "supra-mk4",
    shortTitle: "SUPRA MK4",
    fullName: "Xe Thể Thao Supra Trắng Sáu Lộc",
    tier: "CỰC PHẨM",
    tierColor: "#F5CC72",
    bgGradient: ["#593A1E", "#2E1C0E"],
    accentHex: "#F5CC72",
    sprite: "/game-assets/vehicles/supra-icon.png",
    valueText: "Bản độ tiệm Sáu Lộc",
    moneyBonus: 35000,
    lore: "Mẫu xe thể thao trắng tinh chỉnh tại tiệm Sửa Xe Sáu Lộc.",
    thoDiaQuote: "Có xe mới đi thăm thú khắp 5 vùng đất là nhất con rồi đó!",
    codePrefix: "TD-SUPRA",
  },
  {
    id: "ca-ho-mekong",
    shortTitle: "CÁ HÔ VUA",
    fullName: "Cá Hô Khổng Lồ Bến Sông",
    tier: "CỰC PHẨM",
    tierColor: "#67AF65",
    bgGradient: ["#1E4E3D", "#0E2920"],
    accentHex: "#67AF65",
    sprite: "/game-assets/fish/ca-ho.png",
    valueText: "Đứng đầu 40 loài cá sông",
    moneyBonus: 25000,
    lore: "Loài cá quý hiếm bậc nhất của dòng sông miền Tây.",
    thoDiaQuote: "Con cá Hô này quý lắm! Đem về đãi cả xóm Bến Dừa một bữa thiệt xôm tụ nghen!",
    codePrefix: "TD-CAHOVUA",
  },
  {
    id: "emerald-treasure",
    shortTitle: "NGỌC LỤC BẢO",
    fullName: "Ngọc Lục Bảo Tinh Chế",
    tier: "QUÝ HIẾM",
    tierColor: "#A7F3D0",
    bgGradient: ["#245440", "#132D22"],
    accentHex: "#67AF65",
    sprite: "/game-assets/mining/emerald.png",
    valueText: "+18.000 Xu Làng",
    moneyBonus: 18000,
    lore: "Tinh thể ngọc xanh biếc mang sắc xanh mát lành của núi rừng.",
    thoDiaQuote: "Lộc xanh biếc như lá chuối sau hè! Cất kỹ trong ba lô đừng để rớt ngoài bến đò nghen con.",
    codePrefix: "TD-NGOCLUC",
  },
  {
    id: "koi-tricolor",
    shortTitle: "CÁ KOI QUÝ",
    fullName: "Cá Koi Tam Sắc Phong Thủy",
    tier: "QUÝ HIẾM",
    tierColor: "#FDBA74",
    bgGradient: ["#5E2E1D", "#30160D"],
    accentHex: "#E98065",
    sprite: "/game-assets/koi/koi-tricolor.png",
    valueText: "Thả hồ cá nhà Ngoại",
    moneyBonus: 15000,
    lore: "Chú cá Koi ba màu bơi lượn làm sinh động thêm góc sân vườn quê.",
    thoDiaQuote: "Thả vô hồ nước trước hiên nhà cho nó bơi lượn, nhìn cá bơi là thấy lòng thư thái liền.",
    codePrefix: "TD-KOIVIP",
  },
  {
    id: "ngoai-gift",
    shortTitle: "QUÀ QUÊ NHÀ",
    fullName: "Nải Chuối Chín Cây & Lộc Đầu Mùa",
    tier: "LỘC QUÊ",
    tierColor: "#F5CC72",
    bgGradient: ["#593C2A", "#332116"],
    accentHex: "#F5CC72",
    sprite: "/game-assets/pixel/banana-ripe.png",
    valueText: "+20.000 Xu Làng & 2 Nải chuối",
    moneyBonus: 20000,
    lore: "Nải chuối chín vàng ươm vừa đốn từ buồng chuối sau hè.",
    thoDiaQuote: "Không có lộc nào quý bằng thành quả từ mảnh vườn quê hương đâu con ơi!",
    codePrefix: "TD-LOCNGOAI",
  },
  {
    id: "starter-farm",
    shortTitle: "MÙA GẶT ĐẦU",
    fullName: "Giỏ Hạt Giống Quê & Trứng Gà Mới Đẻ",
    tier: "LỘC QUÊ",
    tierColor: "#BEF264",
    bgGradient: ["#33542D", "#1B2E18"],
    accentHex: "#67AF65",
    sprite: "/game-assets/pixel/eggs.png",
    valueText: "+12.000 Xu Làng & Hạt giống",
    moneyBonus: 12000,
    lore: "Hạt giống rau tươi cùng ổ trứng gà ta mới nhặt sáng nay.",
    thoDiaQuote: "Tay làm hàm nhai! Đem hạt giống về gieo 3 ô đất sau nhà ngoại là mai có mùa gặt mới!",
    codePrefix: "TD-MUAGAT",
  },
];

export interface WorldRegion {
  id: string;
  name: string;
  regionArea: string;
  badge: string;
  status: "live" | "coming-soon";
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
    name: "Xóm Bến Dừa",
    regionArea: "Miền Tây Nam Bộ",
    badge: "ĐANG MỞ CỬA",
    status: "live",
    statusText: "Đang mở cửa đón khách",
    mapCoords: { x: 42, y: 82 },
    tagline:
      "Nơi bắt đầu hành trình về quê: rặng dừa nghiêng bóng bên bến sông, miếu Ông Thổ Địa và sạp rau Cô Sáu Hiền.",
    image: "/game-assets/screenshots/world-thodia.png",
    secondaryImage: "/game-assets/travel/garden.png",
    weather: "Nắng ấm 31°C — Gió sông mát rượi",
    accent: "#67AF65",
    highlights: [
      "Trồng rau sau hè, hứng nước mưa và thu hoạch nông sản tươi",
      "Câu 40 loài cá sông bản địa và chăm sóc hồ cá Koi",
      "Thắp nhang xin lộc tại Miếu Đỏ và ghé chợ quê mỗi sáng",
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
    badge: "ĐANG MỞ CỬA",
    status: "live",
    statusText: "Đang mở cửa đón khách",
    mapCoords: { x: 64, y: 52 },
    tagline:
      "Đèn lồng thắp sáng rực rỡ bên dòng sông Hoài, tiệm may cổ phục và những đêm hội hoa đăng lung linh.",
    image: "/game-assets/travel/hoiAn.png",
    secondaryImage: "/game-assets/screenshots/redesign-ornate-concept.png",
    weather: "Hoàng hôn dịu mát — Đèn lồng lên đèn",
    accent: "#F5CC72",
    highlights: [
      "Tiệm may cổ phục & sưu tầm trang phục truyền thống",
      "Thả đèn hoa đăng và dạo phố đêm bên dòng sông Hoài",
      "Gặp gỡ các nghệ nhân thủ công và du khách thập phương",
    ],
    npcs: ["Thợ may Hội An", "Cô bán đèn lồng", "Khách thập phương"],
    transport: "Chuyến xe liên tỉnh từ Bến Dừa",
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
    badge: "ĐANG MỞ CỬA",
    status: "live",
    statusText: "Đang mở cửa đón khách",
    mapCoords: { x: 48, y: 20 },
    tagline:
      "Hàng cây cổ thụ ven hồ, phố xá nhộn nhịp cùng khu trưng bày phương tiện và đường đua sôi động.",
    image: "/game-assets/travel/haNoi.png",
    weather: "Tiết thu dịu mát — Phố phường nhộn nhịp",
    accent: "#8BD3F4",
    highlights: [
      "Khu trưng bày phương tiện & Tiệm độ xe Sáu Lộc",
      "Đường đua Hà Nội Circuit thử thách tay lái điêu luyện",
      "Dạo phố cổ, thưởng thức ẩm thực và giao lưu bạn bè",
    ],
    npcs: ["Sáu Lộc (Thợ máy)", "Cảnh sát giao thông", "Quản lý Showroom"],
    transport: "Tuyến xe Bắc - Nam & Phương tiện cá nhân",
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
    badge: "ĐANG MỞ CỬA",
    status: "live",
    statusText: "Đang mở cửa đón khách",
    mapCoords: { x: 62, y: 16 },
    tagline:
      "Khám phá hầm mỏ nhiều tầng bên bờ vịnh di sản, khai thác và tinh chế những viên đá quý lấp lánh.",
    image: "/game-assets/travel/quangNinh.png",
    weather: "Gió biển Đông Bắc — Lò tinh chế rực lửa",
    accent: "#8BD3F4",
    highlights: [
      "Khai thác Than, Đồng, Bạc, Vàng, Ngọc Lục Bảo và Kim Cương",
      "Tinh chế khoáng thạch quý hiếm tích lũy Xu Làng",
      "Lập tổ đội cùng bạn bè chinh phục các tầng mỏ sâu",
    ],
    npcs: ["Đội trưởng Hầm Lò", "Thợ Máy Tinh Chế", "Thủ Quỹ Tổ Mỏ"],
    transport: "Tàu mỏ & Xe chuyên dụng Đông Bắc",
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
    badge: "SẮP MỞ",
    status: "coming-soon",
    statusText: "Sắp mở cửa đón khách",
    mapCoords: { x: 46, y: 70 },
    tagline:
      "Đỉnh núi mây phủ cao 986m giữa vùng Đông Nam Bộ với cảnh sắc hùng vĩ và những truyền thuyết linh thiêng.",
    image: "/game-assets/travel/baDen.png",
    weather: "Biển mây bồng bềnh trên đỉnh 986m",
    accent: "#E98065",
    highlights: [
      "Hành trình cáp treo xuyên mây lên đỉnh núi cao nhất Nam Bộ",
      "Khám phá hệ thực vật rừng núi và suối đá cổ",
      "Sưu tầm báu vật Ngọc Lục Bảo Núi Thiêng",
    ],
    npcs: ["Ẩn sĩ Núi Bà", "Ông Thổ Địa"],
    transport: "Tuyến xe liên tỉnh từ Xóm Bến Dừa",
    signatureItem: {
      name: "Ngọc Lục Bảo Núi Thiêng",
      tier: "Báu Vật Núi Thiêng",
      sprite: "/game-assets/mining/emerald.png",
    },
  },
];

export interface GalleryMediaItem {
  id: string;
  title: string;
  category: "gameplay" | "environment" | "ui";
  categoryLabel: string;
  image: string;
  caption: string;
  spriteBadge?: string;
}

export const GALLERY_MEDIA_ITEMS: GalleryMediaItem[] = [
  {
    id: "scene-ben-dua",
    title: "Xóm Bến Dừa & Miếu Ông Địa",
    category: "gameplay",
    categoryLabel: "Hoạt Động Trong Xóm",
    image: "/game-assets/screenshots/world-thodia.png",
    caption: "Khung cảnh yên bình bên rặng dừa, ao sen và ngôi miếu đỏ đầu làng.",
    spriteBadge: "/game-assets/pixel/mieu.png",
  },
  {
    id: "scene-shop-sau-hien",
    title: "Sạp Rau Củ Cô Sáu Hiền",
    category: "gameplay",
    categoryLabel: "Hoạt Động Trong Xóm",
    image: "/game-assets/screenshots/shop-sauhien.png",
    caption: "Ghé chợ quê bán nông sản vừa thu hoạch và trò chuyện cùng bà con.",
    spriteBadge: "/game-assets/pixel/portrait-vendor.png",
  },
  {
    id: "scene-garden",
    title: "Mảnh Vườn Sau Hè Nhà Ngoại",
    category: "gameplay",
    categoryLabel: "Hoạt Động Trong Xóm",
    image: "/game-assets/travel/garden.png",
    caption: "Tự tay xới đất, gieo hạt và hứng nước mưa tưới mát luống rau quê.",
    spriteBadge: "/game-assets/pixel/muong-3.png",
  },
  {
    id: "env-hoi-an",
    title: "Phố Cổ Hội An Đêm Đèn Lồng",
    category: "environment",
    categoryLabel: "Bản Đồ Vùng Đất",
    image: "/game-assets/travel/hoiAn.png",
    caption: "Sắc vàng ấm áp của hàng trăm chiếc đèn lồng phản chiếu trên dòng sông Hoài.",
    spriteBadge: "/game-assets/ornaments/decor/lantern.png",
  },
  {
    id: "env-ha-noi",
    title: "Nhịp Sống Phố Phường Hà Nội",
    category: "environment",
    categoryLabel: "Bản Đồ Vùng Đất",
    image: "/game-assets/travel/haNoi.png",
    caption: "Khám phá phố xá nhộn nhịp, khu trưng bày xe và đường đua sôi động.",
    spriteBadge: "/game-assets/vehicles/supra-icon.png",
  },
  {
    id: "env-quang-ninh",
    title: "Vùng Mỏ & Vịnh Quảng Ninh",
    category: "environment",
    categoryLabel: "Bản Đồ Vùng Đất",
    image: "/game-assets/travel/quangNinh.png",
    caption: "Hành trình khai thác và tinh chế những viên đá quý lấp lánh vùng Đông Bắc.",
    spriteBadge: "/game-assets/mining/giant-diamond.png",
  },
  {
    id: "env-ba-den",
    title: "Đỉnh Núi Bà Đen Trong Sương",
    category: "environment",
    categoryLabel: "Bản Đồ Vùng Đất",
    image: "/game-assets/travel/baDen.png",
    caption: "Biển mây bồng bềnh trên đỉnh núi cao 986m của vùng đất Tây Ninh.",
    spriteBadge: "/game-assets/mining/emerald.png",
  },
  {
    id: "ui-settings-bamboo",
    title: "Đài Phát Thanh & Cài Đặt Làng Quê",
    category: "ui",
    categoryLabel: "Giao Diện Mộc Mạc",
    image: "/game-assets/screenshots/settings-bamboo.png",
    caption: "Khung tre đan thủ công ấm áp đồng hành cùng người chơi trong mọi hành trình.",
    spriteBadge: "/game-assets/ornaments/decor/flower-gold.png",
  },
];
