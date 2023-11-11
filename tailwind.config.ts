import type { Config } from 'tailwindcss'
import { withUt } from "uploadthing/tw"
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
      aspectRatio: {
        '4/3': '4 / 3',
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
export default withUt(config)
