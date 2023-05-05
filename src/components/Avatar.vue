<template>
  <div v-if="avatar" class="">
    <img class="mr-2 w-6 h-6 rounded-full" :src="avatar.toDataUriSync()" />
  </div>
</template>

<script>
import { createAvatar } from '@dicebear/core'
import { funEmoji } from '@dicebear/collection'

export default {
  name: 'Avatar',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      avatar: null
    }
  },
  mounted() {
    this.avatar = createAvatar(funEmoji, {
      seed: this.name
    })
  }
}
</script>

<style lang="postcss" scoped>
.avatar > svg {
  @apply w-6 h-6;
}
</style>
