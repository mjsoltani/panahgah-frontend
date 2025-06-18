/**
 * سیستم اعتبارسنجی و فیلتر کلمات نامناسب
 */

// لیست کلمات نامناسب فارسی
const inappropriateWords = [
  // کلمات توهین‌آمیز فارسی
  'احمق', 'بی‌شعور', 'عوضی', 'آشغال', 'کثافت', 'لعنتی', 'بی‌ناموس', 'حرومزاده', 'پدرسگ', 'بی‌پدر',
  'بی‌مادر', 'بی‌همه‌چیز', 'بی‌وجود', 'بی‌شرف', 'بی‌آبرو', 'جاکش', 'دیوث', 'قرمساق', 'مادرجنده',
  'خفه‌شو', 'گمشو', 'حرومی', 'حرامزاده', 'پفیوز', 'آشغال', 'عنتر', 'گوه', 'عن', 'مزخرف',
  'کصافت', 'کسافت', 'بی‌غیرت', 'دله', 'لاشی', 'لاشخور', 'آب کون', 'گوزو', 'جلق', 'جلقی',
  
  // فحش‌های فارسی
  'کیری', 'کسکش', 'کونی', 'جنده', 'گاییدن', 'کیر', 'کس', 'کون', 'ممه', 'کص', 'کوص',
  'کوس', 'کوبص', 'کوسکش', 'کیرم', 'کصکش', 'کوسخل', 'کسخل', 'کله‌کیری', 'سکس', 'سکسی',
  'جق', 'جق‌زدن', 'جندگی', 'گایدن', 'گاییدمت', 'بکن', 'بکنمت', 'کیرخر', 'کیرخور', 'مالوندن',
  'مالیدن', 'خایه', 'تخم', 'تخمی', 'شق', 'شهوت', 'شهوتی', 'منی', 'آبکیر', 'لختی', 'لخت',
  'داف', 'جیگر', 'جیگرتو', 'چوچول', 'چوچوله', 'دودول', 'کوچول', 'کوچوله', 'لاپا', 'لاپایی',
  'شومبول', 'دک', 'ساک', 'ساک‌زدن', 'سکسی', 'سیکس', 'سکسیسم', 'پورن', 'پورنو', 'پورنوگرافی',
  'کسشر', 'کصشر', 'کسشعر', 'کصشعر', 'کسمشنگ', 'کصمشنگ', 'کیرمکیر', 'کیرخور', 'کیرخوار',
  
  // کلمات زشت مخفف شده فارسی
  'ک*ر', 'ک*س', 'ک*ن', 'ج*ده', 'بی‌ن*موس', 'گ*ییدن', 'ک*ص', 'ک*ص*فت', 'ک*نی', 'ک*کش',
  'ک.س', 'ک.ن', 'ک.یر', 'ج.نده', 'کــس', 'کــون', 'کــیر', 'کـیـر', 'کـس', 'کـون',
  'ک.ص', 'ک_س', 'ک_ن', 'ک_یر', 'ک__س', 'ک__ن', 'ک__یر', 'ک...', 'ج...', 'کی.', 'کو.',
  'کص.', 'ک***', 'ج***', 'ک×××', 'ج×××', 'ک___', 'ج___', 'ک.ی.ر', 'ک.و.ن', 'ک.و.س',
  
  // کلمات انگلیسی نامناسب
  'fuck', 'shit', 'bitch', 'ass', 'dick', 'pussy', 'bastard', 'asshole', 'cunt', 'whore',
  'slut', 'motherfucker', 'fucker', 'cock', 'penis', 'vagina', 'boobs', 'tits', 'titties',
  'cum', 'jerk', 'jerkoff', 'jackoff', 'blowjob', 'handjob', 'anal', 'sex', 'sexy', 'porn',
  'pornography', 'nude', 'naked', 'horny', 'orgasm', 'masturbate', 'masturbation', 'hoe',
  'hooker', 'prostitute', 'nigger', 'nigga', 'faggot', 'fag', 'retard', 'retarded', 'gay',
  'lesbian', 'dyke', 'queer', 'homo', 'tranny', 'shemale', 'ladyboy', 'sissy', 'piss', 'pee',
  'poop', 'butthole', 'anus', 'rectum', 'dildo', 'vibrator', 'fleshlight', 'ballsack', 'balls',
  'testicles', 'scrotum', 'semen', 'sperm', 'ejaculate', 'ejaculation', 'wank', 'wanker',
  
  // مخفف کلمات انگلیسی نامناسب
  'f*ck', 'sh*t', 'b*tch', 'a*s', 'd*ck', 'p*ssy', 'f**k', 'sh**', 'b**ch', 'a**', 'd**k', 'p**sy',
  'f***', 's***', 'b****', 'a***', 'd***', 'p****', 'f.ck', 's.it', 'b.tch', 'a.s', 'd.ck', 'p.ssy',
  'f_ck', 's_it', 'b_tch', 'a_s', 'd_ck', 'p_ssy', 'f__k', 's__t', 'b__ch', 'a__', 'd__k', 'p__sy',
  'fck', 'sht', 'btch', 'dck', 'psy', 'fk', 'st', 'bs', 'as', 'dk', 'ps',
  
  // ترکیبات نامناسب فارسی
  'مادر جنده', 'پدر سگ', 'خواهر جنده', 'کیر خر', 'کون گشاد', 'کس کش', 'کیر کلفت', 'کون گنده',
  'کس لیس', 'کون لیس', 'کیر خور', 'ساک بزن', 'بکن توش', 'بکن بکن', 'کیرم دهنت', 'کیرم تو کونت',
  'کیرم تو کست', 'کیر تو کونت', 'کیر تو کست', 'کیر به کونت', 'کیر به کست', 'کیر دهنت',
  'کون بده', 'کس بده', 'بکنمت', 'می‌کنمت', 'کردمت', 'کیرمو بخور', 'کیرمو بخر', 'کیر شدی',
  'کون داده', 'کس داده', 'کون میده', 'کس میده', 'جنده خانه', 'جنده خونه', 'فاحشه خانه',
  
  // ترکیبات نامناسب انگلیسی
  'fuck you', 'fuck off', 'go fuck yourself', 'motherfucking', 'son of a bitch', 'son of bitch',
  'piece of shit', 'dumb ass', 'stupid ass', 'jack ass', 'kiss my ass', 'suck my dick',
  'suck my cock', 'eat my pussy', 'eat my ass', 'lick my balls', 'lick my pussy', 'fuck me',
  'fuck me hard', 'fuck me daddy', 'fuck me mommy', 'fuck my ass', 'fuck my pussy',
  
  // کلمات مرتبط با مواد مخدر
  'تریاک', 'هروئین', 'کوکائین', 'کراک', 'شیشه', 'گل', 'حشیش', 'ماری‌جوانا', 'علف', 'بنگ',
  'چرس', 'کوکا', 'کریستال', 'اکس', 'اکستازی', 'ال‌اس‌دی', 'مت', 'متادون', 'مرفین', 'نشئه',
  'نشئگی', 'جوینت', 'پایپ', 'بیس', 'کوک', 'دوا', 'دود', 'بنگی', 'معتاد', 'مواد',
  'cocaine', 'heroin', 'weed', 'marijuana', 'meth', 'crystal meth', 'crack', 'ecstasy', 'mdma',
  'lsd', 'acid', 'shrooms', 'mushrooms', 'dope', 'opium', 'hash', 'hashish', 'joint', 'blunt',
  'bong', 'pot', 'cannabis', 'coke', 'speed', 'addict', 'junkie', 'stoner', 'high', 'drugged',
];

