<template>
  <div class="container mx-auto">
    <h1 class="font-bold text-lg mb-2">Instructions</h1>
    <ol>
      <li>
        A random author name and avatar is generated (using
        <a class="text-indigo-600 hover:underline" href="https://www.dicebear.com/">DiceBear</a>)
        for each session.
      </li>
      <li>The comment data is stored in <span class="font-bold">localStorage</span></li>
      <li>
        To reply to a comment, simply click on the <span class="font-bold">Reply</span> button. This
        will trigger an input area to appear directly below the comment you wish to respond to.
      </li>
      <li>To reply to this post, simply enter your comment in the top text area provided.</li>
      <li>
        The ordering of comments is such that the most recently added comment appears at the top.
      </li>
      <li>Comment can only be deleted by the author of the comment.</li>
      <li>Reply nesting is unlimited but too deep nesting may distort UI on smaller screens.</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'Instructions',
  data() {
    return {}
  }
}
</script>

<style lang="postcss" scoped>
ol {
  @apply list-decimal text-sm text-slate-700 list-inside;
}
</style>
