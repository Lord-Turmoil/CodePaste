<script setup lang="ts">
/**
 * FooterSection - Footer with credits and copyright
 */
import { computed } from 'vue';

const currentYear = computed(() => {
  const year = new Date().getFullYear();
  return year > 2023 ? `2023 - ${year}` : '2023';
});

const badges = [
  {
    title: 'Repository on GitHub',
    href: 'https://github.com/Lord-Turmoil/CodePaste',
    imgSrc: 'https://img.shields.io/badge/CodePaste-GitHub-purple?style=plastic&logo=github',
    alt: 'GitHub Repository',
  },
  {
    title: 'Highlighting library',
    href: 'https://prismjs.com/',
    imgSrc: 'https://img.shields.io/badge/Highlighter-Prism-white?style=plastic&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMTcwIj4KCTxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik01NS4zNyAxMzEuNUg0OC40djkuMTNoNi45N2MxLjY3IDAgMi45Mi0uNCAzLjc4LTEuMjIuODUKCS0uOCAxLjI4LTEuOTIgMS4yOC0zLjMzcy0uNDMtMi41NC0xLjI4LTMuMzVjLS44Ni0uOC0yLjEyLTEuMi0zLjc4LTEuMm0yOS41MgoJNi40Yy4zLS41My40Ny0xLjIuNDctMi4wNCAwLTEuMzUtLjQ1LTIuNC0xLjM3LTMuMi0uOTItLjc2LTIuMTQtMS4xNS0zLjY1CgktMS4xNUg3Mi45djguNTJoNy4zMmMyLjI2IDAgMy44Mi0uNyA0LjY3LTIuMU0xMDAgMEwwIDE3MGgyMDBMMTAwIDBNNjAuODYKCTE0MS4wM2MtMS4zIDEuMjItMy4xIDEuODQtNS4zMyAxLjg0SDQ4LjR2Ny41NUg0NnYtMjEuMmg5LjUzYzIuMjQgMCA0LjAyLjYzCgk1LjM0IDEuODcgMS4zIDEuMjMgMS45NiAyLjg4IDEuOTYgNC45NSAwIDIuMS0uNjYgMy43NS0xLjk3IDQuOThtMjQuNSA5LjRsCgktNS4xLTguMTRoLTcuMzd2OC4xMmgtMi40di0yMS4yaDEwLjE0YzIuMTUgMCAzLjg4LjYgNS4xOCAxLjggMS4zIDEuMTggMS45NQoJMi44IDEuOTUgNC44NCAwIDIuNjQtMS4xIDQuNDQtMy4zIDUuNC0uNi4yOC0xLjIyLjUtMS44Mi42bDUuNTcgOC41NmgtMi44NW0KCTEzLjQzIDBoLTIuNHYtMjEuMmgyLjR2MjEuMm0yMy41Ni0xLjMyYy0xLjQ4IDEuMDUtMy41MyAxLjU3LTYuMTYgMS41Ny0yLjk2IDAKCS01LjIzLS42LTYuNzgtMS44NS0xLjQtMS4xLTIuMTgtMi43LTIuMzctNC43NGgyLjVjLjA4IDEuNDUuNzggMi41NiAyLjEgMy4zMwoJMS4xNi42NyAyLjY4IDEgNC41OCAxIDMuOTcgMCA1Ljk1LTEuMjUgNS45NS0zLjc0IDAtLjg2LS4zNS0xLjUzLTEuMDctMi4wMi0uNwoJLS41LTEuNi0uOS0yLjY4LTEuMi0xLjA3LS4zMy0yLjI0LS42My0zLjQ4LS45cy0yLjQtLjY1LTMuNS0xLjA4LTEuOTctMS4wMgoJLTIuNjgtMS43M2MtLjctLjcyLTEuMDctMS42OC0xLjA3LTIuOSAwLTEuNzMuNjUtMy4xMyAxLjk3LTQuMjIgMS4zMi0xLjA4CgkzLjMyLTEuNjIgNi0xLjYyIDIuNjcgMCA0Ljc1LjYgNi4yMyAxLjg1IDEuMzQgMS4xIDIuMDUgMi41IDIuMTQgNC4yaC0yLjQ2YwoJLS4yMi0xLjc2LTEuMzUtMi45Mi0zLjQtMy41LS43Mi0uMi0xLjYyLS4zLTIuNy0uM3MtMS45OC4xLTIuNzIuMzVjLS43NC4yNQoJLTEuMy41NS0xLjcuOS0uNDIuMzUtLjcuNzQtLjgzIDEuMTdzLS4yLjg4LS4yIDEuMzZjMCAuNS4yLjkzLjYyIDEuMzNzLjk2Ljc1CgkxLjY1IDEuMDNjLjY4LjI4IDEuNDYuNTIgMi4zMy43My44OC4yIDEuNzcuNDMgMi42Ny42NS45LjIyIDEuOC40OCAyLjY4Ljc3Ljg3CgkuMyAxLjY1LjY1IDIuMzMgMS4xIDEuNTMuOTYgMi4yOCAyLjI3IDIuMjggMy45NCAwIDItLjc0IDMuNS0yLjIyIDQuNTVtMjguODQKCTEuMzJ2LTE3LjU0bC03Ljg0IDEwLjA4LTcuOTctMTAuMDh2MTcuNTRIMTMzdi0yMS4yaDIuNzhsNy41OCAxMC4wNiA3LjQ1CgktMTAuMDVoMi44djIxLjJoLTIuNCIvPgo8L3N2Zz4=',
    alt: 'Prism Syntax Highlighter',
  },
  {
    title: 'Icons',
    href: 'https://fontawesome.com/',
    imgSrc: 'https://img.shields.io/badge/Icons-Font Awesome-528DD7?style=plastic&logo=fontawesome',
    alt: 'Font Awesome Icons',
  },
  {
    title: 'Favicon',
    href: 'https://icons8.com/',
    imgSrc: 'https://img.shields.io/badge/Favicon-Icons8-1FB141?style=plastic&logo=icons8',
    alt: 'Icons8 Favicon',
  },
  {
    title: 'Dialog library',
    href: 'https://alertifyjs.com/',
    imgSrc: 'https://img.shields.io/badge/Dialogs-AlertifyJS-red?style=plastic',
    alt: 'AlertifyJS Dialogs',
  },
];
</script>

