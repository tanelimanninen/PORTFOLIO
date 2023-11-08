import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return (
    <div>
      {notification.success && (
        <div className="success">{notification.success}</div>
      )}
      {notification.error && <div className="error">{notification.error}</div>}
    </div>
  );
};

export default Notification;
