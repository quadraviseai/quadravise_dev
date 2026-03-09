import { List } from "antd";

function FeatureList({ items = [] }) {
  return <List size="small" dataSource={items} renderItem={(item) => <List.Item>{item}</List.Item>} />;
}

export default FeatureList;