/**
 * بررسی وجود کلمات نامناسب در متن با الگوریتم پیشرفته
 * @param text متن مورد بررسی
 * @returns آرایه‌ای از کلمات نامناسب یافت شده
 */
export const findInappropriateWords = (text: string): string[] => {
  if (!text) return [];
  
  const foundWords: string[] = [];
  // تبدیل متن به حروف کوچک و حذف فاصله‌های اضافی
  const normalizedText = text.toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\./g, ' ')
    .replace(/\,/g, ' ')
    .replace(/\-/g, ' ')
    .replace(/\_/g, ' ')
    .replace(/\*/g, ' ');
  
  // جستجوی کلمات نامناسب
  inappropriateWords.forEach(word => {
    const wordLower = word.toLowerCase();
    
    // بررسی حالت‌های مختلف کلمه
    if (
      normalizedText.includes(wordLower) || // کلمه دقیقاً در متن باشد
      normalizedText.includes(wordLower.replace(/\s/g, '')) || // کلمه بدون فاصله در متن باشد
      normalizedText.replace(/\s/g, '').includes(wordLower.replace(/\s/g, '')) // متن و کلمه هر دو بدون فاصله
    ) {
      // بررسی اینکه کلمه یافت شده بخشی از یک کلمه بزرگتر نباشد
      const wordRegex = new RegExp(`(^|\\s|[^a-zA-Z0-9آ-ی])${wordLower}($|\\s|[^a-zA-Z0-9آ-ی])`, 'i');
      if (wordRegex.test(normalizedText) || normalizedText.includes(` ${wordLower} `)) {
        if (!foundWords.includes(word)) {
          foundWords.push(word);
        }
      }
    }
  });
  
  return foundWords;
};

