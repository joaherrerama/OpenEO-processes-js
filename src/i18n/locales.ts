import type { Locale, LocaleMessages } from 'vue-i18n'

const _default = (r: any) => r.default || r

export async function load(locales: readonly Locale[], baseUrl) {
  const messages: Record<string, any> = {}
  for (const locale of locales) {
    // prettier-ignore
    if (baseUrl) { // for development
      // load from back-end server
      // const urlSearchParams = new URLSearchParams(window.location.search);
      // const params = Object.fromEntries(urlSearchParams.entries());
      const resource = await (await fetch(`${baseUrl}/${locale}.json`)).json()
      messages[locale] = resource
    } else { // for production
      // load from assets
      const resource = _default(await import(`../../public/en.json`))
      messages[locale] = resource
    }
  }
  return messages
}
