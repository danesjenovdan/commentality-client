<template>
  <div
    id="app"
    class="container"
  >
    <commentality
      v-if="articleId"
      :article-id="articleId"
    />
  </div>
</template>

<script>
import Commentality from '../components/Commentality.vue';

export default {
  name: 'App',
  components: {
    Commentality,
  },
  data() {
    return {
      articleId: null,
    };
  },
  computed: {
  },
  mounted() {
    console.log('mounted');
    if (typeof window !== 'undefined') {
      const match = window.location.hash.match(/[#&?]id=(.+?)(?:[&]|$)/i);
      if (match && match.length > 1) {
        // eslint-disable-next-line prefer-destructuring
        this.articleId = match[1];
        console.log('article id =', this.articleId);
      }
    }
  },
};
</script>

<style lang="scss" src="@/scss/base.scss" />

<style lang="scss">
html {
  box-sizing: border-box;

  *, *:before, *:after {
    box-sizing: inherit;
  }

  &,
  body.embed-html {
    margin: 0;
    padding: 0;
    font-size: 18px;
    background: transparent;
  }

  body.embed-html {
    font-size: 1rem;
    overflow: hidden;
  }
}
</style>

<style lang="scss" scoped>
.container {
  max-width: 100%;
  padding: 0;
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 575.98px) {
    padding: 0;
  }
}

// PARLAMETER STYLES
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab:300&subset=latin-ext');
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,700&subset=latin-ext');

/deep/ .wrapper {
  border-radius: 0;
  box-shadow: none;
  border: 1px solid #c8c8c8;
  background-color: #f0f0f0;

  .instructions,
  .sort {
    font-style: normal;
    font-weight: 300;
    font-family: 'Roboto';
  }

  .instructions {
    border-bottom: none;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      position: relative;
      padding-top: 20px;
      margin: auto;
      margin-bottom: -30px;

      border-bottom:1px solid #c8c8c8;
    }
  }

  footer {
    border-top: none;
    flex-wrap: wrap;
    padding-left: 1.7rem;
    padding-right: 1.7rem;

    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      margin-bottom: 20px;

      border-bottom:1px solid #c8c8c8;

      flex-grow: 1;
      flex-shrink: 0;
      flex-basis: 100%;
    }
  }
}

/deep/ .sort {
  .sort-criterion {
    font-style: normal;
    font-weight: 400;
  }

  .is-selected {
    color: #009cdd;
    font-weight: 700;
  }
}

/deep/ .comment {
  background-color: rgba(255, 255, 255, 0.5) !important;

  .text {
    color: #333333;
    font-family: "Roboto Slab", serif;
    font-weight: 300;
  }

  .option {
    border-radius: 0;
    border-width: 1px;
    border-style: solid;
    font-family: 'Roboto', sans-serif;
    font-size: 13px;
    background-color: #ffffff;

    &.like {
      border-color: #009cdd !important;
      
      &.chart {
        background-color: #009cdd !important;
      }
    }
    &.meh {
      border-color: #197197 !important;

      &.chart {
        background-color: #197197 !important;
      }
    }
    &.dislike {
      border-color: #ff5e41 !important;

      &.chart {
        background-color: #ff5e41 !important;
      }
    }
  }
}
</style>
