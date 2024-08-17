import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

// Register the components you need
ChartJS.register(ArcElement, Tooltip, Legend, Title);

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [notificationData, setNotificationData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token'); // Get the access token from local storage

      if (!token) {
        setErrorMessage('No access token found');
        return;
      }

      try {
        const [userResponse, notificationResponse, eventResponse] = await Promise.all([
          fetch('http://127.0.0.1:8000/user_growth/', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch('http://127.0.0.1:8000/notification/count/', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch('http://127.0.0.1:8000/event/count/', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
        ]);

        if (!userResponse.ok || !notificationResponse.ok || !eventResponse.ok) {
          throw new Error(`HTTP error! status: ${userResponse.status} / ${notificationResponse.status} / ${eventResponse.status}`);
        }

        const [userData, notificationData, eventData] = await Promise.all([
          userResponse.json(),
          notificationResponse.json(),
          eventResponse.json(),
        ]);

        setUserData(userData);
        setNotificationData(notificationData);
        setEventData(eventData);
        setErrorMessage('');
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Error fetching data. Please try again.');
      }
    };

    fetchData();
  }, []);

  if (errorMessage) {
    return <div className="text-red-500 text-center">{errorMessage}</div>;
  }

  if (!userData || !notificationData || !eventData) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  // Data for the user growth pie chart
  const userGrowthChartData = {
    labels: ['Previous Month Users', 'Current Month Users'],
    datasets: [
      {
        label: 'User Growth',
        data: [userData.previous_month_users, userData.current_month_users],
        backgroundColor: ['#ff9999', '#66b3ff'],
        borderColor: ['#ff6666', '#3399ff'],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  // Data for the notifications vs events pie chart
  const notificationsEventsChartData = {
    labels: ['Feedbacks', 'Requests'],
    datasets: [
      {
        label: 'Count',
        data: [notificationData.number_of_notifications, eventData.number_of_events],
        backgroundColor: ['#ff9999', '#66b3ff'],
        borderColor: ['#ff6666', '#3399ff'],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
      },
      title: {
        display: true,
        // text: 'nnnnnn',
        color: '#333',
        font: {
          size: 24,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleColor: '#fff',
        bodyColor: '#fff',
        titleFont: {
          size: 16,
          weight: 'bold',
        },
        bodyFont: {
          size: 14,
        },
        borderRadius: 8,
        padding: 10,
      },
    },
    maintainAspectRatio: false, // Allows for responsive design
    responsive: true,
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-96 w-96 mx-auto">
          <Pie data={userGrowthChartData} options={{ ...chartOptions, title: { ...chartOptions.title, text: 'User Growth Comparison' } }} />
        </div>
        <div className="relative h-96 w-96 mx-auto">
          <Pie data={notificationsEventsChartData} options={{ ...chartOptions, title: { ...chartOptions.title, text: 'Feedback vs Requests' } }} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
