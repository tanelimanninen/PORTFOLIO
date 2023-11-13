import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return (
    <div>
      {notification.success && (
        <Alert style={{ marginTop: 15 }} severity="success">
          {notification.success}
        </Alert>
      )}
      {notification.error && (
        <Alert style={{ marginTop: 15 }} severity="error">
          {notification.error}
        </Alert>
      )}
    </div>
  );
};

export default Notification;
