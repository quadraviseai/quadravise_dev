import { staticBlogs } from "../constants/blogs";

function cloneBlog(blog) {
  return blog ? { ...blog } : null;
}

export const blogService = {
  async getBlogs() {
    return {
      data: staticBlogs.map((blog) => cloneBlog(blog))
    };
  },
  async getFeaturedBlogs() {
    return {
      data: staticBlogs.filter((blog) => blog.featured).map((blog) => cloneBlog(blog))
    };
  },
  async getBlogBySlug(slug) {
    return {
      data: cloneBlog(staticBlogs.find((blog) => blog.slug === slug) || null)
    };
  }
};
