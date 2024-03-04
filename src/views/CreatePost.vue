<template>
  <div>
    <h1>Create Post Screen</h1>
    <a href="/" class="btn btn-primary">Homepage</a>
  </div>
  <div>
    <div class="form-floating">
  <textarea class="form-control" placeholder="Leave a comment here" id="postTitle" v-model="postTitle"></textarea>
  <label for="postTitle">Post Titel</label>
</div>
<div class="form-floating">
  <textarea class="form-control" placeholder="Leave a comment here" id="postContent" style="height: 100px" v-model="postContent"></textarea>
  <label for="postContent">Content</label>
</div>
    <button @click="doCreateNewPost" class="btn btn-primary">
      Create new post
    </button>
  </div>
  <div>
    <editor-content :editor="editor" />
  </div>
</template>

<script setup>
import { inject, ref } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const postTitle = ref('');
const postContent = ref('');
const pb = inject('api');

// Function to handle new post creation
const doCreateNewPost = async () => {
  const data = {
    "Title": postTitle.value,
    "Content": postContent.value,
  };

  try {
    const record = await pb.collection('ForumPosts').create(data);
    console.log("Post created:", record);
    postTitle.value = "";
    postContent.value = "";
  } catch (error) {
    console.error("Failed to create post:", error);
  }
};

const editor = useEditor({
  content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  extensions: [
    StarterKit,
  ],
})
</script>

