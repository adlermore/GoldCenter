import {getRequestConfig} from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async() => {
  const cookieStore = cookies();
  // const locale = cookieStore.get('locale')?.value || 'en-Us';
  const locale = 'en-Us';
 
  return {
    locale,
    timeZone: 'Europe/Vienna',
    messages: (await import(`../public/locales/${locale}/common.json`)).default
  };
});