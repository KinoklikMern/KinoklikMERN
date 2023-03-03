/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  prefix: "tw-",
  theme: {
    extend: {
      backgroundImage: {
        'TvImage': "url('../../public/images/TV.png')",
        'JokerImage2': "url('../../public/images/JokerImage.png')",
        'JokerImage': "url('process.env.REACT_APP_AWS_URL}/${fepk.banner_url}')",
      },
      colors: {
       
        midnight: "#1E0039",
      },
    },
  },
  corePlugins: {
    preflight: false
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    "prettier-plugin-tailwindcss",
  ],
};
