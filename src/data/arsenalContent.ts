import type { ArsenalItem, ContentCategory } from '../types/models';

export const CATEGORY_ORDER: ContentCategory[] = [
  'mihan',
  'hambastegi',
  'paydari',
  'omid',
  'sepas',
  'yadbud',
  'ayande',
];

export const arsenalContent: ArsenalItem[] = [
  {
    id: 'ars_mihan_01',
    title: 'خاکِ آشنا',
    body: 'این خاک، تنها زمین نیست؛ خاطرهٔ قدم‌های ماست. هر بار که برمی‌خیزیم، نام میهن را دوباره زنده می‌کنیم.',
    category: 'mihan',
    tags: ['میهن', 'خاک', 'برخاستن'],
  },
  {
    id: 'ars_mihan_02',
    title: 'پرچم در باد',
    body: 'پرچم ما در باد می‌لرزد، اما نمی‌افتد. ما نیز چنینیم: می‌لرزیم، اما از پا نمی‌نشینیم.',
    category: 'mihan',
    tags: ['پرچم', 'ایستادگی'],
  },
  {
    id: 'ars_mihan_03',
    title: 'خانهٔ مشترک',
    body: 'میهن، خانه‌ای است که دیوارهایش از اعتماد ساخته شده. بیایید این دیوارها را با صداقت استوار کنیم.',
    category: 'mihan',
    tags: ['خانه', 'اعتماد'],
  },
  {
    id: 'ars_mihan_04',
    title: 'نامِ بلند',
    body: 'نام این سرزمین را با کردار نیک بلند بداریم؛ نه با شعار، که با کار و همدلی.',
    category: 'mihan',
    tags: ['نام', 'کردار'],
  },

  {
    id: 'ars_ham_01',
    title: 'شانه به شانه',
    body: 'هیچ باری به تنهایی سبک نمی‌شود. شانه به شانه بایستیم تا راه هموار گردد.',
    category: 'hambastegi',
    tags: ['همبستگی', 'یار'],
  },
  {
    id: 'ars_ham_02',
    title: 'صداهای هم‌آوا',
    body: 'وقتی صدای ما یکی شود، دیوارها کوتاه‌تر می‌شوند. همبستگی، زبان مشترک دل‌هاست.',
    category: 'hambastegi',
    tags: ['صدا', 'اتحاد'],
  },
  {
    id: 'ars_ham_03',
    title: 'دست در دست',
    body: 'دست خالیِ یکی، با دست پرِ دیگری کامل می‌شود. ما زنجیره‌ایم، نه جزیره‌های تنها.',
    category: 'hambastegi',
    tags: ['دست', 'زنجیره'],
  },
  {
    id: 'ars_ham_04',
    title: 'برای هم',
    body: 'اگر امروز برای دیگری بایستیم، فردا کسی برای ما خواهد ایستاد. این پیمان ناگفتهٔ ماست.',
    category: 'hambastegi',
    tags: ['پیمان', 'حمایت'],
  },

  {
    id: 'ars_pay_01',
    title: 'ایستادن در توفان',
    body: 'پایداری یعنی در میانهٔ توفان، ریشه را فراموش نکردن. ما ریشه داریم؛ پس می‌ایستیم.',
    category: 'paydari',
    tags: ['پایداری', 'ریشه'],
  },
  {
    id: 'ars_pay_02',
    title: 'گامِ استوار',
    body: 'هر گام استوار، حتی اگر کوتاه باشد، ما را از فروریختن دور می‌کند. پیش برویم؛ آهسته اما پیوسته.',
    category: 'paydari',
    tags: ['گام', 'پیوستگی'],
  },
  {
    id: 'ars_pay_03',
    title: 'سپرِ اراده',
    body: 'اراده، سپری است که زنگار نمی‌پذیرد. آن را تیز نگاه داریم و از میدان بیرون نرویم.',
    category: 'paydari',
    tags: ['اراده', 'میدان'],
  },
  {
    id: 'ars_pay_04',
    title: 'شکست، نقطه نیست',
    body: 'شکست، نقطهٔ پایان نیست؛ خطی است برای بازنویسی. دوباره برخیزیم و صفحه را از نو بنویسیم.',
    category: 'paydari',
    tags: ['شکست', 'برخاستن'],
  },

  {
    id: 'ars_omid_01',
    title: 'سپیده نزدیک است',
    body: 'شب دراز است، اما ابدی نیست. سپیده از همان سمتی می‌آید که ما به سویش گام برمی‌داریم.',
    category: 'omid',
    tags: ['امید', 'سپیده'],
  },
  {
    id: 'ars_omid_02',
    title: 'چراغ کوچک',
    body: 'یک چراغ کوچک، تاریکی یک اتاق را پس می‌زند. امید ما همین چراغ است؛ آن را خاموش نکنیم.',
    category: 'omid',
    tags: ['چراغ', 'تاریکی'],
  },
  {
    id: 'ars_omid_03',
    title: 'فردا ساخته می‌شود',
    body: 'فردا منتظر نمی‌ماند تا ساخته شود. با امیدِ امروز، فردا را می‌سازیم.',
    category: 'omid',
    tags: ['فردا', 'ساختن'],
  },
  {
    id: 'ars_omid_04',
    title: 'دلِ روشن',
    body: 'دل روشن، حتی در روزهای تیره، راه را نشان می‌دهد. روشن بمانیم؛ برای خود و برای دیگران.',
    category: 'omid',
    tags: ['دل', 'روشنی'],
  },

  {
    id: 'ars_sep_01',
    title: 'سپاسِ بی‌صدا',
    body: 'به آنان که بی‌نام ماندند و دست دراز کردند، سپاس. گاهی بزرگ‌ترین کارها بی‌صدا انجام می‌شود.',
    category: 'sepas',
    tags: ['سپاس', 'بی‌نام'],
  },
  {
    id: 'ars_sep_02',
    title: 'یادِ یاری‌گر',
    body: 'یاری‌گر را فراموش نکنیم؛ نامش را در دل نگاه داریم و راهش را ادامه دهیم.',
    category: 'sepas',
    tags: ['یاری', 'یاد'],
  },
  {
    id: 'ars_sep_03',
    title: 'قدردانی',
    body: 'قدردانی، وامِ کوتاهی است که باید زود ادا شود. امروز بگوییم تا فردا دیر نشود.',
    category: 'sepas',
    tags: ['قدردانی'],
  },
  {
    id: 'ars_sep_04',
    title: 'دست‌های مهربان',
    body: 'دست‌های مهربان، جهان را کمی انسانی‌تر می‌کنند. سپاس از هر دستی که به یاری برخاست.',
    category: 'sepas',
    tags: ['مهربانی', 'دست'],
  },

  {
    id: 'ars_yad_01',
    title: 'نام‌ها زنده می‌مانند',
    body: 'نام‌ها تا وقتی یاد شوند، زنده می‌مانند. یادشان را پاس بداریم؛ نه با سوگواریِ تنها، که با ادامهٔ راه.',
    category: 'yadbud',
    tags: ['یادبود', 'نام'],
  },
  {
    id: 'ars_yad_02',
    title: 'صفحهٔ تاریخ',
    body: 'هر نسل، صفحه‌ای از تاریخ را می‌نویسد. ما مسئولیم که صفحهٔ ما شایسته باشد.',
    category: 'yadbud',
    tags: ['تاریخ', 'نسل'],
  },
  {
    id: 'ars_yad_03',
    title: 'خاطرهٔ روشن',
    body: 'خاطره، اگر روشن بماند، چراغ راه می‌شود. از گذشته بیاموزیم، در آن نمانیم.',
    category: 'yadbud',
    tags: ['خاطره', 'راه'],
  },
  {
    id: 'ars_yad_04',
    title: 'سکوتِ محترم',
    body: 'گاهی سکوت، محترمانه‌ترین یادبود است. در سکوت بایستیم، و سپس با کردار سخن بگوییم.',
    category: 'yadbud',
    tags: ['سکوت', 'احترام'],
  },

  {
    id: 'ars_aya_01',
    title: 'بنای تازه',
    body: 'آینده را با آجرِ امروز می‌چینیم. هر کار درست، سنگی است در بنای فردا.',
    category: 'ayande',
    tags: ['آینده', 'بنا'],
  },
  {
    id: 'ars_aya_02',
    title: 'نهالِ اراده',
    body: 'نهالِ اراده را امروز بکاریم تا فردا سایه بر سر نسل بعد بیفکند.',
    category: 'ayande',
    tags: ['نهال', 'نسل'],
  },
  {
    id: 'ars_aya_03',
    title: 'افقِ مشترک',
    body: 'افقِ مشترک، وقتی پیدا می‌شود که همه به یک سو نگاه کنند و با هم گام بردارند.',
    category: 'ayande',
    tags: ['افق', 'مشترک'],
  },
  {
    id: 'ars_aya_04',
    title: 'ساختن، نه منتظر ماندن',
    body: 'آینده از آنِ کسانی است که می‌سازند، نه کسانی که فقط انتظار می‌کشند. برخیزیم و بسازیم.',
    category: 'ayande',
    tags: ['ساختن', 'برخاستن'],
  },
];

export function getArsenalByCategory(category?: ContentCategory | 'all'): ArsenalItem[] {
  if (!category || category === 'all') {
    return arsenalContent;
  }
  return arsenalContent.filter((item) => item.category === category);
}

export function searchArsenal(query: string, category?: ContentCategory | 'all'): ArsenalItem[] {
  const base = getArsenalByCategory(category);
  const q = query.trim().toLowerCase();
  if (!q) return base;
  return base.filter((item) => {
    const haystack = `${item.title} ${item.body} ${item.tags.join(' ')}`.toLowerCase();
    return haystack.includes(q);
  });
}

export function getArsenalItem(id: string): ArsenalItem | undefined {
  return arsenalContent.find((item) => item.id === id);
}
