/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  prefix: "tw-",
  theme: {
    extend: {
      boxShadow: {
        multiSoft: `
          4px 4px 8px 0px #BDC3C7BF,
          -4px -4px 8px 0px #FFFFFFBF,
          -4px -4px 8px 0px #FFFFFFBF,
          -8px -8px 12px 0px #FFFFFF40
  `,

        softDual: `
          4px 4px 8px 0px #BDC3C740,
          inset 2px 2px 8px 1px #00000033
  `,
      },

      backgroundImage: {
        TvImage: "url('../../public/images/TV.png')",
        JokerImage2: "url('../../public/images/JokerImage.png')",
        //       JokerImage: "url('process.env.REACT_APP_AWS_URL}/${fepk.banner_url}')",
      },
      colors: {
        midnight: "#1E0039",
        customColor: "#712cb0",
        backgroundGray: "#ECF0F1",
        customGray: "#868585",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      borderRadius: {
        side: "5.5rem",
      },

      flex: {
        center: "0 0 auto",
      },

      fontSize: {
        xxs: "0.6rem",
        xs1: "0.7rem",
      },

      width: {
        18: "4.5rem",
      },
    },
  },
  variants: {
    extend: {
      visibility: ["group-hover"],
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    "prettier-plugin-tailwindcss",
    require("tailwind-scrollbar"),
    require("tailwindcss/nesting"),
  ],
};
