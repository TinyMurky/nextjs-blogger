import type { Config } from 'tailwindcss'

// https://www.skcript.com/blog/disable-tailwind-prose-code
// 去除煩人的``
const disabledCss = {
	'code::before': {
    'content':'None'
  },
	'code::after': {
    'content':'None'
  },
  'code:not(.code-highlight)':{
    'color': '#7D9DD3'
  },

}
 
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      typography: {
				DEFAULT: { css: disabledCss },
				sm: { css: disabledCss },
				lg: { css: disabledCss },
				xl: { css: disabledCss },
				'2xl': { css: disabledCss },
			},
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
export default config
