import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://www.reddit.com',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const fetchPosts = async (subreddit: any) => {
  try {
    const response = await apiClient.get<any>('/r/funny/top.json?limit=25')
    // const user = response.data
    return response.data.data.children[0].data
  } catch (err) {
    if (err && err.response) {
      console.log(err)
      //   const axiosError = err as AxiosError<ServerError>
      //   return axiosError.response.data
    }

    throw err
  }
}
