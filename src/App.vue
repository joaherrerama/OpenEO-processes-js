<script>
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";

export default {
  components: {
    RouterLink,
    RouterView,
  },
  data() {
    return {
    };
  },
  async created() {
    const router = useRouter();
    console.log("waiting on router");
    await router.isReady();
    console.log("created");
  },
};
</script>

<template>
  <RouterView/>
</template>

<style>
@import "@/assets/normalize.css";
@import "@/assets/base.css";

#app {
  margin: 0 auto;
  padding: 0rem;
}

header {
  line-height:1.5;
  max-height:100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.vs__dropdown-toggle {
  border: 1px solid #f6f7f8 !important;
}

.wal-button {
  background: #fff;
  border: 1px solid #f6f7f8;
  border-radius: 3px;
  font-weight: 600;
  font-size: 8pt;
  padding: 4.5px 10px;
}

.wal-button.bg-orange-pink {
  background: rgba(253, 118, 59, 0.25);
}

.wal-button.bg-blue-pink {
  background: hsl(210deg 90% 40% / 25%);
}

.active .vs__dropdown-toggle {
  background: rgba(253, 118, 59, 0.25);
}

.vs__dropdown-option--highlight {
  background: transparent !important;
  color: #fd763b !important;
}

.up-vl {
  color: #a6e8a5;
}

.down-vl {
  color: #a60000;
}

@media (min-width: 1024px) {

  #app {
    width: 100%;
    height: 100vh;

    padding: 0 0rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
