<template>
  <nuxt-content :document="page" />
</template>

<script>
export default {
  async asyncData ({ $content }) {
    const page = await $content('home').fetch()

    return {
      page,
      title: page.title,
      description: page.description
    }
  },
  head() {
    return {
      title: `${this.title} - SKYOU`,
      meta: [
        {
          content: this.description
        },
        {
          hid: "description",
          name: "description",
          content: this.title
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.title
        },
        {
          hid: "og:image",
          property: "og:image",
          content: `https://skyou-develop.onrender.com/cover.jpg`
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "We have a large selection of standard apparel and accessories patterns, including custom-made T-shirts, hoodies, face masks, backpacks, totes, etc. We offer all-over printing and custom manufacturing to meet your specific brand requirements."
        }
      ]
    };
  }
}
</script>
