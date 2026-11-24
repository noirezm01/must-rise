import type { TemplateDefinition } from '../types/models';

export const templates: TemplateDefinition[] = [
  {
    id: 'minimalist',
    name: 'مینیمال',
    category: 'ساده',
    description: 'تایپوگرافی قوی، پس‌زمینهٔ ساده و تأکید سرخِ مهارشده.',
    defaultHeadline: 'باید برخاست',
    defaultSupporting: 'We Must Rise.',
  },
  {
    id: 'editorial',
    name: 'ویراستاری',
    category: 'نشریه‌ای',
    description: 'سرخط بزرگ، متن همراه و ساختار صفحه‌آرایی نشریه‌ای.',
    defaultHeadline: 'برخاستن',
    defaultSupporting: 'از واژه‌ها تا کردار',
  },
  {
    id: 'statement',
    name: 'بیانیه',
    category: 'کوبنده',
    description: 'پیام مرکزیِ پررنگ با تضاد بالا.',
    defaultHeadline: 'ما می‌ایستیم',
    defaultSupporting: '',
  },
  {
    id: 'memorial',
    name: 'یادبود',
    category: 'رسمی',
    description: 'ترکیب آرام، تایپوگرافی رسمی و عناصر ظریف.',
    defaultHeadline: 'به یاد آنان',
    defaultSupporting: 'نام‌ها زنده می‌مانند',
  },
  {
    id: 'patriotic',
    name: 'میهنی',
    category: 'باشکوه',
    description: 'ترکیب موقر با رنگ‌های برند.',
    defaultHeadline: 'برای میهن',
    defaultSupporting: 'MUST RISE',
  },
  {
    id: 'geometric',
    name: 'هندسی',
    category: 'نوین',
    description: 'خطوط انتزاعی، اشکال و ترکیب گرافیکی معاصر.',
    defaultHeadline: 'افق تازه',
    defaultSupporting: 'ساختن، نه منتظر ماندن',
  },
];

export function getTemplate(id: string): TemplateDefinition | undefined {
  return templates.find((t) => t.id === id);
}
