<template>
  <div class="flex flex-row gap-x-1 py-2">
    <!-- User Avatar -->
    <Avatar class="py-2" :name="commentData.author.name" />
    <!-- Comment content -->
    <div class="w-full flex flex-col gap-y-1">
      <!-- Author name and comment time -->
      <div class="flex flex-col gap-y-1 border rounded-md p-2 pb-4">
        <div class="flex flex-row gap-x-5 w-full items-end justify-between">
          <div class="font-bold text-sm">{{ commentData.author.name }}</div>
          <div class="text-xs text-gray-500 flex gap-x-1 items-center">
            <ClockIcon />
            {{ commentData.created_at.toLocaleDateString(undefined, dateOptions) }}
          </div>
        </div>
        <p class="text-gray-600 dark:text-gray-400">{{ commentData.content }}</p>
      </div>
      <!-- Reply and Report controls -->
      <div class="flex gap-x-5 text-sm">
        <button class="text-gray-500 items-center flex gap-x-1" @click="upvote">
          <UpArrowIcon />
          <span>{{ commentData.upvotes }}</span>
        </button>
        <button
          class="text-gray-500 hover:text-gray-700 flex gap-x-1 items-center"
          @click="replying = !replying"
        >
          <ChatIcon />
          <span>Reply</span>
        </button>
        <button
          class="text-gray-500 hover:text-gray-700 hover:underline flex gap-x-1 items-center"
          v-if="authorName === commentData.author.name"
          @click="deleteComment"
        >
          <TrashIcon />
          <span>Delete</span>
        </button>
      </div>
      <!-- Reply form -->
      <form v-if="replying" class="my-2" @submit.prevent="postReply">
        <div
          class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
        >
          <label for="comment" class="sr-only">Your comment</label>
          <textarea
            id="comment"
            rows="3"
            v-model="reply"
            class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            required
          ></textarea>
        </div>
        <div class="flex flex-row-reverse gap-x-2">
          <button
            type="submit"
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-indigo-700 rounded-lg focus:ring-4 focus:ring-indigo-200 dark:focus:ring-indigo-900 hover:bg-indigo-800"
          >
            Post reply
          </button>
          <button
            @click="replying = !replying"
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-slate-700 hover:bg-slate-300 rounded-md"
          >
            Dismiss
          </button>
        </div>
      </form>
      <!-- Replies -->
      <Comment
        v-for="com in replies"
        :comment="com"
        :key="com.id"
        @delete="
          (comment_id) => {
            $emit('delete', comment_id)
            fetchAllReplies()
          }
        "
      />
    </div>
  </div>
</template>

<script>
import Author from './Author.vue'
import UpArrowIcon from '@/components/icons/UpArrowIcon.vue'
import DownArrowIcon from '@/components/icons/DownArrowIcon.vue'
import ChatIcon from '@/components/icons/ChatIcon.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import ClockIcon from '@/components/icons/ClockIcon.vue'
import Avatar from './Avatar.vue'
import { authorName, CommentsAPI } from '../api/comments'

export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: { Author, UpArrowIcon, DownArrowIcon, Avatar, ChatIcon, TrashIcon, ClockIcon },
  data() {
    return {
      reply: '',
      replying: false,
      replies: [],
      dateOptions: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      },
      authorName: authorName,
      commentData: { ...this.comment }
    }
  },
  methods: {
    fetchAllReplies: async function () {
      this.replies = await CommentsAPI.list_replies(this.comment.id)
    },
    postReply: async function () {
      const commentObj = {
        id: window.crypto.randomUUID(),
        content: this.reply,
        author: {
          name: this.authorName
        },
        parentId: this.comment.id,
        created_at: new Date(),
        upvotes: 0
      }
      await CommentsAPI.create(commentObj)
      this.fetchAllReplies()
      this.reply = ''
      this.replying = false
    },
    upvote: async function () {
      await CommentsAPI.upvote_comment(this.commentData.id)
      this.commentData.upvotes++
    },
    deleteComment: async function () {
      this.$emit('delete', this.comment.id)
    }
  },
  mounted() {
    this.fetchAllReplies()
  }
}
</script>

<style lang="postcss" scoped></style>
