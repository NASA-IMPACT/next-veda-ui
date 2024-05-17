import { BlogPosts } from 'app/components/posts'
// import {
//   DevseedUiThemeProvider,
//   createUITheme,
// } from "@devseed-ui/theme-provider";

const VEDA_OVERRIDE_THEME = {
  zIndices: {
    hide: -1,
    docked: 10,
    sticky: 900,
    dropdown: 1550,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
  color: {
    base: "#2c3e50",
    primary: "#2276ac",
    danger: "#FC3D21",
    infographicA: "#fcab10",
    infographicB: "#f4442e",
    infographicC: "#b62b6e",
    infographicD: "#2ca58d",
    infographicE: "#2276ac",
  },
  type: {
    base: {
      leadSize: "1.25rem",
      extrabold: "800",
      // Increments to the type.base.size for each media breakpoint.
      sizeIncrement: {
        small: "0rem",
        medium: "0rem",
        large: "0.25rem",
        xlarge: "0.25rem",
      },
    },
    heading: {
      settings: '"wdth" 100, "wght" 700',
    },
  },
  layout: {
    min: "384px",
    max: "1440px",
    glspMultiplier: {
      xsmall: 1,
      small: 1,
      medium: 1.5,
      large: 2,
      xlarge: 2,
    },
  },
};

// export const metadata = {
//   title: 'Blog',
//   description: 'Read my blog.',
// }

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Stories</h1>
      <BlogPosts postType="story" />
    </section>
    // // <DevseedUiThemeProvider theme={createUITheme(VEDA_OVERRIDE_THEME)}>
    //   {/* <DataCatalog datasets={[]} /> */}
    //     // <BlogPosts />
    // // </DevseedUiThemeProvider>
  )
}
