<template>
  <div class="container mx-auto px-2">
    <Instructions class="border-b mb-3 pb-3" />
    <h1 class="font-bold my-2 font-bold text-lg">Discussions ({{ comment_count }})</h1>
    <form class="mb-6" @submit.prevent="postComment">
      <div
        class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <label for="comment" class="sr-only">Your comment</label>
        <textarea
          id="comment"
          rows="3"
          v-model="comment"
          class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
          placeholder="Write a comment..."
          required
        ></textarea>
      </div>
      <div class="flex flex-row-reverse justify-between">
        <button
          type="submit"
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-indigo-700 rounded-lg focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 hover:bg-indigo-800"
        >
          Post comment
        </button>
        <div class="flex items-center">
          <p class="pr-2 text-slate-500 text-sm">Commenting as:</p>
          <Avatar :name="author" />
          <p class="text-sm">{{ author }}</p>
        </div>
      </div>
    </form>
    <div class="flex flex-col gap-y-3">
      <Comment
        v-for="com in comments"
        :key="com.id"
        :comment="com"
        @delete="deleteComment"
        @upvote="fetchAllComments"
      >
      </Comment>
    </div>
  </div>
</template>

<script>
import { authorName, CommentsAPI } from '../api/comments'
import Avatar from '../components/Avatar.vue'
import Comment from '../components/Comment.vue'
import Instructions from '../components/Instructions.vue'

export default {
  name: 'CommentsView',
  components: {
    Comment,
    Avatar,
    Instructions
  },
  data() {
    return {
      id: 2,
      comment: '',
      comments: [],
      author: authorName,
      comment_count: 0
    }
  },
  methods: {
    fetchAllComments: async function () {
      this.comments = await CommentsAPI.list()
    },
    fetchCommentCount: async function () {
      this.comment_count = await CommentsAPI.count()
    },
    postComment: async function () {
      const commentObj = {
        id: window.crypto.randomUUID(),
        content: this.comment,
        author: {
          name: this.author
        },
        parentId: null,
        upvotes: 0,
        created_at: new Date()
      }
      await CommentsAPI.create(commentObj)
      this.fetchAllComments()
      this.comment = ''
    },
    deleteComment: async function (comment_id) {
      await CommentsAPI.delete(comment_id)
      this.fetchAllComments()
    }
  },
  mounted: async function () {
    this.fetchAllComments()
    this.fetchCommentCount()
  }
}
</script>

<style scoped lang="postcss">
.comment-section > * {
  @apply border-b border-gray-200;
}
</style>
