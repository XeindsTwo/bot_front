import axios from 'axios'
import {API_BASE_URL} from "@/config/api.js";

const API_URL = `${API_BASE_URL}/api`

export const fetchTokens = () =>
  axios.get(`${API_URL}/tokens`).then(res => res.data)

export const fetchTransactions = () =>
  axios.get(`${API_URL}/transactions`).then(res => res.data)
