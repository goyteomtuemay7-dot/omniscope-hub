import { Language, BannerSlide, AppService } from '../types';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
  { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo' },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ' },
];

export const STORAGE_KEY_LANG = 'omniscope_hub_language';

export function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    if (saved === 'en' || saved === 'am' || saved === 'om' || saved === 'ti') {
      return saved;
    }
  } catch (_) {}
  return 'en';
}

export function saveLanguage(lang: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  } catch (_) {}
}

export const translations = {
  en: {
    // Header & Brand
    countryBadge: 'Ethiopia',
    adminBadge: 'Admin',
    subscribedBadge: 'Subscribed',
    subscribeShort: '300 ETB',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    createAccount: 'Create New Account',

    // Search
    searchPlaceholder: 'Search jobs, scholarships, applications, opportunities…',
    quickSearch: 'Quick search:',
    tags: {
      Jobs: 'Jobs',
      Scholarships: 'Scholarships',
      Languages: 'Languages',
      Education: 'Education',
      Tenders: 'Tenders',
    },
    clearSearch: 'Clear search',
    matchesFound: 'applications match',
    matchFound: 'application match',
    noMatches: 'No applications matched',
    noMatchesHint: 'Try searching for jobs, scholarships, languages, or education.',

    // Homepage Auth Section
    ssoTitle: 'OmniScope Single Sign-On',
    authHeadline: 'Access All Ethiopian Opportunities',
    authSubheadline: 'Sign in once with Google or email to unlock verified jobs, scholarships, and learning tools.',
    memberGreeting: 'OmniScope Member',
    statusSubscribed: 'Subscribed (Active)',
    statusInactive: 'Inactive',
    subscribe300Btn: 'Subscribe (300 ETB)',

    // Applications Section
    appsHeading: 'OmniScope Applications',
    appsSubheading: 'One account and one subscription unlocks every connected opportunity portal.',
    filteredBadge: 'Filtered',
    activeBadge: 'Active',
    upcomingBadge: 'Upcoming',
    exploreBtn: 'Explore',
    exploreJobsBtn: 'Explore Jobs',
    openAppBtn: 'Open App',

    // Application Details Modal
    modalPurpose: 'Purpose',
    modalAbout: 'About',
    modalKeyFeatures: 'Key Features',
    modalSubActive: 'Your subscription is active!',
    modalOpenNow: 'Open Application',
    modalRestrictedTitle: 'Access OmniScope Applications',
    modalRestrictedVisitor: 'Sign in or create a free OmniScope account to access this application.',
    modalRestrictedUser: 'A single 300 ETB monthly subscription grants access to all connected applications.',
    modalActionAuth: 'Create Account / Sign In',
    modalActionSubscribe: 'Subscribe (300 ETB)',
    modalClose: 'Close',

    // About Section
    aboutBadge: 'Central Opportunity Hub',
    aboutHeading: 'About OmniScope',
    aboutParagraph: 'OmniScope is Ethiopia’s unified opportunity and information hub designed to connect job seekers, scholars, businesses, and learners in one accessible system. Rather than managing multiple accounts and individual subscriptions across disconnected websites, OmniScope brings verified careers, academic grants, language training, and educational archives together under a single, central platform.',
    aboutTagline: 'One Account • One Subscription • Multiple OmniScope Applications',

    // Pricing Modal
    pricingTitle: 'OmniScope Subscription',
    pricingSubtitle: 'One subscription for all applications',
    pricingTag: '300 ETB',
    pricingInterval: '/ month',
    pricingPill: 'All-Inclusive Pass',
    pricingBenefit1: 'Full access to OmniScope Jobs, Scholarships, Languages & Education',
    pricingBenefit2: 'Instant payment via Telebirr, CBE Birr, or debit/credit card',
    pricingBenefit3: 'Single Sign-On across all Ethiopian opportunities',
    pricingAlreadyActive: 'Your subscription is already active. Thank you!',
    pricingPayBtn: 'Pay 300 ETB via Chapa Gateway',
    pricingSimulateBtn: 'Simulate Test Payment (Sandbox)',
    pricingProcessing: 'Processing payment…',
    pricingSimulatingNotice: 'Simulating Chapa Payment Confirmation for 300 ETB...',
    pricingSuccessNotice: 'Payment confirmed! 30-Day OmniScope Access Activated.',
    pricingGatewayNotice: 'Subscription activated successfully via Chapa Gateway.',

    // Auth Modal
    authModalSignInTitle: 'Sign In to OmniScope Hub',
    authModalSignUpTitle: 'Create OmniScope Account',
    authModalSubtitle: 'Single Sign-On (SSO) gateway for Ethiopian job seekers, scholars, and professionals.',
    authModalTabSignIn: 'Sign In',
    authModalTabSignUp: 'Create Account',
    authModalGoogleBtn: 'Continue with Google',
    authModalOrEmail: 'or with email',
    authModalFullName: 'Full Name',
    authModalFullNamePlaceholder: 'e.g. Abebe Bikila',
    authModalEmail: 'Email Address',
    authModalEmailPlaceholder: 'your.email@example.com',
    authModalPassword: 'Password',
    authModalSubmitSignIn: 'Sign In',
    authModalSubmitSignUp: 'Create Free Account',
    authModalProcessing: 'Processing...',
    authModalDemoHint: 'Testing in Sandbox?',
    authModalFillDemo: 'Fill Demo Credentials',

    // Footer
    defaultAddress: 'Addis Ababa, Ethiopia',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    backToTop: 'Back to Top',
    adminDashboard: 'Admin Dashboard',
    staffAccess: 'Staff',
    allRightsReserved: 'All rights reserved.',
  },

  am: {
    // Header & Brand
    countryBadge: 'ኢትዮጵያ',
    adminBadge: 'አስተዳዳሪ',
    subscribedBadge: 'ተመዝግቧል',
    subscribeShort: '300 ብር',
    signIn: 'ይግቡ',
    signOut: 'ይውጡ',
    createAccount: 'አካውንት ይፍጠሩ',

    // Search
    searchPlaceholder: 'ስራዎችን፣ የትምህርት እድሎችን፣ መተግበሪያዎችን፣ አጋጣሚዎችን ይፈልጉ…',
    quickSearch: 'ፈጣን ፍለጋ:',
    tags: {
      Jobs: 'ስራዎች',
      Scholarships: 'የትምህርት እድሎች',
      Languages: 'ቋንቋዎች',
      Education: 'ትምህርት',
      Tenders: 'ጨረታዎች',
    },
    clearSearch: 'ፍለጋን አጽዳ',
    matchesFound: 'የተገኙ መተግበሪያዎች',
    matchFound: 'የተገኘ መተግበሪያ',
    noMatches: 'ምንም መተግበሪያ አልተገኘም ለ:',
    noMatchesHint: 'ስራዎችን፣ የትምህርት እድሎችን፣ ቋንቋዎችን ወይም ትምህርትን ለመፈለግ ይሞክሩ።',

    // Homepage Auth Section
    ssoTitle: 'የኦምኒስኮፕ ነጠላ መግቢያ (SSO)',
    authHeadline: 'ሁሉንም የኢትዮጵያ እድሎች ያግኙ',
    authSubheadline: 'የተረጋገጡ ስራዎችን፣ የትምህርት እድሎችን እና የመማሪያ መሳሪያዎችን ለመክፈት በGoogle ወይም በኢሜይል አንዴ ይግቡ።',
    memberGreeting: 'የኦምኒስኮፕ አባል',
    statusSubscribed: 'ተመዝግቧል (ንቁ)',
    statusInactive: 'ያልነቃ',
    subscribe300Btn: 'ይመዝገቡ (300 ብር)',

    // Applications Section
    appsHeading: 'የኦምኒስኮፕ መተግበሪያዎች',
    appsSubheading: 'አንድ አካውንት እና አንድ ምዝገባ የተገናኙትን የእድል መድረኮች በሙሉ ይከፍታል።',
    filteredBadge: 'የተጣራ',
    activeBadge: 'ንቁ',
    upcomingBadge: 'በቅርቡ',
    exploreBtn: 'ያስሱ',
    exploreJobsBtn: 'ስራዎችን ያስሱ',
    openAppBtn: 'መተግበሪያውን ይክፈቱ',

    // Application Details Modal
    modalPurpose: 'ዋና ዓላማ',
    modalAbout: 'ስለ መተግበሪያው',
    modalKeyFeatures: 'ዋና ዋና ባህሪያት',
    modalSubActive: 'ምዝገባዎ ንቁ ነው!',
    modalOpenNow: 'መተግበሪያውን አሁን ይክፈቱ',
    modalRestrictedTitle: 'የኦምኒስኮፕ መተግበሪያዎችን ይጠቀሙ',
    modalRestrictedVisitor: 'ይህንን መተግበሪያ ለመጠቀም ነፃ የኦምኒስኮፕ አካውንት ይግቡ ወይም ይፍጠሩ።',
    modalRestrictedUser: 'አንድ የ300 ብር ወርሃዊ ምዝገባ ሁሉንም የተገናኙ መተግበሪያዎች ለመጠቀም ያስችላል።',
    modalActionAuth: 'አካውንት ይፍጠሩ / ይግቡ',
    modalActionSubscribe: 'ይመዝገቡ (300 ብር)',
    modalClose: 'ዝጋ',

    // About Section
    aboutBadge: 'ማዕከላዊ የእድሎች ማዕከል',
    aboutHeading: 'ስለ ኦምኒስኮፕ',
    aboutParagraph: 'ኦምኒስኮፕ የስራ ፈላጊዎችን፣ ምሁራንን፣ ንግዶችን እና ተማሪዎችን በአንድ ተደራሽ ስርዓት ውስጥ ለማገናኘት የተነደፈ የኢትዮጵያ የተቀናጀ የእድል እና መረጃ ማዕከል ነው። በተለያዩ ድረ-ገጾች ላይ በርካታ አካውንቶችን እና የተለያዩ ክፍያዎችን ከማስተዳደር ይልቅ፣ ኦምኒስኮፕ የተረጋገጡ ስራዎችን፣ የትምህርት እድሎችን፣ የቋንቋ ስልጠናዎችን እና የትምህርት ማህደሮችን በአንድ ማዕከላዊ መድረክ ስር ያሰባስባል።',
    aboutTagline: 'አንድ አካውንት • አንድ ምዝገባ • በርካታ የኦምኒስኮፕ መተግበሪያዎች',

    // Pricing Modal
    pricingTitle: 'የኦምኒስኮፕ ምዝገባ',
    pricingSubtitle: 'አንድ ምዝገባ ለሁሉም መተግበሪያዎች',
    pricingTag: '300 ብር',
    pricingInterval: '/ በወር',
    pricingPill: 'ሁሉን አቀፍ ፓስ',
    pricingBenefit1: 'የኦምኒስኮፕ ስራዎች፣ የትምህርት እድሎች፣ ቋንቋዎች እና ትምህርት ሙሉ መዳረሻ',
    pricingBenefit2: 'በቴሌብር፣ በሲቢኢ ብር ወይም በባንክ ካርድ ፈጣን ክፍያ',
    pricingBenefit3: 'በሁሉም የኢትዮጵያ እድሎች ላይ አንድ ነጠላ መግቢያ (SSO)',
    pricingAlreadyActive: 'ምዝገባዎ አስቀድሞ ንቁ ነው። እናመሰግናለን!',
    pricingPayBtn: '300 ብር በቻፓ ይክፈሉ',
    pricingSimulateBtn: 'የሙከራ ክፍያ ይሞክሩ (ሳንድቦክስ)',
    pricingProcessing: 'ክፍያው እየተከናወነ ነው…',
    pricingSimulatingNotice: 'ለ300 ብር የቻፓ ክፍያ ማረጋገጫ በሙከራ ላይ ነው...',
    pricingSuccessNotice: 'ክፍያው ተረጋግጧል! የ30-ቀን የኦምኒስኮፕ መዳረሻ ነቅቷል።',
    pricingGatewayNotice: 'ምዝገባው በቻፓ የክፍያ በር በኩል በተሳካ ሁኔታ ነቅቷል።',

    // Auth Modal
    authModalSignInTitle: 'ወደ ኦምኒስኮፕ ማዕከል ይግቡ',
    authModalSignUpTitle: 'የኦምኒስኮፕ አካውንት ይፍጠሩ',
    authModalSubtitle: 'ለኢትዮጵያውያን ስራ ፈላጊዎች፣ ተማሪዎች እና ባለሙያዎች የተዘጋጀ ነጠላ መግቢያ።',
    authModalTabSignIn: 'ይግቡ',
    authModalTabSignUp: 'አካውንት ይፍጠሩ',
    authModalGoogleBtn: 'በGoogle ይቀጥሉ',
    authModalOrEmail: 'ወይም በኢሜይል',
    authModalFullName: 'ሙሉ ስም',
    authModalFullNamePlaceholder: 'ለምሳሌ፡ አበበ ቢቂላ',
    authModalEmail: 'የኢሜይል አድራሻ',
    authModalEmailPlaceholder: 'your.email@example.com',
    authModalPassword: 'የይለፍ ቃል',
    authModalSubmitSignIn: 'ይግቡ',
    authModalSubmitSignUp: 'ነፃ አካውንት ይፍጠሩ',
    authModalProcessing: 'በማከናወን ላይ...',
    authModalDemoHint: 'በሳንድቦክስ እየሞከሩ ነው?',
    authModalFillDemo: 'የሙከራ መረጃዎችን ሙላ',

    // Footer
    defaultAddress: 'አዲስ አበባ፣ ኢትዮጵያ',
    privacyPolicy: 'የግላዊነት ፖሊሲ',
    termsOfService: 'የአገልግሎት ውሎች',
    backToTop: 'ወደ ላይ ተመለስ',
    adminDashboard: 'የአስተዳዳሪ ዳሽቦርድ',
    staffAccess: 'ሰራተኞች',
    allRightsReserved: 'መብቱ በህግ የተጠበቀ ነው።',
  },

  om: {
    // Header & Brand
    countryBadge: 'Itoophiyaa',
    adminBadge: 'Bulchaa',
    subscribedBadge: 'Galmaa\'eera',
    subscribeShort: 'Qr 300',
    signIn: 'Seeni',
    signOut: 'Bahi',
    createAccount: 'Akkaawuntii Uumi',

    // Search
    searchPlaceholder: 'Hojiiwwan, carraa barnootaa, aplikeeshinoota, carraawwan barbaadaa…',
    quickSearch: 'Barbaacha ariifataa:',
    tags: {
      Jobs: 'Hojiiwwan',
      Scholarships: 'Carraa Barnootaa',
      Languages: 'Afaanota',
      Education: 'Barnoota',
      Tenders: 'Caalbaasii',
    },
    clearSearch: 'Barbaacha haqi',
    matchesFound: 'aplikeeshiniin argame',
    matchFound: 'aplikeeshiniin argame',
    noMatches: 'Aplikeeshiniin homaa hin argamne:',
    noMatchesHint: 'Hojiiwwan, carraa barnootaa, afaanota ykn barnoota barbaaduuf yaalaa.',

    // Homepage Auth Section
    ssoTitle: 'Seensa Tokko OmniScope (SSO)',
    authHeadline: 'Carraawwan Itoophiyaa Hunda Argadhaa',
    authSubheadline: 'Hojiiwwan mirkanaa\'an, carraa barnootaa fi meeshaalee barumsaa banuuf Google ykn imeelii keessaniin altokko seeni.',
    memberGreeting: 'Miseensa OmniScope',
    statusSubscribed: 'Galmaa\'eera (Hojjechaa jira)',
    statusInactive: 'Hin banamne',
    subscribe300Btn: 'Galmaa\'i (Qr 300)',

    // Applications Section
    appsHeading: 'Aplikeeshinoota OmniScope',
    appsSubheading: 'Akkaawuntii tokkoo fi galmee tokkoon carraawwan walitti hidhaman hunda bana.',
    filteredBadge: 'Filatame',
    activeBadge: 'Hojjechaa Jira',
    upcomingBadge: 'Gara Fuulduraatti',
    exploreBtn: 'Daawwadhaa',
    exploreJobsBtn: 'Hojiiwwan Daawwadhaa',
    openAppBtn: 'Aplikeeshinii Bani',

    // Application Details Modal
    modalPurpose: 'Kaayyoo Ijoo',
    modalAbout: 'Waa\'ee Aplikeeshinii',
    modalKeyFeatures: 'Amaloota Ijoo',
    modalSubActive: 'Galmeen keessan hojjechaa jira!',
    modalOpenNow: 'Aplikeeshinii Amma Bani',
    modalRestrictedTitle: 'Aplikeeshinoota OmniScope Fayyadamaa',
    modalRestrictedVisitor: 'Aplikeeshinii kana fayyadamuuf akkaawuntii OmniScope bilisaa bani ykn seeni.',
    modalRestrictedUser: 'Kaffaltiin ji\'aa Qr 300 tokko aplikeeshinoota walqabatan hunda bana.',
    modalActionAuth: 'Akkaawuntii Uumi / Seeni',
    modalActionSubscribe: 'Galmaa\'i (Qr 300)',
    modalClose: 'Cufi',

    // About Section
    aboutBadge: 'Wiirtuu Carraa Giddugaleessaa',
    aboutHeading: 'Waa\'ee OmniScope',
    aboutParagraph: 'OmniScope wiirtuu odeeffannoo fi carraa walitti hidhame kan Itoophiyaa yoo ta\'u, barbaaddota hojii, barattoota, daldaltoota fi barattonni sirna tokko keessatti walqunnamsiisuuf kan qophaa\'edha. Marsariitiiwwan adda addaa irratti akkaawuntii baay\'ee fi kaffaltii adda addaa bulchuu mannaa, OmniScope hojiiwwan mirkanaa\'an, carraa barnootaa, leenjii afaanii fi kuusaa barnootaa waltajjii giddugaleessaa tokko jalatti walitti fida.',
    aboutTagline: 'Akkaawuntii Tokko • Kaffaltii Tokko • Aplikeeshinoota OmniScope Baay\'ee',

    // Pricing Modal
    pricingTitle: 'Galmee OmniScope',
    pricingSubtitle: 'Galmee tokko aplikeeshinoota hundaaf',
    pricingTag: 'Qr 300',
    pricingInterval: '/ ji\'atti',
    pricingPill: 'Paasii Hunda Qabate',
    pricingBenefit1: 'Hojiiwwan, carraa barnootaa, afaanota fi barnoota OmniScope hunda argadhaa',
    pricingBenefit2: 'Kaffaltii saffisaa Telebirr, CBE Birr ykn kaardii baankiitiin',
    pricingBenefit3: 'Carraawwan Itoophiyaa hundaaf seensa tokko (SSO)',
    pricingAlreadyActive: 'Galmeen keessan kanaan dura hojjechaa jira. Galatoomaa!',
    pricingPayBtn: 'Qr 300 Karaa Chapa Kaffalaa',
    pricingSimulateBtn: 'Kaffaltii Yaalii (Sandbox)',
    pricingProcessing: 'Kaffaltiin raawwatamaa jira…',
    pricingSimulatingNotice: 'Kaffaltii Qr 300 Chapa yaalii mirkaneessaa jira...',
    pricingSuccessNotice: 'Kaffaltiin mirkanaa\'eera! Tajaajilli OmniScope Guyyaa 30 hojiirra ooleera.',
    pricingGatewayNotice: 'Galmeen karaa Chapa milkaa\'inaan banameera.',

    // Auth Modal
    authModalSignInTitle: 'Gara Wiirtuu OmniScope Seenaa',
    authModalSignUpTitle: 'Akkaawuntii OmniScope Uumaa',
    authModalSubtitle: 'Barbaaddota hojii, barattoota fi ogeeyyii Itoophiyaatiif seensa tokko.',
    authModalTabSignIn: 'Seeni',
    authModalTabSignUp: 'Akkaawuntii Uumi',
    authModalGoogleBtn: 'Google\'n Itti Fufaa',
    authModalOrEmail: 'ykn imeelii keessaniin',
    authModalFullName: 'Maqaa Guutuu',
    authModalFullNamePlaceholder: 'fkn. Ababaa Biqilaa',
    authModalEmail: 'Teessoo Imeelii',
    authModalEmailPlaceholder: 'your.email@example.com',
    authModalPassword: 'Jecha Darbiinsa',
    authModalSubmitSignIn: 'Seeni',
    authModalSubmitSignUp: 'Akkaawuntii Bilisaa Uumi',
    authModalProcessing: 'Hojjechaa jira...',
    authModalDemoHint: 'Sandbox keessatti yaalaa jirtuu?',
    authModalFillDemo: 'Ragaalee Yaalii Guuti',

    // Footer
    defaultAddress: 'Finfinnee, Itoophiyaa',
    privacyPolicy: 'Imaammata Dhuunfaa',
    termsOfService: 'Waliigaltee Tajaajilaa',
    backToTop: 'Gara Olitti Deebi\'i',
    adminDashboard: 'Daashboordii Bulchaa',
    staffAccess: 'Hojjettoota',
    allRightsReserved: 'Mirgi hundi eegamaadha.',
  },

  ti: {
    // Header & Brand
    countryBadge: 'ኢትዮጵያ',
    adminBadge: 'ኣመሓዳሪ',
    subscribedBadge: 'ተመዝጊቡ',
    subscribeShort: '300 ቅርሺ',
    signIn: 'እተዉ',
    signOut: 'ውጽኡ',
    createAccount: 'ሓዱሽ ኣካውንት ፍጠሩ',

    // Search
    searchPlaceholder: 'ስራሕቲ፣ ናይ ትምህርቲ ዕድላት፣ መተግበሪታት፣ ኣጋጣሚታት ድለዩ…',
    quickSearch: 'ቅልጡፍ ምድላይ:',
    tags: {
      Jobs: 'ስራሕቲ',
      Scholarships: 'ናይ ትምህርቲ ዕድላት',
      Languages: 'ቋንቋታት',
      Education: 'ትምህርቲ',
      Tenders: 'ጨረታታት',
    },
    clearSearch: 'ምድላይ ኣጽርዮ',
    matchesFound: 'ዝተረኽቡ መተግበሪታት',
    matchFound: 'ዝተረኽበ መተግበሪ',
    noMatches: 'ዋላ ሓደ መተግበሪ ኣይተረኽበን ን:',
    noMatchesHint: 'ስራሕቲ፣ ናይ ትምህርቲ ዕድላት፣ ቋንቋታት ወይ ትምህርቲ ንምድላይ ፈትኑ።',

    // Homepage Auth Section
    ssoTitle: 'ናይ ኦምኒስኮፕ ሓደ መእተዊ (SSO)',
    authHeadline: 'ኩሎም ናይ ኢትዮጵያ ዕድላት ርኸቡ',
    authSubheadline: 'ዝተረጋገጹ ስራሕቲ፣ ናይ ትምህርቲ ዕድላትን መምሃሪ መሳርሕታትን ንምኽፋት ብGoogle ወይ ብኢመይል ሓንሳብ እተዉ።',
    memberGreeting: 'ኣባል ኦምኒስኮፕ',
    statusSubscribed: 'ተመዝጊቡ (ንጡፍ)',
    statusInactive: 'ዘይተነቕሐ',
    subscribe300Btn: 'ተመዝገቡ (300 ቅርሺ)',

    // Applications Section
    appsHeading: 'ናይ ኦምኒስኮፕ መተግበሪታት',
    appsSubheading: 'ሓደ ኣካውንትን ሓደ ምዝገባን ንኹሎም ዝተኣሳሰሩ ናይ ዕድል መድረኻት ይኸፍት።',
    filteredBadge: 'ዝተጻረየ',
    activeBadge: 'ንጡፍ',
    upcomingBadge: 'ኣብ ቀረባ',
    exploreBtn: 'ዳህስሱ',
    exploreJobsBtn: 'ስራሕቲ ዳህስሱ',
    openAppBtn: 'መተግበሪ ኽፈቱ',

    // Application Details Modal
    modalPurpose: 'ቀንዲ ዕላማ',
    modalAbout: 'ብዛዕባ መተግበሪ',
    modalKeyFeatures: 'ቀንድ ባህርያት',
    modalSubActive: 'ምዝገባኹም ንጡፍ እዩ!',
    modalOpenNow: 'መተግበሪ ሕጂ ኽፈቱ',
    modalRestrictedTitle: 'ናይ ኦምኒስኮፕ መተግበሪታት ተጠቐሙ',
    modalRestrictedVisitor: 'ነዚ መተግበሪ ንምጥቃም ብነጻ ናይ ኦምኒስኮፕ ኣካውንት እተዉ ወይ ፍጠሩ።',
    modalRestrictedUser: 'ሓደ ናይ 300 ቅርሺ ወርሓዊ ምዝገባ ንኹሎም ዝተኣሳሰሩ መተግበሪታት ንምጥቃም የኽእል።',
    modalActionAuth: 'ኣካውንት ፍጠሩ / እተዉ',
    modalActionSubscribe: 'ተመዝገቡ (300 ቅርሺ)',
    modalClose: 'ዕጸዉ',

    // About Section
    aboutBadge: 'ማእከላይ ናይ ዕድላት ማእከል',
    aboutHeading: 'ብዛዕባ ኦምኒስኮፕ',
    aboutParagraph: 'ኦምኒስኮፕ ንደለይቲ ስራሕ፣ ተምሃሮ፣ ንግዳትን ተምሃሮን ኣብ ሓደ ቅሉዕ ስርዓት ንምትእስሳር ዝተዳለወ ናይ ኢትዮጵያ ዝተወሃሃደ ናይ ዕድልን ሓበሬታን ማእከል እዩ። ኣብ ዝተፈላለዩ መርበብ ሓበሬታታት ብዙሓት ኣካውንትታትን ዝተፈላለዩ ክፍሊታትን ካብ ምምሕዳር፣ ኦምኒስኮፕ ዝተረጋገጹ ስራሕቲ፣ ናይ ትምህርቲ ዕድላት፣ ናይ ቋንቋ ስልጠናታትን ናይ ትምህርቲ መዛግብትን ኣብ ትሕቲ ሓደ ማእከላይ መድረኽ የከባኽብ።',
    aboutTagline: 'ሓደ ኣካውንት • ሓደ ምዝገባ • ብዙሓት ናይ ኦምኒስኮፕ መተግበሪታት',

    // Pricing Modal
    pricingTitle: 'ናይ ኦምኒስኮፕ ምዝገባ',
    pricingSubtitle: 'ሓደ ምዝገባ ንኹሎም መተግበሪታት',
    pricingTag: '300 ቅርሺ',
    pricingInterval: '/ ኣብ ወርሒ',
    pricingPill: 'ኩሉ ዝሓቖፈ ፓስ',
    pricingBenefit1: 'ናይ ኦምኒስኮፕ ስራሕቲ፣ ናይ ትምህርቲ ዕድላት፣ ቋንቋታትን ትምህርትን ምሉእ መእተዊ',
    pricingBenefit2: 'ብቴሌብር፣ ብሲቢኢ ብር ወይ ባንኪ ካርድ ቅልጡፍ ክፍሊት',
    pricingBenefit3: 'ኣብ ኩሎም ናይ ኢትዮጵያ ዕድላት ሓደ መእተዊ (SSO)',
    pricingAlreadyActive: 'ምዝገባኹም ኣቐዲሙ ንጡፍ እዩ። የቐንየልና!',
    pricingPayBtn: '300 ቅርሺ ብቻፓ ኽፈሉ',
    pricingSimulateBtn: 'ናይ ፈተነ ክፍሊት ፈትኑ (Sandbox)',
    pricingProcessing: 'ክፍሊት ይፍጸም ኣሎ…',
    pricingSimulatingNotice: 'ን300 ቅርሺ ናይ ቻፓ ክፍሊት ፈተነ ይረጋገጽ ኣሎ...',
    pricingSuccessNotice: 'ክፍሊት ተረጋገጸ! ናይ 30 መዓልቲ ናይ ኦምኒስኮፕ መእተዊ ተነቒሑ።',
    pricingGatewayNotice: 'ምዝገባ ብደሓን በቲ ናይ ቻፓ መእተዊ ተነቒሑ ኣሎ።',

    // Auth Modal
    authModalSignInTitle: 'ናብ ማእከል ኦምኒስኮፕ እተዉ',
    authModalSignUpTitle: 'ናይ ኦምኒስኮፕ ኣካውንት ፍጠሩ',
    authModalSubtitle: 'ንደለይቲ ስራሕ፣ ተምሃሮን ሰብ ሞያን ኢትዮጵያ ዝተዳለወ ሓደ መእተዊ።',
    authModalTabSignIn: 'እተዉ',
    authModalTabSignUp: 'ኣካውንት ፍጠሩ',
    authModalGoogleBtn: 'ብGoogle ቀጽሉ',
    authModalOrEmail: 'ወይ ብኢመይል',
    authModalFullName: 'ምሉእ ስም',
    authModalFullNamePlaceholder: 'ንኣብነት፡ ኣበበ ቢቂላ',
    authModalEmail: 'ናይ ኢመይል ኣድራሻ',
    authModalEmailPlaceholder: 'your.email@example.com',
    authModalPassword: 'መሕለፊ ቓል',
    authModalSubmitSignIn: 'እተዉ',
    authModalSubmitSignUp: 'ናጻ ኣካውንት ፍጠሩ',
    authModalProcessing: 'ይስራሕ ኣሎ...',
    authModalDemoHint: 'ኣብ ሳንድቦክስ ትፍትኑ ኣለኹም?',
    authModalFillDemo: 'ናይ ፈተነ መረዳእታታት ምላእ',

    // Footer
    defaultAddress: 'ኣዲስ ኣበባ፣ ኢትዮጵያ',
    privacyPolicy: 'ናይ ብሕታዊነት ፖሊሲ',
    termsOfService: 'ናይ ኣገልግሎት ውዕላት',
    backToTop: 'ናብ ላዕሊ ተመለስ',
    adminDashboard: 'ናይ ኣመሓዳሪ ዳሽቦርድ',
    staffAccess: 'ሰራሕተኛታት',
    allRightsReserved: 'መሰሉ ብሕጊ ዝተሓለወ እዩ።',
  },
};

