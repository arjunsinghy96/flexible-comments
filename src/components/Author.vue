<template>
  <div></div>
  <div class="flex justify-between items-center mb-2">
    <div class="flex items-center">
      <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
        <img
          class="mr-2 w-8 h-8 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
          :alt="author.name"
        />
      </p>
      <p class="text-gray-600 dark:text-gray-400 flex justify-between items-end flex-row">
        <span class="font-bold">
          {{ author.name }}
        </span>
        <span class="text-xs">{{ created_at.toLocaleDateString(undefined, dateOptions) }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Author',
  props: {
    author: {
      type: Object,
      required: true
    },
    created_at: {
      type: Date,
      required: true
    }
  },
  data() {
    return {
      dateOptions: {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    }
  }
}
</script>

<style lang="postcss" scoped></style>
