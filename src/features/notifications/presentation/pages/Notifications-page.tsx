import React, { useState } from "react";
import NotificationList from "../layouts/notificationList";
import type { Notification } from "../components/notificationCard";
import ThemeToggleButton from "../../../shared/components/generic/ThemeToggleButton";
import { useTheme } from "../../../shared/hooks/useTheme";
import Header from "../../../shared/components/generic/header";
import { useDateTime } from "../../../shared/hooks/useDataTime";
import Robot from "../../../../core/assets/icons/notifications/robot.png";
import "../pages/Notifications.css"; // Asegúrate de tener este CSS

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: "info",
    title: "Agua mala",
    description: "El agua contiene impurezas. Revisa el sistema.",
    date: "2025-07-15T13:30:00",
    expanded: false,
  },
  {
    id: 2,
    type: "error",
    title: "Sensor malo",
    description: "Sensor desactivado o sin respuesta.",
    date: "2025-07-15T13:35:00",
    expanded: false,
  },
  {
    id: 3,
    type: "success",
    title: "Temperatura alta",
    description: "Agua lista para reutilizarse.",
    date: "2025-07-15T13:40:00",
    expanded: false,
  },
];

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const { theme, toggleTheme } = useTheme();
  const { date, time } = useDateTime();

  const toggleExpand = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, expanded: !n.expanded } : n))
    );
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <>
      <Header
        title="Notificaciones"
        subtitle="Visualiza y gestiona tus notificaciones de forma eficiente"
        date={date}
        time={time}
      />

      <div className="notification-container">
        <div className="notification-card">
          <div className="notification-header">
            <h2>Notificaciones</h2>
            <button onClick={clearAll}>Limpiar</button>
          </div>

          <NotificationList
            notifications={notifications}
            onToggle={toggleExpand}
            onRemove={removeNotification}
          />
        </div>

        <div className="robot-container">
          <img src={Robot} alt="Robot" />
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
      </div>
    </>
  );
};

export default NotificationsPage;