// Localized Banners Generator
export function getLocalizedBanners(baseBanners: BannerSlide[], lang: Language): BannerSlide[] {
  if (lang === 'en') return baseBanners;

  const localizedText: Record<string, Partial<Record<Language, Partial<BannerSlide>>>> = {
    'banner-1': {
      am: {
        title: 'ማዕከላዊ የኢትዮጵያ እድሎች ማዕከል',
        subtitle: 'አንድ አካውንት እና ወርሃዊ ክፍያ የተረጋገጡ ስራዎችን፣ የትምህርት እድሎችን፣ የቋንቋ ስልጠናዎችን እና ብሔራዊ ትምህርትን ይከፍታል።',
        tag: 'ብሔራዊ መድረክ',
        badge: 'የተዋሃደ SSO',
        ctaText: 'መተግበሪያዎችን ያስሱ'
      },
      om: {
        title: 'Wiirtuu Carraa Itoophiyaa Isa Giddugaleessaa',
        subtitle: 'Akkaawuntii tokkoo fi kaffaltii ji\'aatiin hojiiwwan mirkanaa\'an, carraa barnootaa, leenjii afaanii fi barnoota biyyoolessaa bana.',
        tag: 'Waltajjii Biyyoolessaa',
        badge: 'SSO Tokko',
        ctaText: 'Aplikeeshinoota Daawwadhaa'
      },
      ti: {
        title: 'ማእከላይ ናይ ኢትዮጵያ ዕድላት ማእከል',
        subtitle: 'ሓደ ኣካውንትን ወርሓዊ ክፍሊትን ዝተረጋገጹ ስራሕቲ፣ ናይ ትምህርቲ ዕድላት፣ ናይ ቋንቋ ስልጠናታትን ሃገራዊ ትምህርትን ይኸፍት።',
        tag: 'ሃገራዊ መድረኽ',
        badge: 'ዝተወሃሃደ SSO',
        ctaText: 'መተግበሪታት ዳህስሱ'
      }
    },
    'banner-2': {
      am: {
        title: 'ኦምኒስኮፕ ስራዎች • ብሔራዊ የስራ ልውውጥ',
        subtitle: 'የተረጋገጡ የቴክኖሎጂ፣ የባንክ እና የድርጅት ክፍት የስራ ቦታዎች ቀጥተኛ መዳረሻ።',
        tag: 'ስራና ቅጥር',
        badge: 'አሁን ንቁ ነው',
        ctaText: 'ስራዎችን ይመልከቱ'
      },
      om: {
        title: 'Hojiiwwan OmniScope • Carraawwan Hojii Biyyoolessaa',
        subtitle: 'Banka, teeknooloojii fi dhaabbilee Itoophiyaa keessaa hojiiwwan mirkanaa\'an kallattiin argadhaa.',
        tag: 'Hojii fi Qacarra',
        badge: 'Amma Hojjechaa Jira',
        ctaText: 'Hojiiwwan Ilaalaa'
      },
      ti: {
        title: 'ኦምኒስኮፕ ስራሕቲ • ሃገራዊ ናይ ስራሕ ልውውጥ',
        subtitle: 'ዝተረጋገጹ ናይ ቴክኖሎጂ፣ ባንክን ትካላትን ክፍቲ ናይ ስራሕ ቦታታት ቀጥታዊ መእተዊ።',
        tag: 'ስራሕን ቆጺርን',
        badge: 'ሕጂ ይሰርሕ ኣሎ',
        ctaText: 'ስራሕቲ ርኣዩ'
      }
    },
    'banner-3': {
      am: {
        title: 'አንድ ፓስ • 300 ብር ሙሉ መዳረሻ',
        subtitle: 'በቴሌብር ወይም በሲቢኢ ብር በሁሉም የኦምኒስኮፕ አገልግሎቶች ያልተገደበ መዳረሻን ያግብሩ።',
        tag: 'የቻፓ ክፍያ',
        badge: 'ተመራጭ ዋጋ',
        ctaText: 'መዳረሻ ያግኙ'
      },
      om: {
        title: 'Paasii Tokko • Qr 300 Hundaaf',
        subtitle: 'Telebirr ykn CBE Birr fayyadamuun tajaajiloota OmniScope hunda bilisaan fayyadamaa.',
        tag: 'Kaffaltii Chapa',
        badge: 'Gatii Gaarii',
        ctaText: 'Mirkaneeffadhaa'
      },
      ti: {
        title: 'ሓደ ፓስ • 300 ቅርሺ ምሉእ መእተዊ',
        subtitle: 'ብቴሌብር ወይ ሲቢኢ ብር ኣብ ኩሎም ናይ ኦምኒስኮፕ ኣገልግሎታት ዘይተገደበ መእተዊ ኣንቅሑ።',
        tag: 'ናይ ቻፓ ክፍሊት',
        badge: 'ዝበለጸ ዋጋ',
        ctaText: 'መእተዊ ርኸቡ'
      }
    }
  };

  return baseBanners.map(banner => {
    const loc = localizedText[banner.id]?.[lang];
    if (loc) {
      return { ...banner, ...loc };
    }
    return banner;
  });
}

