<script setup lang="ts">

</script>

<template>
  <svg height="50" width="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="arrow">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="8" refX="10" refY="4" orient="auto" markerUnits="strokeWidth">
        <path d="M4,.5 L10,4 L4,7.5" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
      </marker>
    </defs>
    <line x1="2" y1="25" x2="99%" y2="25" stroke="currentColor" stroke-width="3" stroke-linecap="round" marker-end="url(#arrowhead)" />
  </svg>
</template>

<style scoped lang="scss">
.arrow {
  flex-grow: 1;
  color: var(--t2-green);
  min-width: 50px;
  max-width: 200px;
}
</style>
