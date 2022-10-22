import {createVuetify} from 'vuetify';

// Import locale files
import {ru} from 'vuetify/locale';

// Import font files
import '@mdi/font/css/materialdesignicons.css'
import {aliases, mdi} from 'vuetify/iconsets/mdi';

// Import styles
import 'vuetify/styles'

export default createVuetify({
    icons: {
        aliases,
        sets: {mdi},
        defaultSet: 'mdi',
    },
    theme: {
        themes: {
            dark: {
                dark: true,
                colors: {
                    primary: '#fff',
                    secondary: '#D42F35',
                },
            },
        },
        defaultTheme: 'dark',
    },
    locale: {
        messages: {ru},
        defaultLocale: 'ru',
        fallbackLocale: 'en',
    },
});