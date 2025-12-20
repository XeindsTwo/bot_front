import axios from 'axios'

const API_URL = 'http://localhost:8000/api'

export const fetchTokens = () =>
  axios.get(`${API_URL}/tokens`).then(res => res.data)

export const fetchTransactions = () =>
  axios.get(`${API_URL}/transactions`).then(res => res.data)
