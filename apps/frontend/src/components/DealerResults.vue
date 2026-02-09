<template>
  <section class="rounded-lg bg-white p-6 shadow">
    <div class="mb-4 flex justify-between">
      <h2 class="text-lg font-medium">
        Ergebnisse ({{ dealers.length }})
      </h2>

      <button
        class="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
        @click="$emit('export')"
      >
        <svg
          class="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M5 21h14" />
        </svg>
        Als Excel exportieren
      </button>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <DealerCard
        v-for="dealer in dealers"
        :key="dealer.id"
        :dealer="dealer"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import DealerCard from "./DealerCard.vue";

defineProps<{
  dealers: any[];
}>();
</script>
