import { inject, ref } from 'vue';

export function useForum() {
  const pb = inject('api');

  const records = ref([]);

  const fetchForumPosts = async () => {
    try {
      const response = await pb.collection('ForumPosts').getFullList({
        sort: '-created',
      });
      records.value = response;
    } catch (error) {
      console.error('Error fetching forum posts:', error);
    }
  };

  return { records, fetchForumPosts };
}
