export interface FamilyOrigin {
  id: "both" | "ba" | "ong" | "none";
  label: string;
  subtitle: string;
  guideName: string;
  guideRole: string;
  portrait: string;
  portraitTalk: string;
  welcomeQuote: string;
  firstTask: string;
  stipend: string;
  dialogue: { who: string; text: string; isPlayer?: boolean }[];
}

export const FAMILY_ORIGINS: FamilyOrigin[] = [
  {
    id: "both",
    label: "Còn cả ông bà ngoại",
    subtitle: "Hiên nhà rộn tiếng cười, bếp đỏ lửa chiều quê",
    guideName: "BÀ NGOẠI & ÔNG NGOẠI",
    guideRole: "Người đón con đầu ngõ",
    portrait: "/game-assets/pixel/portrait-grandma.png",
    portraitTalk: "/game-assets/pixel/portrait-grandma-talk.png",
    welcomeQuote: "Ngoại và ông ngoại đang chờ con ngoài hiên.",
    firstTask: "Cầm 10.000đ ngoại đưa, chạy ra Chợ Bến Dừa mua bó rau muống về nấu canh.",
    stipend: "10.000đ tiền chợ ngoại đưa",
    dialogue: [
      {
        who: "NGOẠI",
        text: "Trời ơi cục vàng của ngoại, mới về sao không báo bà trước, để bà chuẩn bị cơm, giặt mền gối cho con..",
      },
      {
        who: "BẠN",
        text: "Trời ơi, ngày xưa con ngủ trên cây còn được mà, mền gối chi ..",
        isPlayer: true,
      },
      {
        who: "NGOẠI",
        text: "Tổ cha mày, mày giỏi quá ... Thôi vô nhà cất đồ đi, rồi cầm 10.000đ chạy ù ra chợ mua cho ngoại bó rau muống!",
      },
      {
        who: "BẠN",
        text: "Khà khà khà, cháu của bà mà ... Để con chạy ra sạp cô Sáu Hiền liền!",
        isPlayer: true,
      },
    ],
  },
  {
    id: "ba",
    label: "Chỉ còn bà ngoại",
    subtitle: "Ngoại đứng chờ ngoài cổng, trong nhà bàn thờ ông thơm mùi nhang",
    guideName: "BÀ NGOẠI",
    guideRole: "Tựa cửa ngóng cháu về",
    portrait: "/game-assets/pixel/portrait-grandma.png",
    portraitTalk: "/game-assets/pixel/portrait-grandma-talk.png",
    welcomeQuote: "Ngoại vẫn đang chờ con ngoài hiên. Trong nhà, bàn thờ ông còn thơm mùi nhang.",
    firstTask: "Hái 1 nải chuối chín ngoài vườn vào thắp hương cho ông ngoại, rồi đi chợ mua rau.",
    stipend: "10.000đ + 1 Nải chuối vườn nhà",
    dialogue: [
      {
        who: "NGOẠI",
        text: "Về rồi đó hả con... Vô nhà thắp cho ông mày nén nhang trước đi, ổng trông mày dữ lắm.",
      },
      {
        who: "BẠN",
        text: "Dạ ngoại... Cây chuối sau hè ông trồng bữa nay trổ buồng chín vàng rồi kìa ngoại.",
        isPlayer: true,
      },
      {
        who: "NGOẠI",
        text: "Ừ, ra cắt một nải vô cúng ông đi con, rồi chiều ngoại cháu mình luộc rau muống chấm kho quẹt.",
      },
    ],
  },
  {
    id: "ong",
    label: "Chỉ còn ông ngoại",
    subtitle: "Ông ngoại trầm ngâm bên ấm trà, ký ức của ngoại nằm lại từng góc nhà",
    guideName: "ÔNG NGOẠI",
    guideRole: "Giữ nếp nhà xưa",
    portrait: "/game-assets/pixel/portrait-npc-nam.png",
    portraitTalk: "/game-assets/pixel/portrait-npc-nam-talk.png",
    welcomeQuote: "Ông ngoại đang chờ con ngoài hiên. Ngoại sống trong những thứ ngoại để lại.",
    firstTask: "Thu hoạch nải chuối chín mang vào thắp hương bàn thờ bà ngoại, nghe lời ngoại dặn qua từng kỷ vật.",
    stipend: "3 Hạt giống rau muống + Hũ nếp đường ngoại cất",
    dialogue: [
      {
        who: "ÔNG NGOẠI",
        text: "Về rồi hả con, lại đây ông coi. Đi xa cực không? Vô rửa mặt mũi rồi thắp cho bà nén nhang.",
      },
      {
        who: "BẠN",
        text: "Dạ ông ngoại! Con về ở với ông, làm lại mảnh vườn sau nhà như hồi bà còn.",
        isPlayer: true,
      },
      {
        who: "ÔNG NGOẠI",
        text: "Tốt. Cái cuốc với bình tưới bà mày vẫn để gọn trong góc nhà đó, lát ra xới ba luống đất trước đi con.",
      },
    ],
  },
  {
    id: "none",
    label: "Không còn ai",
    subtitle: "Chú Mười hàng xóm đứng đợi trước ngõ, căn nhà lưu giữ trọn vẹn hồi ức",
    guideName: "CHÚ MƯỜI",
    guideRole: "Hàng xóm nghĩa tình Bến Dừa",
    portrait: "/game-assets/pixel/portrait-npc-dung.png",
    portraitTalk: "/game-assets/pixel/portrait-npc-dung-talk.png",
    welcomeQuote: "Chú Mười đứng trước nhà, chờ con. Ông bà sống trong những thứ để lại.",
    firstTask: "Hái 2 nải chuối vườn nhà, thắp nhang tưởng nhớ ông bà ngoại và tự tay khơi lại hơi ấm bếp xưa.",
    stipend: "2 Nải chuối + Hũ nếp đường ngoại chừa sẵn",
    dialogue: [
      {
        who: "CHÚ MƯỜI",
        text: "Về quê chơi hả con, lâu quá mới gặp lại mày.",
      },
      {
        who: "BẠN",
        text: "Lâu quá mới gặp lại chú, dạo này 6h sáng còn uống rượu không ?",
        isPlayer: true,
      },
      {
        who: "CHÚ MƯỜI",
        text: "Chú bỏ lâu rồi mày, mày nhắc chuyện gì đâu không? Thôi vô nhà thắp nhang cho ông bà ngoại mày đi, chú quét lá sân trước giùm cho.",
      },
      {
        who: "BẠN",
        text: "Khà khà, cảm ơn chú Mười, thôi con vào nhà nha.",
        isPlayer: true,
      },
    ],
  },
];

