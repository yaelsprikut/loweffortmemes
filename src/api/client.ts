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
  'ooer',
  'gifs',
  'teenagers',
  'cutouts',
  'tinder',
  'funny',
  'meirl',
  'memes',
  'cringepics'
]

const randomSub = (arr: any) => arr[Math.floor(Math.random() * arr.length)]

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))

export const fetchPosts = async () => {
  const subreddit = randomSub(subreddits)
  const post = getRandomInt(24)
  try {
    const response = subreddit === 'cutouts' || 'ooer' ? await apiClient.get<any>(
      `/r/${subreddit}/new.json?limit=25`
    ) : await apiClient.get<any>(
      `/r/${subreddit}/top.json?limit=25`
    )

    if (response.data.data.children[post]) {
      return response.data.data.children[post].data
    } else {
      return window.location.pathname = "/"
    }
  } catch (err) {
    if (err && err.response) {
      console.log(err)
      // window.location.reload()
    }

    throw err
  }
}
