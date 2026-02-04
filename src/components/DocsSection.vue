<script setup lang="ts">
/**
 * DocsSection - Documentation and version history section
 */
import { ref, onMounted } from 'vue';
import type { VersionData } from '@/types';

const latestVersion = ref<VersionData | null>(null);
const previousVersions = ref<VersionData[]>([]);
const showPrevious = ref(false);
const loadError = ref(false);

async function loadVersionData(): Promise<void> {
  try {
    const response = await fetch('./version.json');
    if (!response.ok) {
      throw new Error('Failed to load version data');
    }
    const data: VersionData[] = await response.json();
    
    if (data.length > 0) {
      latestVersion.value = data[0];
      previousVersions.value = data.slice(1);
    }
  } catch (error) {
    console.error('Failed to load version data:', error);
    loadError.value = true;
  }
}

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function togglePrevious(): void {
  showPrevious.value = !showPrevious.value;
  
  setTimeout(() => {
    const anchor = document.getElementById(showPrevious.value ? 'more-anchor' : 'less-anchor');
    anchor?.scrollIntoView({ behavior: 'smooth' });
  }, 150);
}

onMounted(() => {
  loadVersionData();
});
</script>

<template>
  <section class="doc-wrapper doc-align-center" aria-labelledby="docs-heading">
    <div class="doc-chapter">
      <h2 id="docs-heading">Why Code Paste?</h2>
      <div class="doc-section">
        <article class="doc-entry">
          <div class="doc-text doc-align-justify">
            <p class="doc-indent">
              Adding code snippets to Office documents like Word or PowerPoint could be a challenge,
              especially when you want to preserve the syntax highlighting. 😢 Furthermore, the typical dark
              themes of most IDEs doesn't work well for presentations. While converting code into images is an
              option, it often suffers from non-transparent background, and apparently not as flexible or
              crystal clear as text. 😖
            </p>
            <p class="doc-indent">
              So, is there a better way to embed highlighted code snippets in these documents? 🤔
              <strong>Absolutely,</strong> and that's where Code Paste comes in! 😆 Simply paste your code into the left
              panel, choose your preferred language and color scheme. With a few clicks, you'll have a
              beautifully highlighted code snippet ready to go. 😋
            </p>
            <p class="doc-indent">
              Can't find the language you need? 🫨 Well, don't be shy! Open an
              <a href="https://github.com/Lord-Turmoil/CodePaste/issues/new"><strong>issue</strong></a>
              and I will add it for you! 😘
            </p>
          </div>
        </article>
      </div>
    </div>

    <hr id="more-anchor" class="doc-hr" />

    <!-- Latest version -->
    <div v-if="latestVersion" class="doc-chapter" aria-labelledby="latest-version-heading">
      <div class="doc-badge-base">
        <h3 id="latest-version-heading">Version {{ latestVersion.version }}</h3>
        <div class="doc-badge bubble glow-on-hover">
          <p>{{ formatDate(latestVersion.date) }}</p>
        </div>
      </div>
      <div class="doc-entry">
        <template v-for="entry in latestVersion.entries" :key="entry.title">
          <h4>{{ entry.title }}</h4>
          <div class="doc-text">
            <p v-for="(item, index) in entry.items" :key="index">{{ item }}</p>
          </div>
        </template>
      </div>
    </div>

    <!-- Previous versions -->
    <div
      v-if="previousVersions.length > 0"
      :class="['doc-chapter', { hidden: !showPrevious }]"
      id="previous"
      :aria-hidden="!showPrevious"
    >
      <template v-for="version in previousVersions" :key="version.version">
        <div class="doc-badge-base">
          <h3>Version {{ version.version }}</h3>
          <div class="doc-badge bubble glow-on-hover">
            <p>{{ formatDate(version.date) }}</p>
          </div>
        </div>
        <div class="doc-entry">
          <template v-for="entry in version.entries" :key="entry.title">
            <h4>{{ entry.title }}</h4>
            <div class="doc-text">
              <p v-for="(item, index) in entry.items" :key="index">{{ item }}</p>
            </div>
          </template>
        </div>
      </template>
    </div>

    <!-- Toggle buttons -->
    <button
      v-if="previousVersions.length > 0"
      type="button"
      :class="['expand', { hidden: showPrevious }]"
      aria-expanded="false"
      aria-controls="previous"
      @click="togglePrevious"
    >
      Show more<i class="fa-solid fa-angles-down fa-bounce" aria-hidden="true"></i>
    </button>
    <button
      v-if="previousVersions.length > 0"
      type="button"
      :class="['expand', { hidden: !showPrevious }]"
      id="less-anchor"
      aria-expanded="true"
      aria-controls="previous"
      @click="togglePrevious"
    >
      Show less<i class="fa-solid fa-angles-up fa-bounce" aria-hidden="true"></i>
    </button>

    <p v-if="loadError" class="error-message" role="alert">
      Failed to load version data. Please try refreshing the page.
    </p>
  </section>
</template>

<style scoped>
.doc-wrapper {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.doc-align-center {
  text-align: center;
}

.doc-chapter {
  margin-bottom: 20px;
}

.doc-section {
  margin: 15px 0;
}

.doc-entry {
  text-align: left;
}

.doc-text {
  line-height: 1.8;
}

.doc-text p {
  margin: 10px 0;
}

.doc-align-justify {
  text-align: justify;
}

.doc-indent {
  text-indent: 2em;
}

.doc-hr {
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ccc, transparent);
  margin: 20px 0;
}

.doc-badge-base {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 15px;
}

.doc-badge {
  padding: 5px 15px;
  border-radius: 20px;
  background-color: #f0f0f0;
}

.doc-badge.bubble {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.doc-badge p {
  margin: 0;
  font-size: 14px;
}

.glow-on-hover:hover {
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

.expand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background-color: #bbb;
  border-radius: 1000px;
  cursor: pointer;
  border: none;
  font-size: 14px;
  transition: all 0.3s;
}

.expand:hover {
  background-color: #aaa;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
}

.expand:focus {
  outline: 2px solid #4a90d9;
  outline-offset: 2px;
}

.expand.hidden {
  display: none;
}

#previous.hidden {
  height: 0;
  overflow: hidden;
  transition: height 0.5s;
}

.error-message {
  color: #d32f2f;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
  margin-top: 20px;
}

h2 {
  font-size: 1.8em;
  margin-bottom: 15px;
}

h3 {
  font-size: 1.4em;
  margin: 0;
}

h4 {
  font-size: 1.1em;
  margin: 15px 0 10px;
  color: #333;
}

a {
  color: #667eea;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:focus {
  outline: 2px solid #4a90d9;
  outline-offset: 2px;
}
</style>
