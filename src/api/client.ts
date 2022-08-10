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
  'cutouts',
  'tinder',
  'funny',
  'meirl',
  'memes',
  'AdviceAnimals',
  'MemeEconomy',
  'shittyadviceanimals',
  'ComedyCemetery',
  'teenagers',
  'PrequelMemes',
  'terriblefacebookmemes',
  '2meirl4meirl',
  'historymemes'
]

const randomSub = (arr: any) => arr[Math.floor(Math.random() * arr.length)]

const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))

export const fetchPosts = async () => {
  const subreddit = randomSub(subreddits)
  const subredditInfo = await getSubredditInfo(subreddit)
  const post = getRandomInt(24)
  let topComments = null
  try {
    const response =
      subreddit === 'cutouts' || 'ooer'
        ? await apiClient.get<any>(`/r/${subreddit}/new.json?limit=25&t=month`)
        : await apiClient.get<any>(`/r/${subreddit}/top.json?limit=25&t=month`)

    if (response.data.data.children[post]) {
      if(response.data.data.children[post].data.name) {
        // console.log(response.data.data.children[post].data.name)
        // topComments = await apiClient.get<any>(`/r/${subreddit}/comments/${response.data.data.children[post].data.name}`)
      }
      // console.log("topComments: ", topComments)
      return [response.data.data.children[post].data, subredditInfo]
    } else {
      return (window.location.pathname = '/')
    }
  } catch (err: any) {
    if (err && err.response) {
      console.log(err)
      window.location.reload()
    }

    throw err
  }
}

const getSubredditInfo = async (subreddit: String) => {
  try {
    const response = await apiClient.get<any>(`/r/${subreddit}/about.json`)
    return response.data.data.description
  } catch (err) {
    throw err
  }
}

// const getSubredditFromURL = async (subreddit: string) => {
//   const response = await apiClient.get<any>(`/r/${subreddit}/top.json?limit=25`)
//   const post = getRandomInt(24)

//   if (response.data.data.children[post]) {
//     return response.data.data.children[post].data
//   } else {
//     return (window.location.pathname = '/')
//   }
// }
