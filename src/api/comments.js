// const comments = {
//   1: {
//     id: 1,
//     content: "This is the first Comment",
//     author: {
//       name: "Arjun Singh Yadav",
//       image: null
//     },
//     created_at: new Date(),
//     upvotes: 0,
//     parentId: null,
//   },
//   2: {
//     id: 2,
//     content: "This is another comment",
//     author: {
//       name: "Arjun Singh Yadav",
//       image: null
//     },
//     created_at: new Date(),
//     upvotes: 0,
//     parentId: null
//   }
// }

import { generateName } from './users'

let comments = {}
export const authorName = generateName()

if (localStorage.getItem('comments')) {
  comments = JSON.parse(localStorage.getItem('comments'))
  Object.values(comments).forEach((element) => {
    element.created_at = new Date(element.created_at)
  })
} else {
  comments = {}
  localStorage.setItem('comments', JSON.stringify({}))
}

const pushCommentsToStorage = function () {
  localStorage.setItem('comments', JSON.stringify(comments))
}

export const CommentsAPI = {
  list: async function () {
    return Object.values(comments)
      .filter((value) => value.parentId === null)
      .sort((a, b) => b.created_at - a.created_at)
  },
  count: async function () {
    return Object.keys(comments).length
  },
  retrieve: async function (id) {
    return comments[id]
  },
  create: async function (item) {
    item.author = {
      name: authorName,
      image: null
    }
    comments[item.id] = item
    pushCommentsToStorage()
  },
  update: async function (id, item) {
    comments[id] = item
    pushCommentsToStorage()
  },
  delete: async function (id) {
    delete comments[id]
    pushCommentsToStorage()
  },
  list_replies: async function (id) {
    return Object.values(comments)
      .filter((value) => value.parentId === id)
      .sort((a, b) => b.created_at - a.created_at)
  },
  upvote_comment: async function (id) {
    const comment = comments[id]
    if (comment) {
      comments[id].upvotes++
      pushCommentsToStorage()
    }
  }
}
