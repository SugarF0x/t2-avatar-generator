<script setup lang="ts">

</script>

<template>
  <svg height="50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="arrow">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto" markerUnits="strokeWidth">
        <path d="M4,0 L10,3.5 L4,7" fill="none" stroke="currentColor" stroke-width="1" />
      </marker>
    </defs>
    <line x1="0" y1="25" x2="100%" y2="25" stroke="currentColor" stroke-width="5" marker-end="url(#arrowhead)" />
  </svg>
</template>

<style scoped lang="scss">
.arrow {
  flex-grow: 1;
  color: var(--t2-green);
}
</style>
