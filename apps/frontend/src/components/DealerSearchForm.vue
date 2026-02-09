<template>
  <section class="rounded-lg bg-white p-6 shadow">
    <div class="grid grid-cols-1 gap-6 md:grid-cols-12">

      <div class="md:col-span-5">
        <label class="block text-sm font-medium text-gray-700">
          PLZ oder Ort
        </label>
        <input
          ref="queryInputRef"
          v-model="localQuery"
          type="text"
          class="mt-1 w-full rounded-md border px-3 py-2"
          :class="{
            'border-gray-300': !showQueryError
          }"
          placeholder="z. B. 92637 oder Weiden"
          @keyup.enter="submit"
          @input="clearQueryError"
        />
      </div>

      <div class="md:col-span-4">
        <label class="block text-sm font-medium text-gray-700">
          Umkreis: {{ localRadius }} km
        </label>
        <input
          v-model="localRadius"
          type="range"
          min="0"
          max="15"
          step="5"
          class="mt-3 w-full"
        />
      </div>

      <div class="md:col-span-3 flex items-end">
        <button
          class="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white"
          @click="submit"
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
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          Suchen
        </button>
      </div>
    </div>

    <div class="mt-6 flex gap-4">
      <label v-for="b in brandOptions" :key="b" class="flex items-center gap-2 text-sm">
        <input type="checkbox" :value="b" v-model="localBrands" />
        {{ b }}
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  query: string;
  radius: number;
  brands: string[];
}>();

const emit = defineEmits<{
  (e: "search", payload: {
    query: string;
    radius: number;
    brands: string[];
  }): void;
}>();

const localQuery = ref(props.query);
const localRadius = ref(props.radius);
const localBrands = ref([...props.brands]);
const showQueryError = ref(false);
const queryInputRef = ref<HTMLInputElement | null>(null);

const brandOptions = ["Alle", "KIA", "SEAT", "OPEL"];

let isSyncingBrands = false;

watch(
  () => props,
  () => {
    localQuery.value = props.query;
    localRadius.value = props.radius;
    localBrands.value = [...props.brands];
  },
  { deep: true }
);

watch(
  localBrands,
  (next, prev) => {
    if (isSyncingBrands) return;

    isSyncingBrands = true;

    if (next.length === 0) {
      localBrands.value = ["Alle"];
      isSyncingBrands = false;
      return;
    }

    if (next.includes("Alle") && next.length > 1) {
      const prevHadAlle = Array.isArray(prev) && prev.includes("Alle");
      const prevOnlyAlle = prevHadAlle && prev.length === 1;
      if (prevOnlyAlle) {
        localBrands.value = next.filter((b) => b !== "Alle");
      } else {
        localBrands.value = ["Alle"];
      }
      isSyncingBrands = false;
      return;
    }

    isSyncingBrands = false;
  },
  { deep: true }
);

function submit() {
  if (!localQuery.value.trim()) {
    showQueryError.value = true;
    queryInputRef.value?.focus();
    return;
  }
  emit("search", {
    query: localQuery.value,
    radius: localRadius.value,
    brands: localBrands.value
  });
}

function clearQueryError() {
  if (showQueryError.value && localQuery.value.trim()) {
    showQueryError.value = false;
  }
}
</script>
