<template>
<Navbar />
<a @click="$router.go(-1)" class="btn btn-primary">back</a>
<h1 class="text-color-primary">Hello</h1>

    <div v-if="userRecord" class="text-color-primary">
      <p class="">{{ userRecord.username }}</p>
      <p class="">{{ userRecord.email }}</p>
      <p class="">{{ userRecord.name }}</p>
      
    </div>
    <div v-else>
      Loading forum record...
    </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 
import Navbar from '@/components/Navbar.vue'

const pb = inject('api');
const userRecord = ref(null);  //Reactive variable to store the forum record
const route = useRoute(); // Use the useRoute composable to access the route


// Function to fetch a forum record by ID
async function fetchUserRecord(recordId) {
  console.log(recordId);
  try {
    const record = await pb.collection('users').getOne(recordId, {
      expand: 'username,email,name',
    });
    userRecord.value = record;
  } catch (error) {
    console.error("Failed to fetch forum record:", error);
  }
}

onMounted(() => {
  const recordId = route.params.id; // Access the record ID from the route parameters
  fetchUserRecord(recordId);
});
</script>