// Localized Applications Generator
export function getLocalizedApps(baseApps: AppService[], lang: Language): AppService[] {
  if (lang === 'en') return baseApps;

  const localizedAppsText: Record<string, Partial<Record<Language, Partial<AppService>>>> = {
    'app-jobs': {
      am: {
        name: 'ኦምኒስኮፕ ስራዎች',
        tagline: 'የተረጋገጡ የኢትዮጵያ ስራዎች፣ የቴክኖሎጂ ቅጥር እና የመንግስታዊ ያልሆኑ ድርጅቶች ክፍት ቦታዎች',
        description: 'በኢትዮጵያ ውስጥ የተረጋገጡ የስራ ክፍተቶችን የሚያቀርብ ብሔራዊ የስራ መድረክ። ከታመኑ የሀገር ውስጥ እና አለም አቀፍ ድርጅቶች ጋር በቀጥታ ያገናኛል።',
        mainPurpose: 'በኢትዮጵያ ውስጥ የስራ እድሎችን እና የቅጥር አማራጮችን ያግኙ።',
        category: 'ስራ እና ቅጥር',
        stats: '2,450+ ንቁ ስራዎች',
        features: [
          'የባንክ፣ የቴሌኮም እና የቴክኖሎጂ ስራዎች',
          'የመንግስታዊ ያልሆኑ ድርጅቶች (NGO) እና ዓለም አቀፍ ድርጅቶች ክፍት የስራ ቦታዎች',
          'ቀጥተኛ የቴሌግራም እና የኢሜይል ማመልከቻ መመሪያዎች',
          'ለአዳዲስ ተመራቂዎች እና ለባለሙያዎች የተዘጋጀ'
        ]
      },
      om: {
        name: 'Hojiiwwan OmniScope',
        tagline: 'Hojiiwwan mirkanaa\'an Itoophiyaa, qacarra teeknooloojii fi bakkeewwan hojii NGO',
        description: 'Waltajjii hojii biyyoolessaa hojiiwwan mirkanaa\'an Itoophiyaa keessatti dhiheessu. Dhaabbilee amanamoo biyya keessaa fi idil-addunyaa waliin kallattiin walqunnamsiisa.',
        mainPurpose: 'Itoophiyaa keessatti carraawwan hojii fi qacarraa barbaadaa.',
        category: 'Hojii fi Qacarra',
        stats: '2,450+ Hojiiwwan Ammaa',
        features: [
          'Hojiiwwan baankii, telekoomii fi teeknooloojii',
          'Hojiiwwan NGO fi dhaabbilee idil-addunyaa',
          'Qajeelfama iyyannoo kallattii Telegram fi Imeelii',
          'Eebbifamtoota haaraa fi ogeeyyiif kan qophaa\'e'
        ]
      },
      ti: {
        name: 'ኦምኒስኮፕ ስራሕቲ',
        tagline: 'ዝተረጋገጹ ናይ ኢትዮጵያ ስራሕቲ፣ ናይ ቴክኖሎጂ ቅጥርን ናይ NGO ክፍቲ ቦታታትን',
        description: 'ኣብ ኢትዮጵያ ዝተረጋገጹ ናይ ስራሕ ክፍተታት ዘቕርብ ሃገራዊ ናይ ስራሕ መድረኽ። ምስ እሙናት ናይ ውሽጢ ዓድን ዓለምለኸን ትካላት ብቐጥታ የራኽብ።',
        mainPurpose: 'ኣብ ኢትዮጵያ ናይ ስራሕ ዕድላትን ናይ ቆጺር ኣማራጽታትን ድለዩ።',
        category: 'ስራሕን ቆጺርን',
        stats: '2,450+ ንጡፋት ስራሕቲ',
        features: [
          'ናይ ባንክ፣ ቴሌኮምን ቴክኖሎጂን ስራሕቲ',
          'ናይ ዘይመንግስታዊ ትካላት (NGO)ን ዓለምለኸ ትካላትን ክፍቲ ናይ ስራሕ ቦታታት',
          'ቀጥታዊ ናይ ቴሌግራምን ኢመይልን መመልከቲ መምርሒታት',
          'ንሓደሽቲ ተመረቕትን ንሰብ ሞያን ዝተዳለወ'
        ]
      }
    },
    'app-scholarships': {
      am: {
        name: 'ኦምኒስኮፕ የትምህርት እድሎች',
        tagline: 'ዓለም አቀፍ የነፃ የትምህርት እድሎች፣ የስልጠና ድጋፎች እና የዩኒቨርሲቲ የገንዘብ ድጋፍ',
        description: 'ለኢትዮጵያውያን ተማሪዎች እና ተመራማሪዎች የተዘጋጀ ዓለም አቀፍ የነፃ የትምህርት እድል ዳታቤዝ። ሙሉ ወጪ የሚሸፍኑ የባችለር፣ ማስተርስ እና ፒኤችዲ እድሎችን ያካትታል።',
        mainPurpose: 'ዓለም አቀፍ የነፃ የትምህርት እና የገንዘብ ድጋፍ እድሎችን ያግኙ።',
        category: 'ትምህርት እና ስኮላርሺፕ',
        stats: '620+ የተረጋገጡ ስኮላርሺፖች',
        features: [
          'ሙሉ ወጪ የሚሸፍኑ ዓለም አቀፍ የዩኒቨርሲቲ እድሎች',
          'የመግቢያ መስፈርቶች እና የጊዜ ሰሌዳዎች',
          'ለኢትዮጵያውያን ተማሪዎች የመመሪያ ሰነዶች',
          'የአውሮፓ፣ እስያ እና አሜሪካ ስኮላርሺፖች'
        ]
      },
      om: {
        name: 'Carraa Barnootaa OmniScope',
        tagline: 'Carraawwan barnootaa idil-addunyaa bilisaa fi deeggarsa yuunivarsiitii',
        description: 'Barattoota fi qorattoota Itoophiyaatiif kuusaa ragaa carraa barnootaa bilisaa idil-addunyaa. Baasii guutuu kan kaffalu Baachelar, Maastarsii fi PhD of keessatti qabata.',
        mainPurpose: 'Carraawwan barnootaa bilisaa fi deeggarsa maallaqaa idil-addunyaa argadhaa.',
        category: 'Barnoota fi Iskoolaarshiippii',
        stats: '620+ Carraawwan Mirkanaa\'an',
        features: [
          'Carraawwan yuunivarsiitii idil-addunyaa baasii guutuu kaffalan',
          'Ulaagaalee seensaa fi guyyoota xumuraa',
          'Qajeelfama barattoota Itoophiyaatiif qophaa\'e',
          'Iskoolaarshiippii Awurooppaa, Eeshiyaa fi Ameerikaa'
        ]
      },
      ti: {
        name: 'ኦምኒስኮፕ ናይ ትምህርቲ ዕድላት',
        tagline: 'ዓለምለኸ ናይ ነጻ ትምህርቲ ዕድላት፣ ናይ ስልጠና ደገፋትን ናይ ዩኒቨርሲቲ ገንዘባዊ ደገፍን',
        description: 'ንኢትዮጵያውያን ተምሃሮን ተመራመርትን ዝተዳለወ ዓለምለኸ ናይ ነጻ ትምህርቲ ዕድል ዳታቤዝ። ምሉእ ወጻኢታት ዝሽፍኑ ናይ ባችለር፣ ማስተርስን ፒኤችዲን ዕድላት የጠቓልል።',
        mainPurpose: 'ዓለምለኸ ናይ ነጻ ትምህርትን ናይ ገንዘብ ደገፍ ዕድላትን ድለዩ።',
        category: 'ትምህርትን ስኮላርሺፕን',
        stats: '620+ ዝተረጋገጹ ስኮላርሺፓት',
        features: [
          'ምሉእ ወጻኢታት ዝሽፍኑ ዓለምለኸ ናይ ዩኒቨርሲቲ ዕድላት',
          'ናይ መእተዊ ረቛሒታትን ናይ ግዜ ሰሌዳታትን',
          'ንኢትዮጵያውያን ተምሃሮ ናይ መምርሒ ሰነዳት',
          'ናይ ኤውሮጳ፣ እስያን ኣሜሪካን ስኮላርሺፓት'
        ]
      }
    },
    'app-languages': {
      am: {
        name: 'ኦምኒስኮፕ ቋንቋዎች',
        tagline: 'የስራ ቦታ የቋንቋ ብቃት ማዳበሪያ፡ አማርኛ፣ አፋን ኦሮሞ፣ ትግርኛ እና እንግሊዝኛ',
        description: 'ለስራ እና ለሙያ እድገት የተዘጋጀ የኢትዮጵያ ቋንቋዎች መማሪያ መድረክ። የቃላት አጠቃቀምን፣ ንግግርን እና ሰዋሰውን ያካተተ።',
        mainPurpose: 'የሀገር ውስጥ እና አለም አቀፍ ቋንቋዎችን ይማሩ እና ይለማመዱ።',
        category: 'ቋንቋ እና ግንኙነት',
        stats: '4 ቁልፍ ቋንቋዎች',
        features: [
          'አማርኛ፣ አፋን ኦሮሞ፣ ትግርኛ እና እንግሊዝኛ',
          'የስራ ቦታ እና የንግድ ውይይት ሞጁሎች',
          'ድምፅ እና የቃላት አነባበብ ልምምዶች',
          'ደረጃ በደረጃ የሚሰጥ የሙያ ፈተና'
        ]
      },
      om: {
        name: 'Afaanota OmniScope',
        tagline: 'Dandeettii afaanii bakka hojii: Afaan Oromoo, Amaariffa, Tigrinyiffaa fi Ingiliffa',
        description: 'Hojii fi guddina dandeettiitiif waltajjii barumsa afaanota Itoophiyaa. Jechoota, haasaa fi seerluga bakka hojii of keessatti qabata.',
        mainPurpose: 'Afaanota biyya keessaa fi idil-addunyaa baradhaa, shaakalaa.',
        category: 'Afaanii fi Quunnamtii',
        stats: 'Afaanota Ijoo 4',
        features: [
          'Afaan Oromoo, Amaariffa, Tigrinyiffaa fi Ingiliffa',
          'Moojuulota haasaa daldalaa fi bakka hojii',
          'Shaakala sagalee fi sagaleessuu jechootaa',
          'Qorumsa dandeettii sadarkaadhaan qophaa\'e'
        ]
      },
      ti: {
        name: 'ኦምኒስኮፕ ቋንቋታት',
        tagline: 'ናይ ስራሕ ቦታ ናይ ቋንቋ ብቕዓት ምምዕባል፡ ትግርኛ፣ ኣምሓርኛ፣ ኣፋን ኦሮሞን እንግሊዝኛን',
        description: 'ንዕቤት ስራሕን ሞያን ዝተዳለወ ናይ ኢትዮጵያ ቋንቋታት መምሃሪ መድረኽ። ናይ ቃላት ኣጠቓቕማ፣ ዝርርብን ሰዋስውን ዘጠቓለለ።',
        mainPurpose: 'ናይ ውሽጢ ዓድን ዓለምለኸን ቋንቋታት ተምሃሩን ተለማመዱን።',
        category: 'ቋንቋን ርክብን',
        stats: '4 ቁልፊ ቋንቋታት',
        features: [
          'ትግርኛ፣ ኣምሓርኛ፣ ኣፋን ኦሮሞን እንግሊዝኛን',
          'ናይ ስራሕ ቦታን ንግድን ናይ ምይይጥ ሞጁላት',
          'ድምጽን ናይ ቃላት ኣደማምጻን ልምምዳት',
          'ብደረጃ ዝወሃብ ናይ ብቕዓት ፈተና'
        ]
      }
    },
    'app-education': {
      am: {
        name: 'ኦምኒስኮፕ ትምህርት',
        tagline: 'የዩኒቨርሲቲ ኮርሶች፣ የብሔራዊ መግቢያ ፈተና ዝግጅት እና የትምህርት መርጃዎች',
        description: 'የዩኒቨርሲቲ መግቢያ ፈተና ልምምዶችን፣ የዩኒቨርሲቲ ማስታወሻዎችን፣ ያለፉት ዓመታት የፈተና ጥያቄዎችን እና ብሔራዊ የትምህርት ሰነዶችን የሚያቀርብ ማዕከላዊ ማህደር።',
        mainPurpose: 'የትምህርት መርጃዎችን፣ የዩኒቨርሲቲ መግቢያ ፈተናዎችን እና የተደራጁ የመማሪያ ሰነዶችን ያግኙ።',
        category: 'ትምህርት እና አካዳሚክስ',
        stats: '15,000+ የፈተና ጥያቄዎች',
        features: [
          'ያለፉት ዓመታት የዩኒቨርሲቲ መግቢያ ፈተናዎች ከመልሶቻቸው ጋር',
          'የሪሚዲያል (Remedial) ፈተና ዝግጅት መመሪያዎች',
          'ከከፍተኛ የኢትዮጵያ ዩኒቨርሲቲዎች የተውጣጡ የSTEM ማስታወሻዎች',
          'በቅጽበት ውጤት የሚያሳዩ የፈተና ጥያቄዎች'
        ]
      },
      om: {
        name: 'Barnoota OmniScope',
        tagline: 'Kuusaa koorsii yuunivarsiitii, qophii qormaata biyyoolessaa fi ragaalee barnootaa',
        description: 'Qormaata seensa yuunivarsiitii, nootii leekcharaa, qormaata kanaan duraa fi ragaalee barnootaa biyyoolessaa dhiheessa.',
        mainPurpose: 'Qophii qormaata seensa yuunivarsiitii fi meeshaalee barumsaa argadhaa.',
        category: 'Barnootaa fi Akkaadaamiksii',
        stats: '15,000+ Gaaffilee Qormaataa',
        features: [
          'Qormaata seensa yuunivarsiitii darban deebii isaanii waliin',
          'Qajeelfama qophii qormaata riimediyaalii (Remedial)',
          'Nootii STEM yuunivarsiitoota beekamoo Itoophiyaa irraa',
          'Qorumsa battalatti qabxii beeksisu'
        ]
      },
      ti: {
        name: 'ኦምኒስኮፕ ትምህርቲ',
        tagline: 'ናይ ዩኒቨርሲቲ ኮርሳት፣ ናይ ሃገራዊ መእተዊ ፈተና ምድላውን ናይ ትምህርቲ ሓገዝትን',
        description: 'ናይ ዩኒቨርሲቲ መእተዊ ፈተና ልምምዳት፣ ናይ ዩኒቨርሲቲ ማስታወሻታት፣ ናይ ዝሓለፉ ዓመታት ፈተናታትን ሃገራዊ ናይ ትምህርቲ ሰነዳትን ዘቕርብ ማእከላይ መዝገብ።',
        mainPurpose: 'ናይ ትምህርቲ ሓገዝቲ፣ ናይ ዩኒቨርሲቲ መእተዊ ፈተናታትን ዝተወደበ ናይ ምምሃር ሰነዳትን ድለዩ።',
        category: 'ትምህርትን ኣካዳሚክስን',
        stats: '15,000+ ናይ ፈተና ሕቶታት',
        features: [
          'ናይ ዝሓለፉ ዓመታት ናይ ዩኒቨርሲቲ መእተዊ ፈተናታት ምስ መልስታቶም',
          'ናይ ሪሚዲያል (Remedial) ፈተና ምድላው መምርሒታት',
          'ካብ ላዕለዎት ናይ ኢትዮጵያ ዩኒቨርሲቲታት ዝተረኽቡ ናይ STEM ማስታወሻታት',
          'ብቕጽበት ውጽኢት ዘርእዩ ናይ ፈተና ሕቶታት'
        ]
      }
    },
    'app-tenders': {
      am: {
        name: 'ኦምኒስኮፕ ጨረታዎች',
        tagline: 'የፌዴራል እና የክልል የመንግስት ግዥ ጨረታዎች እና የንግድ እድሎች',
        description: 'ከፌዴራል፣ ከክልል መንግስታት እና ከንግድ ባንኮች የወጡ ህዝባዊ ጨረታዎችን የሚያሰባስብ ማዕከል።',
        mainPurpose: 'የመንግስት እና የግል የጨረታ ሰነዶችን እና የንግድ እድሎችን ይከታተሉ።',
        category: 'ንግድ እና ጨረታ',
        stats: '480+ ንቁ ጨረታዎች',
        features: [
          'የፌዴራል ግዥ ኤጀንሲ ጨረታዎች',
          'የሲቢኢ፣ ኢትዮ ቴሌኮም እና የግል ባንኮች ጨረታዎች',
          'የጨረታ ማስረከቢያ የመጨረሻ ቀናት ማንቂያዎች',
          'የግንባታ፣ የአይቲ እና የአቅርቦት ጨረታዎች'
        ]
      },
      om: {
        name: 'Caalbaasii OmniScope',
        tagline: 'Caalbaasiiwwan bittaa mootummaa federaalaa fi naannoo akkasumas carraawwan daldalaa',
        description: 'Caalbaasiiwwan mootummaa federaalaa, naannoolee fi baankota daldalaa irraa bahan walitti qaba.',
        mainPurpose: 'Caalbaasiiwwan mootummaa fi dhuunfaa akkasumas carraawwan daldalaa hordofaa.',
        category: 'Daldala fi Caalbaasii',
        stats: '480+ Caalbaasiiwwan Ammaa',
        features: [
          'Caalbaasii Eejensii Bittaa Federaalaa',
          'Caalbaasii CBE, Ethio Telecom fi baankota dhuunfaa',
          'Akeekkachiisa guyyoota xumuraa caalbaasii',
          'Caalbaasii ijaarsaa, IT fi dhiheessii'
        ]
      },
      ti: {
        name: 'ኦምኒስኮፕ ጨረታታት',
        tagline: 'ናይ ፌደራልን ክልልን መንግስታዊ ዕዳጋ ጨረታታትን ናይ ንግዲ ዕድላትን',
        description: 'ካብ ፌደራል፣ ክልላዊ መንግስታትን ንግዳዊ ባንክታትን ዝወጹ ህዝባዊ ጨረታታት ዘጠቓልል ማእከል።',
        mainPurpose: 'ናይ መንግስትን ውልቀን ናይ ጨረታ ሰነዳትን ናይ ንግዲ ዕድላትን ተኸታተሉ።',
        category: 'ንግድን ጨረታን',
        stats: '480+ ንጡፋት ጨረታታት',
        features: [
          'ናይ ፌደራል ዕዳጋ ኤጀንሲ ጨረታታት',
          'ናይ CBE፣ ኢትዮ ቴሌኮምን ናይ ውልቀ ባንክታትን ጨረታታት',
          'ናይ ጨረታ መረከቢ ናይ መወዳእታ መዓልታት መዘኻኸሪታት',
          'ናይ ህንጻ፣ ITን ኣቕርቦትን ጨረታታት'
        ]
      }
    },
    'app-biz': {
      am: {
        name: 'ኦምኒስኮፕ ንግድ እና ህግ',
        tagline: 'የኢትዮጵያ የንግድ ምዝገባ መመሪያ፣ የግብር ደንቦች እና የኢንቨስትመንት ህጎች',
        description: 'ለአነስተኛ እና መካከለኛ ንግዶች፣ ለፈጠራ ስራዎች እና ለውጭ ባለሀብቶች የተዘጋጀ የህግና የንግድ አሰራር መመሪያ።',
        mainPurpose: 'የንግድ ምዝገባን፣ የግብር ግዴታዎችን እና የፍቃድ አሰጣጥ ህጎችን ይረዱ።',
        category: 'ህግ እና ቢዝነስ',
        stats: '120+ የተጠናከሩ መመሪያዎች',
        features: [
          'የንግድ ስራ ፍቃድ አወጣጥ ቅደም ተከተሎች',
          'የገቢዎች ሚኒስቴር የታክስ እና የቫት ህጎች',
          'የኢትዮጵያ ኢንቨስትመንት ኮሚሽን ማበረታቻዎች',
          'የንግድ ማህበር እና ኃላፊነቱ የተወሰነ ድርጅት ምስረታ'
        ]
      },
      om: {
        name: 'Daldala fi Seera OmniScope',
        tagline: 'Qajeelfama galmee daldalaa Itoophiyaa, dambiiwwan gibiraa fi seerota investimantii',
        description: 'Daldaloota xixiqqaa fi giddugaleessaa, kalaqtoota fi abbootii qabeenyaa alatiif qajeelfama daldalaa fi seeraa.',
        mainPurpose: 'Galmee daldalaa, kaffaltii gibiraa fi dambiiwwan eeyyama daldalaa hubadhaa.',
        category: 'Seeraa fi Daldala',
        stats: '120+ Qajeelfamoota Qophaa\'an',
        features: [
          'Tartiiba eeyyama daldalaa baasuu',
          'Seerota taaksii fi VAT Ministeera Galiiwwanii',
          'Jajjabeessituu Komishinii Investimantii Itoophiyaa',
          'Hundeeffama dhaabbata daldalaa fi PLC'
        ]
      },
      ti: {
        name: 'ኦምኒስኮፕ ንግድን ሕግን',
        tagline: 'ናይ ኢትዮጵያ ናይ ንግዲ ምዝገባ መምርሒ፣ ናይ ግብሪ ደንብታትን ናይ ኢንቨስትመንት ሕግታትን',
        description: 'ንደቀቕትን ማእከለዎትን ንግዳት፣ ንፈጠርቲ ስራሕን ንናይ ወጻኢ ሰብ ሃብትን ዝተዳለወ ናይ ሕግን ናይ ንግዲ ኣሰራርሓን መምርሒ።',
        mainPurpose: 'ናይ ንግዲ ምዝገባ፣ ናይ ግብሪ ግዴታታትን ናይ ፍቓድ ምውጻእ ሕግታትን ተረድኡ።',
        category: 'ሕግን ቢዝነስን',
        stats: '120+ ዝተጠርነፉ መምርሒታት',
        features: [
          'ናይ ንግዲ ስራሕ ፍቓድ ምውጻእ ቅደም ተኸተል',
          'ናይ ኣታዊታት ሚኒስቴር ናይ ታክስን ቫትን ሕግታት',
          'ናይ ኢትዮጵያ ኢንቨስትመንት ኮሚሽን ማበረታታታት',
          'ናይ ንግዲ ማሕበርን ሓላፍነቱ ዝተወሰነ ትካል ምምስራት'
        ]
      }
    },
    'app-insights': {
      am: {
        name: 'ኦምኒስኮፕ ማክሮ ዳታ',
        tagline: 'የኢትዮጵያ የኢኮኖሚ አመላካቾች፣ የውጭ ምንዛሬ ተመን እና የገበያ ትንበያዎች',
        description: 'ከብሔራዊ ባንክ እና ከስታቲስቲክስ አገልግሎት የተሰበሰቡ ወቅታዊ የኢኮኖሚ እና የገበያ መረጃዎች ማዕከል።',
        mainPurpose: 'የገበያ እንቅስቃሴዎችን፣ የዋጋ ግሽበትን እና የውጭ ምንዛሬ መረጃዎችን ይከታተሉ።',
        category: 'ኢኮኖሚክስ እና ዳታ',
        stats: 'ሳምንታዊ ዝመናዎች',
        features: [
          'የብሔራዊ ባንክ እና የንግድ ባንኮች የምንዛሬ ተመን',
          'የሸቀጦች እና የዋጋ ግሽበት ኢንዴክስ',
          'የቡና፣ የሰሊጥ እና የግብርና ምርቶች የኤክስፖርት ዋጋ',
          'የኢኮኖሚ ፖሊሲ ትንተናዎች'
        ]
      },
      om: {
        name: 'Odeeffannoo Maakroo OmniScope',
        tagline: 'Agarsiiftota dinagdee Itoophiyaa, sharafa alaa fi tilmaama gabaa',
        description: 'Baankii Biyyoolessaa fi Tajaajila Istaatistiiksii irraa odeeffannoo dinagdee fi gabaa walitti qabame.',
        mainPurpose: 'Sochii gabaa, gatii shaqaxootaa fi sharafa alaa hordofaa.',
        category: 'Dinagdee fi Ragaa',
        stats: 'Odeeffannoo Torbanii',
        features: [
          'Sharafa alaa Baankii Biyyoolessaa fi daldalaa',
          'Gatii shaqaxootaa fi agarsiiftuu gabaa',
          'Gatii bunaa, salxii fi oomishaalee ergaa',
          'Xiinxala imaammata dinagdee'
        ]
      },
      ti: {
        name: 'ኦምኒስኮፕ ማክሮ ዳታ',
        tagline: 'ናይ ኢትዮጵያ ናይ ኢኮኖሚ መርኣይታት፣ ናይ ወጻኢ ሸርፊ ዋጋን ናይ ዕዳጋ ትንበያታትን',
        description: 'ካብ ብሔራዊ ባንክን ስታቲስቲክስ ኣገልግሎትን ዝተኣከቡ እዋናዊ ናይ ኢኮኖምን ናይ ዕዳጋን ሓበሬታታት ማእከል።',
        mainPurpose: 'ናይ ዕዳጋ ምንቅስቓሳት፣ ናይ ዋጋታት ወሰኽን ናይ ወጻኢ ሸርፊ ሓበሬታታትን ተኸታተሉ።',
        category: 'ኢኮኖሚክስን ዳታን',
        stats: 'ሰሙናዊ ሓበሬታታት',
        features: [
          'ናይ ብሔራዊ ባንክን ንግዳዊ ባንክታትን ናይ ሸርፊ ተመን',
          'ናይ ኣቑሑትን ናይ ዕዳጋን መርኣዪታት',
          'ናይ ቡን፣ ሰሊጥን ናይ ሕርሻ ፍርያታትን ናይ ሰደድ ዋጋ',
          'ናይ ኢኮኖሚ ፖሊሲ ትንታነታት'
        ]
      }
    }
  };

  return baseApps.map(app => {
    const loc = localizedAppsText[app.id]?.[lang];
    if (loc) {
      return { ...app, ...loc };
    }
    return app;
  });
}