export interface NgoaiKeepsake {
  id: string;
  title: string;
  actionLabel: string;
  location: string;
  icon: string;
  rewardText: string;
  lines: string[];
}

export const NGOAI_KEEPSAKES: NgoaiKeepsake[] = [
  {
    id: "altar",
    title: "Bàn thờ của ngoại",
    actionLabel: "Thắp nén nhang thơm",
    location: "Gian chính Nhà Ngoại",
    icon: "🕯️",
    rewardText: "+2 Trái chuối chín · Tâm tĩnh lặng",
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
    title: "Cái võng của ngoại",
    actionLabel: "Đung đưa võng trưa hè",
    location: "Góc nhà mát rượi",
    icon: "🌙",
    rewardText: "+15 Sức khỏe · Nghe gió qua mái lá",
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
    title: "Bếp củi chuối nướng",
    actionLabel: "Chụm củi nướng chuối nếp",
    location: "Gian bếp tro hồng",
    icon: "🔥",
    rewardText: "+25 Độ no · Thơm lừng cốt dừa",
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
    title: "Lu nước mưa của ngoại",
    actionLabel: "Múc gáo nước mưa mát lạnh",
    location: "Sân gạch bên hông nhà",
    icon: "💧",
    rewardText: "+25 Nước · Mát sương sớm",
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
    title: "Hiên nhà nghe cải lương",
    actionLabel: "Ngồi lại chỗ ngoại hay ngồi",
    location: "Trước hiên nhà ngoại (1172, 250)",
    icon: "🍵",
    rewardText: "+1 Lượt Quay Nhân Quả (Lần đầu)",
    lines: [
      "Chiều ra hiên ngồi, nghe cải lương, ngó trời đổi màu. Vậy là đủ một ngày.",
      "Ai đi ngang cũng ghé hiên uống chén trà. Hổng ai nghèo đi vì mời nhau một chén.",
      "Con đi đâu thì đi, cái hiên này vẫn còn đó cho con ghé.",
      "Sáng ngoại quét sân, lá xoài rụng nhiều là sắp có khách.",
      "Ngồi coi con chim chuyền cành cũng vui. Có thời giờ ngồi coi là giàu rồi.",
    ],
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
    shortTitle: "FERRARI SF90",
    fullName: "Siêu Xe Ferrari SF90 XX · Độc Bản",
    tier: "THẦN THOẠI",
    tierColor: "#FFD700",
    bgGradient: ["#591512", "#2B0806"],
    accentHex: "#FF5E4D",
    sprite: "/game-assets/pixel/body.png",
    valueText: "Tốc độ 320 · Đặc quyền GM",
    moneyBonus: 100000,
    lore: "Chiếc siêu xe đỏ rực đậu ngay đường đất Bến Dừa khiến cả xóm chạy ra coi. Phanh nhạy, mở cửa cánh chim, chạy tới đâu gió cuốn lá dừa tới đó!",
    thoDiaQuote: "Tổ cha mày! Quay kiểu gì trúng luôn chiếc xe đỏ chót của GM vậy con?! Chạy chậm thôi kẻo tông vô chuồng gà ngoại mày!",
    codePrefix: "TD-SF90XX",
  },
  {
    id: "giant-diamond",
    shortTitle: "KIM CƯƠNG MỎ",
    fullName: "Kim Cương Khổng Lồ Quảng Ninh",
    tier: "THẦN THOẠI",
    tierColor: "#67E8F9",
    bgGradient: ["#143846", "#091B24"],
    accentHex: "#38BDF8",
    sprite: "/game-assets/mining/giant-diamond.png",
    valueText: "Báu vật hầm lò sâu",
    moneyBonus: 50000,
    lore: "Viên kim cương nguyên khối phát sáng lấp lánh sau ca mỏ 2 tiếng cùng anh em tổ đội Quảng Ninh.",
    thoDiaQuote: "Á à! Tâm thiện nên trời độ nguyên cục kim cương bự chà bá lửa! Nhớ chia quỹ tổ mỏ cho anh em nghen chưa!",
    codePrefix: "TD-KIMCUONG",
  },
  {
    id: "supra-mk4",
    shortTitle: "SUPRA MK4",
    fullName: "Toyota Supra MK4 Trắng · Sáu Lộc",
    tier: "CỰC PHẨM",
    tierColor: "#F59E0B",
    bgGradient: ["#4A311B", "#26180C"],
    accentHex: "#FBBF24",
    sprite: "/game-assets/vehicles/supra-icon.png",
    valueText: "Trị giá 700.000.000đ",
    moneyBonus: 35000,
    lore: "Bản độ Supra trắng mâm tối, cánh gió lớn trứ danh tại tiệm Sửa Xe Sáu Lộc. Tiếng pô nổ giòn tan khắp phố Hà Nội.",
    thoDiaQuote: "Khà khà! Có Supra chạy đi chợ mua rau muống cho ngoại là nhất mày rồi đó!",
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
    lore: "Chúa tể dòng sông Bến Dừa. Chỉ những cần thủ kiên nhẫn canh chuẩn nhịp phao dưới bóng dừa mới kéo lên nổi.",
    thoDiaQuote: "Con cá Hô này bự hơn cái bụng tao nữa! Đem về kho tộ đãi cả xóm Bến Dừa ăn ba ngày chưa hết!",
    codePrefix: "TD-CAHOVUA",
  },
  {
    id: "emerald-treasure",
    shortTitle: "NGỌC LỤC BẢO",
    fullName: "Ngọc Lục Bảo Tinh Chế & Vàng Ròng",
    tier: "QUÝ HIẾM",
    tierColor: "#A7F3D0",
    bgGradient: ["#1F4938", "#10281E"],
    accentHex: "#4ADE80",
    sprite: "/game-assets/mining/emerald.png",
    valueText: "+18.000đ tiền mặt",
    moneyBonus: 18000,
    lore: "Tinh thể ngọc xanh biếc vừa ra lò tinh chế, mang năng lượng bình an của núi rừng đất mỏ.",
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
    valueText: "Thả hồ Koi nhà ngoại",
    moneyBonus: 15000,
    lore: "Chú cá Koi ba màu Đỏ - Trắng - Đen bơi lượn uyển chuyển, mang lại vượng khí cho mảnh vườn quê ngoại.",
    thoDiaQuote: "Thả vô ao nhà ngoại cho nó bơi chung với vịt! Nhìn cá lượn là hết mệt liền.",
    codePrefix: "TD-KOIVIP",
  },
  {
    id: "ngoai-gift",
    shortTitle: "LỘC CỦA NGOẠI",
    fullName: "Tiền Quê Ngoại Cho & Nải Chuối Chín",
    tier: "LỘC QUÊ",
    tierColor: "#FDE68A",
    bgGradient: ["#513727", "#312015"],
    accentHex: "#EAB308",
    sprite: "/game-assets/pixel/banana-ripe.png",
    valueText: "+20.000đ & 2 Nải chuối",
    moneyBonus: 20000,
    lore: "Tờ tiền ngoại vuốt phẳng phiu kẹp trong cuốn lịch cũ cùng nải chuối chín cây thơm lừng góc bếp.",
    thoDiaQuote: "Không có lộc nào quý bằng tấm lòng của ngoại đâu con ơi. Cầm lấy mà làm vốn trồng rau!",
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
    valueText: "+12.000đ & Combo Hạt Giống",
    moneyBonus: 12000,
    lore: "Hạt rau muống, cải xanh, dưa hấu cùng ổ trứng gà ta mới nhặt sáng nay ở chuồng mái lá.",
    thoDiaQuote: "Tay làm hàm nhai! Đem hạt giống về gieo 3 ô đất sau nhà ngoại là mai có tiền rủng rỉnh!",
    codePrefix: "TD-MUAGAT",
  },
];

