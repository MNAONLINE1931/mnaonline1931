// =============================================================
//  PRODUCT CATALOG
//
//  Each product is one block inside { }.
//  Add a product:     copy any block, paste it, change the text.
//  Remove a product:  delete its block.
//  Change a price:    edit the number after  price:
//
//  name / name_hi                English and Hindi name, in quotes
//  category                      Group for the filter buttons (English).
//                                Its Hindi name goes in CATEGORIES_HI below.
//  price                         A number like 350, or text like "Price on request"
//  price_hi                      Only needed when price is text
//  description / description_hi  Size, weight, pack, material. Can be "".
//  image                         File name inside the images folder, like "gita.jpg"
//  inStock                       Add  inStock: false  only when out of stock
//
//  Any _hi field can be left out; the English text is shown instead.
//  Keep the quotes "" and the comma after every } .
// =============================================================

window.CATEGORIES_HI = {
  "Religious Books":   "धार्मिक पुस्तकें",
  "Laddu Gopal":       "लड्डू गोपाल",
  "Idols":             "मूर्तियाँ",
  "Brass & Copper":    "पीतल और तांबा",
  "Puja Samagri":      "पूजा सामग्री",
  "Agarbatti & Dhoop": "अगरबत्ती और धूप",
  "Malas & Threads":   "माला और धागे",
};

window.PRODUCTS = [

  // ---------- Religious Books ----------
  { name: "Shri Ramcharitmanas", name_hi: "श्री रामचरितमानस",
    category: "Religious Books", price: 350,
    description: "Hindi, large print, hardbound", description_hi: "हिंदी, बड़े अक्षर, हार्डबाउंड",
    image: "ramcharitmanas.svg" },

  { name: "Shrimad Bhagavad Gita", name_hi: "श्रीमद्भगवद्गीता",
    category: "Religious Books", price: 150,
    description: "Sanskrit with Hindi meaning", description_hi: "संस्कृत, हिंदी अर्थ सहित",
    image: "bhagavad-gita.svg" },

  { name: "Hanuman Chalisa", name_hi: "हनुमान चालीसा",
    category: "Religious Books", price: 20,
    description: "Pocket size", description_hi: "पॉकेट साइज़",
    image: "hanuman-chalisa.svg" },

  { name: "Sunderkand", name_hi: "सुन्दरकाण्ड",
    category: "Religious Books", price: 40,
    description: "Hindi", description_hi: "हिंदी",
    image: "sunderkand.svg" },

  // ---------- Laddu Gopal ----------
  { name: "Laddu Gopal Dress", name_hi: "लड्डू गोपाल पोशाक",
    category: "Laddu Gopal", price: 120,
    description: "Size 2 to 6, many colours", description_hi: "साइज़ 2 से 6, कई रंगों में",
    image: "laddu-gopal-dress.svg" },

  { name: "Laddu Gopal Mukut and Bansuri Set", name_hi: "लड्डू गोपाल मुकुट और बांसुरी सेट",
    category: "Laddu Gopal", price: 90,
    description: "Size 3 to 5", description_hi: "साइज़ 3 से 5",
    image: "mukut-bansuri.svg" },

  // ---------- Idols ----------
  { name: "Laddu Gopal Idol", name_hi: "लड्डू गोपाल मूर्ति",
    category: "Idols", price: 550,
    description: "Brass, size 3", description_hi: "पीतल, साइज़ 3",
    image: "laddu-gopal-idol.svg" },

  { name: "Ganesh Idol", name_hi: "गणेश मूर्ति",
    category: "Idols", price: 450,
    description: "6 inch, marble finish with gold detailing", description_hi: "6 इंच, मार्बल फ़िनिश, सुनहरी सजावट",
    image: "ganesh-idol.svg" },

  { name: "Laxmi Ganesh Idol Pair", name_hi: "लक्ष्मी गणेश मूर्ति जोड़ी",
    category: "Idols", price: 1250,
    description: "Solid brass, 4 inch each", description_hi: "ठोस पीतल, हर मूर्ति 4 इंच",
    image: "laxmi-ganesh-pair.svg" },

  { name: "Custom size idols", name_hi: "मनचाहे साइज़ की मूर्तियाँ",
    category: "Idols", price: "Price on request", price_hi: "दाम पूछें",
    description: "Any deity, any size. Order 2 weeks ahead.", description_hi: "कोई भी देवता, कोई भी साइज़। 2 हफ़्ते पहले ऑर्डर करें।",
    image: "custom-idol.svg" },

  // ---------- Brass & Copper ----------
  { name: "Brass Pooja Bell", name_hi: "पीतल की पूजा घंटी",
    category: "Brass & Copper", price: 480,
    description: "4 inch, 150 g", description_hi: "4 इंच, 150 ग्राम",
    image: "brass-bell.svg" },

  { name: "Brass Shankh Stand", name_hi: "पीतल का शंख स्टैंड",
    category: "Brass & Copper", price: 250,
    description: "11 cm", description_hi: "11 सेमी",
    image: "shankh-stand.svg" },

  { name: "Puja Thali Set", name_hi: "पूजा थाली सेट",
    category: "Brass & Copper", price: 1450,
    description: "7 piece brass set with diya, bell and kalash", description_hi: "7 पीस पीतल सेट, दीया, घंटी और कलश सहित",
    image: "puja-thali.svg" },

  { name: "Copper Kalash", name_hi: "तांबे का कलश",
    category: "Brass & Copper", price: 650,
    description: "1 litre", description_hi: "1 लीटर",
    image: "copper-kalash.svg" },

  { name: "Brass Diya", name_hi: "पीतल का दीया",
    category: "Brass & Copper", price: 180,
    description: "Medium, for daily aarti", description_hi: "मध्यम, रोज़ की आरती के लिए",
    image: "brass-diya.svg" },

  // ---------- Puja Samagri ----------
  { name: "Kumkum (Roli)", name_hi: "कुमकुम (रोली)",
    category: "Puja Samagri", price: 35,
    description: "100 g", description_hi: "100 ग्राम",
    image: "kumkum.svg" },

  { name: "Kapur (Camphor) Tablets", name_hi: "कपूर की टिकिया",
    category: "Puja Samagri", price: 90,
    description: "50 g", description_hi: "50 ग्राम",
    image: "camphor.svg" },

  { name: "Gangajal", name_hi: "गंगाजल",
    category: "Puja Samagri", price: 45,
    description: "250 ml bottle", description_hi: "250 मिली बोतल",
    image: "gangajal.svg" },

  { name: "Havan Samagri", name_hi: "हवन सामग्री",
    category: "Puja Samagri", price: 120,
    description: "500 g", description_hi: "500 ग्राम",
    image: "havan-samagri.svg", inStock: false },

  // ---------- Agarbatti & Dhoop ----------
  { name: "Sandalwood Agarbatti", name_hi: "चंदन अगरबत्ती",
    category: "Agarbatti & Dhoop", price: 70,
    description: "100 g box", description_hi: "100 ग्राम डिब्बा",
    image: "sandalwood-agarbatti.svg" },

  { name: "Guggal Dhoop Cones", name_hi: "गुग्गल धूप कोन",
    category: "Agarbatti & Dhoop", price: 85,
    description: "Pack of 40", description_hi: "40 का पैक",
    image: "dhoop-cones.svg" },

  // ---------- Malas & Threads ----------
  { name: "Rudraksha Mala", name_hi: "रुद्राक्ष माला",
    category: "Malas & Threads", price: 350,
    description: "108 beads", description_hi: "108 मनके",
    image: "rudraksha-mala.svg" },

];
