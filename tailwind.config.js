module.exports = {
    purge: ['./src/pages/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                'accent-1': '#333',
                'cyan-0': 'hsl(180, 29%, 50%)',
                'cyan-1': 'hsl(180, 52%, 96%)',
                'cyan-2': 'hsl(180, 31%, 95%)',
                'cyan-3': 'hsl(180, 8%, 52%)',
                'cyan-4': 'hsl(180, 14%, 20%)',
            },
            spacing: {
                '0.5': '0.125rem',
                '1.5': '0.375rem',
                '2.5': '0.626rem',
                '7.5': '1.875rem',
                '9': '2.25rem',
                '13': '3.25rem',
                '18': '4.5rem',
                '38': '9.5rem',
                '280': '70rem',
            },
        },
    },
    variants: {},
    plugins: [],
}
