<template>
  <div>
    <h1 class="text-light">Create Post Screen</h1>
    <a href="/" class="btn btn-light mb-3">Homepage</a>
  </div>
  <div>
    <div class="form-floating">
  <textarea class="form-control" placeholder="Leave a comment here" id="postTitle" v-model="postTitle"></textarea>
  <label for="postTitle">Post Titel</label>
</div>
<div class="mt-2 mb-2">
    <label class="text-light">Content</label>
    <Editor v-model="content" />
  </div>
    <button @click="doCreateNewPost" class="btn btn-outline-light">
      Create new post
    </button>
  </div>
  
</template>

<script setup>
import { inject, ref } from 'vue';
import Editor from '../components/Editor.vue'
// Define reactive data


const postTitle = ref('');
const content = ref('');
const pb = inject('api');

// Function to handle new post creation
const doCreateNewPost = async () => {
  const data = {
    "Title": postTitle.value,
    "Content": content.value,
  };

  try {
    const record = await pb.collection('ForumPosts').create(data);
    console.log("Post created:", record);
    postTitle.value = "";
    content.value = "";
  } catch (error) {
    console.error("Failed to create post:", error);
  }
};


</script>