<template>
  <footer class="footer" role="contentinfo">
    <nav class="badge-wrapper" aria-label="Credits and links">
      <a
        v-for="badge in badges"
        :key="badge.href"
        :href="badge.href"
        :title="badge.title"
        target="_blank"
        rel="noopener noreferrer"
        class="badge"
      >
        <img :src="badge.imgSrc" :alt="badge.alt" />
      </a>
    </nav>
    <div class="copyright">
      <a
        href="http://www.tonys-studio.top"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>Copyright &copy; Tony's Studio <span id="year">{{ currentYear }}</span></p>
      </a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  text-align: center;
  padding: 20px 0;
}

.badge-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  flex-wrap: wrap;
  gap: 10px;
}

.badge {
  display: inline-block;
}

.badge img {
  height: 20px;
  vertical-align: middle;
}

.badge:focus {
  outline: 2px solid #4a90d9;
  outline-offset: 2px;
}

.copyright {
  display: inline-block;
  margin: auto;
  margin-bottom: 20px;
  text-align: center;
  font-family: 'Lucida Handwriting', cursive;
}

.copyright a {
  color: inherit;
  text-decoration: none;
}

.copyright:hover {
  text-decoration: underline;
}

.copyright a:focus {
  outline: 2px solid #4a90d9;
  outline-offset: 2px;
}

@media screen and (max-width: 768px) {
  .badge-wrapper {
    flex-direction: column;
  }
}
</style>
