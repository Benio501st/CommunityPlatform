<template>
    <div><a @click="$router.go(-1)" class="btn btn-primary">back</a></div>
    <div v-if="forumRecord">
      <h2 class="mt-5">{{ forumRecord.Title }}</h2>
      <p>
              <span v-html="forumRecord.Content"></span>
      </p>
    </div>
    <div v-else>
      Loading forum record...
    </div>
  </template>

<script setup>
import { inject, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 

const pb = inject('api');
const forumRecord = ref(null);  //Reactive variable to store the forum record
const route = useRoute(); // Use the useRoute composable to access the route


// Function to fetch a forum record by ID
async function fetchForumRecord(recordId) {
  console.log(recordId);
  try {
    const record = await pb.collection('ForumPosts').getOne(recordId, {
      expand: 'Title,Content',
    });
    forumRecord.value = record;
  } catch (error) {
    console.error("Failed to fetch forum record:", error);
  }
}

onMounted(() => {
  const recordId = route.params.id; // Access the record ID from the route parameters
  // const recordId = 'bu2ow51a136p0br'; 
  fetchForumRecord(recordId);
});
</script>