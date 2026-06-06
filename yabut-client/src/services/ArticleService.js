import axios from "axios";
import constants from "../constants";

const API = axios.create({
  baseURL: `${constants.HOST}/api/articles`,
  withCredentials: true,
});

// Fetch articles
export const fetchArticles = (
  config
) =>
  API.get(
    "/?includeDisabled=true",
    config
  );

// Create article
export const addArticle = (
  articleData,
  config
) =>
  API.post(
    "/",
    articleData,
    config
  );

// Update article
export const updateArticle = (
  id,
  articleData,
  config
) =>
  API.put(
    `/${id}`,
    articleData,
    config
  );

// Delete article
export const deleteArticle = (
  id,
  config
) =>
  API.delete(
    `/${id}`,
    config
  );