import { Empty } from "antd";

function EmptyState({ message = "No data available yet." }) {
  return <Empty description={message} />;
}

export default EmptyState;
