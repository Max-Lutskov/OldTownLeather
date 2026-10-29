<template>
  <div class="page">
    <LayoutSiteHeader />
    <main id="main">
      <slot />
    </main>
    <LayoutSiteFooter />
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
main {
  flex: 1 0 auto;
}
</style>
