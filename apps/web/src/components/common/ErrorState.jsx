import { Button, Result } from "antd";

function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <Result
      status="error"
      title="Request Failed"
      subTitle={message}
      extra={onRetry ? <Button onClick={onRetry}>Retry</Button> : null}
    />
  );
}

export default ErrorState;
