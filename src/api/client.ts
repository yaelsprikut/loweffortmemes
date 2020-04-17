import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://www.reddit.com',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})

const subreddits = [
  'dankmemes',
  'blackpeopletwitter',
  'funny',
  'shittyadviceanimals',
  'meirl',
  'memes',
  'terriblefacebookmemes'
]

const randomSub = (arr: any) => arr[Math.floor(Math.random() * arr.length)]

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))

export const fetchPosts = async () => {
  const subreddit = randomSub(subreddits)
  const post = getRandomInt(24)
  try {
    const response = await apiClient.get<any>(
      `/r/${subreddit}/top.json?limit=25`
    )
    console.log(response.data.data.children[post])
    if (response.data.data.children[post]) {
      return response.data.data.children[post].data
    } else {
      return window.location.pathname = "/"
    }
  } catch (err) {
    if (err && err.response) {
      console.log(err)
      return false
    }

    throw err
  }
}