/**
 * بررسی وجود کلمات نامناسب در متن
 * @param text متن مورد بررسی
 * @returns آیا متن حاوی کلمات نامناسب است یا خیر
 */
export const hasInappropriateContent = (text: string): boolean => {
  return findInappropriateWords(text).length > 0;
};

/**
 * سانسور کلمات نامناسب در متن
 * @param text متن مورد بررسی
 * @returns متن سانسور شده
 */
export const censorInappropriateContent = (text: string): string => {
  if (!text) return '';
  
  let censoredText = text;
  
  // یافتن کلمات نامناسب در متن
  const foundWords = findInappropriateWords(text);
  
  // سانسور کلمات نامناسب
  foundWords.forEach(word => {
    // ساخت عبارت منظم برای جایگزینی کلمه با ستاره
    const regex = new RegExp(`(^|\\s|[^a-zA-Z0-9آ-ی])(${word})($|\\s|[^a-zA-Z0-9آ-ی])`, 'gi');
    censoredText = censoredText.replace(regex, (match, p1, p2, p3) => {
      return p1 + '*'.repeat(p2.length) + p3;
    });
  });
  
  return censoredText;
};

/**
 * اعتبارسنجی فرم درخواست کمک
 * @param data داده‌های فرم
 * @returns نتیجه اعتبارسنجی شامل وضعیت و پیام خطا
 */
export interface ValidationResult {
  isValid: boolean;
  errorMessage: string;
  fieldErrors: Record<string, string>;
}

export const validateHelpRequest = (data: {
  Name: string;
  Descritpion: string;
  price: string;
  NationalCode: string;
  Family: string;
  Address: string;
}): ValidationResult => {
  const result: ValidationResult = {
    isValid: true,
    errorMessage: '',
    fieldErrors: {}
  };
  
  // بررسی وجود کلمات نامناسب در عنوان
  const titleInappropriateWords = findInappropriateWords(data.Name);
  if (titleInappropriateWords.length > 0) {
    result.isValid = false;
    result.fieldErrors.Name = 'عنوان درخواست حاوی کلمات نامناسب است';
    result.errorMessage = 'لطفاً از کلمات مناسب در عنوان درخواست استفاده کنید';
  }
  
  // بررسی وجود کلمات نامناسب در توضیحات
  const descriptionInappropriateWords = findInappropriateWords(data.Descritpion);
  if (descriptionInappropriateWords.length > 0) {
    result.isValid = false;
    result.fieldErrors.Descritpion = 'توضیحات درخواست حاوی کلمات نامناسب است';
    if (!result.errorMessage) {
      result.errorMessage = 'لطفاً از کلمات مناسب در توضیحات درخواست استفاده کنید';
    } else {
      result.errorMessage = 'لطفاً از کلمات مناسب در فرم درخواست استفاده کنید';
    }
  }
  
  // بررسی وجود کلمات نامناسب در آدرس
  const addressInappropriateWords = findInappropriateWords(data.Address);
  if (addressInappropriateWords.length > 0) {
    result.isValid = false;
    result.fieldErrors.Address = 'آدرس حاوی کلمات نامناسب است';
    if (!result.errorMessage) {
      result.errorMessage = 'لطفاً از کلمات مناسب در آدرس استفاده کنید';
    } else {
      result.errorMessage = 'لطفاً از کلمات مناسب در فرم درخواست استفاده کنید';
    }
  }
  
  // بررسی وجود کلمات نامناسب در نام و نام خانوادگی
  const nameInappropriateWords = findInappropriateWords(data.Family);
  if (nameInappropriateWords.length > 0) {
    result.isValid = false;
    result.fieldErrors.Family = 'نام و نام خانوادگی حاوی کلمات نامناسب است';
    if (!result.errorMessage) {
      result.errorMessage = 'لطفاً از کلمات مناسب در نام و نام خانوادگی استفاده کنید';
    } else {
      result.errorMessage = 'لطفاً از کلمات مناسب در فرم درخواست استفاده کنید';
    }
  }
  
  // اعتبارسنجی مبلغ
  if (data.price) {
    const price = Number(data.price);
    if (isNaN(price) || price <= 0) {
      result.isValid = false;
      result.fieldErrors.price = 'لطفاً مبلغ معتبر وارد کنید';
      if (!result.errorMessage) {
        result.errorMessage = 'لطفاً مبلغ معتبر وارد کنید';
      }
    }
  }
  
  return result;
}; 