import axios from 'axios';

const API_URL = 'https://amason-backend-production.up.railway.app:8080/api/reviews';

export default {
  getReviews(productId) {
    return axios.get(`${API_URL}/${productId}`);
  },
  addReview(reviewData) {
    return axios.post(API_URL, reviewData);
  },
  deleteReview(reviewId) {
    return axios.delete(`${API_URL}/${reviewId}`);
  },
};
