/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "blue-main": "#4F86C6",
                "dark-blue-main": "#0B1B2D",
                "green-main": "#70BC69",
                "gray-main": "#C2C2C2",
            },
        },
    },
    plugins: [],
};
