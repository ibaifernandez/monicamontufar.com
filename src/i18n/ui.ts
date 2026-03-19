export const uiContext = {
  es: {
    nav: {
      about: 'Conóceme',
      portfolio: 'Portafolio',
      contact: 'Contacto'
    },
    hero: {
      title: 'Mónica Montúfar',
      subtitle: 'Creando experiencias que resuenan.'
    }
  },
  en: {
    nav: {
      about: 'About Me',
      portfolio: 'Portfolio',
      contact: 'Contact'
    },
    hero: {
      title: 'Mónica Montúfar',
      subtitle: 'Crafting experiences that resonate.'
    }
  }
} as const;

export type Language = keyof typeof uiContext;
export function useTranslations(lang: Language) {
  return function t(key: keyof typeof uiContext[typeof lang]) {
    return uiContext[lang][key];
  }
}
