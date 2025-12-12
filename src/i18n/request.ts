import {getRequestConfig} from 'next-intl/server';
import {hasLocale} from 'next-intl';
import {routing} from './routing';
import {getTimeZone} from 'next-intl/server';

 
export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;
 const timeZone = await getTimeZone();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    timeZone
  };
});