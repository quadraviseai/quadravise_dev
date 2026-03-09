import { Select } from "antd";

function BlogCategoryFilter({ categories, value, onChange }) {
  return (
    <Select
      className="blog-page-category-filter"
      placeholder="Filter by category"
      allowClear
      options={categories.map((category) => ({ label: category, value: category }))}
      value={value}
      onChange={onChange}
    />
  );
}

export default BlogCategoryFilter;
