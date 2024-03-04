<script setup>
import { ref, onMounted, computed } from 'vue';
import { useForum } from '@/composables/useForum';

const searchQuery = ref('');
const { records, fetchForumPosts } = useForum();
onMounted(fetchForumPosts);

// Filter function. 
const filteredRecords = computed(() => {
  if (!searchQuery.value) {
    return records.value; 
  }
  return records.value.filter((record) =>
    record.Title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

</script>

<template>
  <div class="list-container">
    <div class="d-flex mb-3">
      <input type="text" v-model="searchQuery" placeholder="Search posts..." class="form-control me-2" />
      <button @click="fetchForumPosts" class="btn btn-primary">Refresh Forum List</button>
      <a class="btn btn-primary ms-1" href="/create-post">Add Post</a>
    </div>

    <div v-if="filteredRecords.length > 0" class="containe p-0">
      <div
        class="card card-header-out-styling mb-3"
        v-for="(record, index) in filteredRecords"
        :key="index"
      >
        <h5>{{ record.Title }}</h5>
        <div class="card-body card-body-styling">
          <p class="card-text"><span v-html="record.Content"></span></p>
          <router-link :to="{ name: 'blog-post', params: { id: record.id } }" class="btn btn-primary">More</router-link>
        </div>
      </div>
    </div>
    <div v-else class="text-center mt-4 container p-0">
      <p>No posts found.</p>
    </div>
  </div>
</template>



<style scoped>
.list-container {
  margin-top: 25vh;
  width: 80vw;
  height: 100vh;
}

.card-header-out-styling {
  margin: 2em auto;
  padding: 1em 2em;
  /* From https://css.glass */
  background: rgba(97, 155, 241, 0.93);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(17.7px);
  -webkit-backdrop-filter: blur(17.7px);
}

.card-body-styling {
  background: white;
  border-radius: 16px;
  padding: 1em;
}
</style>