export interface WorldRegion {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  image: string;
  secondaryImage?: string;
  weather: string;
  accent: string;
  highlights: string[];
  npcs: string[];
  transport: string;
}

export const WORLD_REGIONS: WorldRegion[] = [
  {
    id: "ben-dua",
    name: "Xóm Bến Dừa & Nhà Ngoại",
    badge: "MIỀN TÂY · MẶC ĐỊNH",
    tagline: "Nơi bắt đầu hành trình trở về: hàng dừa nghiêng bóng, ao sen, miếu Ông Thổ Địa và sạp rau cô Sáu Hiền.",
    image: "/game-assets/screenshots/world-thodia.png",
    secondaryImage: "/game-assets/travel/garden.png",
    weather: "Nắng hạ 31°C · Gió sông mát rượi",
    accent: "#357350",
    highlights: [
      "Trồng 8 vụ mùa thời gian thực: Rau muống, Cải xanh, Ớt, Cà chua, Dưa hấu, Lúa nếp",
      "Câu 40 loài cá sông bản địa (Cá Hô, Cá Chép, Cá Bông Lau, Lươn đồng...)",
      "Chăn nuôi gà, vịt, bò, heo, trâu & chăm sóc hồ cá Koi phong thủy",
      "5 Kỷ vật ký ức của Ngoại & Sổ Nhiệm Vụ Nhân Quả Ông Thổ Địa",
    ],
    npcs: ["Bà Ngoại", "Ông Thổ Địa", "Cô Sáu Hiền (Rau củ)", "Dì Năm (Hủ tiếu)", "Nghệ nhân Vinh (Đờn vọng cổ)"],
    transport: "Đi bộ · Xe đạp · Đò ngang bến sông",
  },
  {
    id: "hoi-an",
    name: "Phố Cổ Hội An",
    badge: "MIỀN TRUNG · DI SẢN",
    tagline: "Đèn lồng thắp sáng rực rỡ bên dòng sông Hoài, tiệm may cổ phục và những đêm rằm lung linh.",
    image: "/game-assets/travel/hoiAn.png",
    secondaryImage: "/game-assets/screenshots/redesign-ornate-concept.png",
    weather: "Chiều hoàng hôn · Đèn lồng lên đèn",
    accent: "#C99A35",
    highlights: [
      "Tiệm may cổ phục & cắt tóc phối đồ hàng trăm lớp trang phục Pixel Việt",
      "Hệ thống ánh sáng ban đêm (Night Emissive Lights) phản chiếu lung linh trên mặt nước",
      "Giao lưu cộng đồng, chụp ảnh kỷ niệm & dạo bước qua Chùa Cầu",
    ],
    npcs: ["Thợ may Hội An", "Cô bán đèn lồng", "Khách thập phương"],
    transport: "Xe buýt liên tỉnh từ Trạm Bến Dừa",
  },
  {
    id: "ha-noi",
    name: "Thủ Đô Hà Nội",
    badge: "MIỀN BẮC · PHỒN HOA",
    tagline: "Từ công viên xanh mát, phố xá nhộn nhịp đến Showroom Siêu Xe và trường đua Drift kịch tính.",
    image: "/game-assets/travel/haNoi.png",
    weather: "Tiết thu se lạnh · Nhịp sống sôi động",
    accent: "#2D91A0",
    highlights: [
      "Showroom & Tiệm Sửa Xe Sáu Lộc: Toyota Supra MK4 (700 triệu), VF3, Ferrari SF90 XX, Xe tải rồng",
      "Đường đua Hà Nội Circuit: phòng đua 6 người, cơ chế Drift vật lý & bảng vinh danh",
      "Hệ thống ATM chuyển tiền liên ngân hàng, bảng xếp hạng Đại Gia tuần",
    ],
    npcs: ["Sáu Lộc (Độ xe)", "Cảnh sát giao thông", "Quản lý Showroom"],
    transport: "Tuyến xe buýt Bắc - Nam · Siêu xe cá nhân",
  },
  {
    id: "quang-ninh",
    name: "Mỏ Khoáng Quảng Ninh",
    badge: "ĐẤT MỎ · TỔ ĐỘI",
    tagline: "Lập tổ đội 2–4 người vào ca mỏ 2 tiếng, đập đá tinh chế Kim Cương, Vàng Ròng và chia Quỹ Tổ Mỏ.",
    image: "/game-assets/travel/quangNinh.png",
    weather: "Sương mù vùng mỏ · Lò tinh chế rực lửa",
    accent: "#D97706",
    highlights: [
      "Hầm mỏ nhiều tầng: Than tinh chế, Đồng, Bạc, Vàng, Bạch Kim, Hồng Ngọc, Ngọc Lục Bảo, Kim Cương Khổng Lồ",
      "Minigame đập đá tinh chế quặng theo nhịp & chia thưởng công bằng qua Quỹ Tổ Mỏ",
      "Trang bị đồ bảo hộ mỏ chuyên dụng & xe chuyên chở khoáng sản",
    ],
    npcs: ["Đội trưởng Hầm Lò", "Thợ Máy Tinh Chế", "Thủ Quỹ Tổ Mỏ"],
    transport: "Xe chuyên dụng Vùng Mỏ Quảng Ninh",
  },
  {
    id: "tay-ninh",
    name: "Núi Bà Đen · Tây Ninh",
    badge: "TÂM LINH · SẮP MỞ",
    tagline: "Đỉnh núi mây phủ huyền thoại miền Đông Nam Bộ với những bí ẩn tâm linh đang chờ ngày khai mở.",
    image: "/game-assets/travel/baDen.png",
    weather: "Mây mù bao phủ trên đỉnh 986m",
    accent: "#8A332B",
    highlights: [
      "Khu vực khám phá tâm linh & nhiệm vụ truyền thuyết tiếp theo của Trải Đời",
      "Cảnh quan thiên nhiên hùng vĩ kết hợp kiến trúc bản địa đặc sắc",
      "Đang hoàn thiện để mở cửa đón cư dân Bến Dừa trong các bản cập nhật tới",
    ],
    npcs: ["Ẩn sĩ Núi Bà", "Ông Thổ Địa (Người giữ chuyện xưa)"],
    transport: "Tuyến xe đặc biệt (Sắp khai thông)",
  },
];

