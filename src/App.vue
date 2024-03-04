<script setup>
import { provide } from "vue";
import { RouterView } from "vue-router";
import PocketBase from 'pocketbase';

const pocketBaseUrl = import.meta.env.VITE_APP_POCKETBASE_URL;
const pb = new PocketBase(pocketBaseUrl);
provide('api', pb);

</script>

<template>
    <RouterView />
</template>


