<script setup lang="ts">
import { ref } from "vue";
import { DealerWithDistance } from "@dealer-locator/shared";
import { searchDealers } from "@/api/dealers";
import DealerSearchForm from "@/components/DealerSearchForm.vue";
import DealerResults from "@/components/DealerResults.vue";

const searchQuery = ref("");
const radius = ref(10);
const brandSelection = ref<string[]>(["Alle"]);
const results = ref<DealerWithDistance[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

function exportResults() {
  const params = new URLSearchParams({
    query: searchQuery.value,
    radius: String(radius.value)
  });

  if (!brandSelection.value.includes("Alle")) {
    params.set("brands", brandSelection.value.join(","));
  }

  console.log(params.toString());

  window.open(
    `http://localhost:3000/api/dealers/export?${params.toString()}`,
    "_blank"
  );
}

async function handleSearch(payload: {
  query: string;
  radius: number;
  brands: string[];
}) {
  searchQuery.value = payload.query;
  radius.value = payload.radius;
  brandSelection.value = payload.brands;

  loading.value = true;
  error.value = null;

  try {
    results.value = await searchDealers({
      query: payload.query,
      radius: payload.radius,
      brands: payload.brands
    });
  } catch (e) {
    error.value = "Fehler beim Laden der Händlerdaten.";
    results.value = [];
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="mx-auto max-w-6xl space-y-6">

      <header>
        <h1 class="text-2xl font-semibold text-gray-800">Händlersuche</h1>
        <p class="text-sm text-gray-600">
          Suche nach Händlern mit PLZ oder Ort
        </p>
      </header>

      <DealerSearchForm
        :query="searchQuery"
        :radius="radius"
        :brands="brandSelection"
        @search="handleSearch"
      />

      <div
        v-if="loading"
        class="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-sm text-gray-500"
      >
        <span>Suche läuft …</span>
        <span
          class="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600"
          aria-hidden="true"
        />
      </div>

      <p v-if="error" class="text-sm text-red-600">
        {{ error }}
      </p>

      <p v-if="!loading && !error && results.length === 0" class="text-sm text-gray-500">
        Keine Ergebnisse gefunden
      </p>

      <DealerResults
        v-if="!loading && results.length"
        :dealers="results"
        @export="exportResults"
      />
    </div>
  </div>
</template>
<style scoped>
</style>