export const RESIDENT_LIVE_SCHEDULES = [
  {
    name: "Nghệ nhân Vinh",
    place: "Bến đò Chợ Bến Dừa",
    activity: "So dây đàn, thử một đoạn vọng cổ cho bà con nghe lúc chiều xuống",
    portrait: "/game-assets/pixel/portrait-npc-vinh-talk.png",
    time: "16:30",
  },
  {
    name: "Cô Sáu Hiền",
    place: "Sạp Rau Củ Chợ Lớn",
    activity: "Mời khách ghé quầy mua trứng gà ta mới đẻ, rau muống luộc & thu mua nông sản",
    portrait: "/game-assets/pixel/portrait-vendor-talk.png",
    time: "07:00 - 18:00",
  },
  {
    name: "Ông Thổ Địa",
    place: "Gốc cây cạnh Miếu Đỏ",
    activity: "Đứng phe phẩy quạt mo, xoa bụng cười khà khà chờ đám nhỏ về quê nhận quà nhân quả",
    portrait: "/game-assets/pixel/portrait-tho-dia.png",
    time: "Cả ngày",
  },
  {
    name: "Hải Xồm & Bếp Lửa",
    place: "Quán Nhậu Đầu Xóm",
    activity: "Châm trà đá, nhóm bếp than hồng chuẩn bị món trưa cho khách quen",
    portrait: "/game-assets/pixel/portrait-npc-hai-talk.png",
    time: "11:30",
  },
  {
    name: "Chú Bảy",
    place: "Bến Sông Bến Dừa",
    activity: "Ngồi ngó chuyến đò ngang, hỏi thăm bà con con nước lớn ròng",
    portrait: "/game-assets/pixel/portrait-dock-rest.png",
    time: "15:15",
  },
];
