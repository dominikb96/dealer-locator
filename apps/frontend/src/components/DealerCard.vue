<template>
  <div class="rounded-md border p-4">
    <div class="flex justify-between">
      <h3 class="font-medium">{{ dealer.name }}</h3>
      <span class="text-xs text-gray-500">
        {{ dealer.distance_km.toFixed(1) }} km
      </span>
    </div>

    <p class="text-sm text-gray-600">
      {{ dealer.city }} · {{ dealer.brand }}
    </p>

    <p v-if="dealer.phone" class="mt-2 text-sm">
      Tel: {{ dealer.phone }}
    </p>

    <a
      v-if="dealer.website"
      :href="dealer.website"
      target="_blank"
      class="mt-2 inline-block text-sm text-blue-600 hover:underline"
    >
      Website
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{ dealer: any }>();
</script>
