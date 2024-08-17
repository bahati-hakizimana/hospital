import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdAutoDelete } from 'react-icons/md';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../../assets/police_image/logo_lil.jpeg'
function Coment() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Get the access token from local storage
        if (!token) {
          setError('No access token found');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/notification/notifications/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
        setError('Error fetching notifications. Please check your credentials and try again.');
      }
    };

    fetchNotifications();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access_token'); // Get the access token from local storage
      if (!token) {
        setError('No access token found');
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/notification/delete/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Remove the deleted notification from the state
      setNotifications(notifications.filter(notification => notification.id !== id));
    } catch (error) {
      console.error('Error deleting notification:', error);
      setError('Error deleting notification. Please try again.');
    }
  };

  const handleDownloadReport = () => {
    try {
      // Create CSV data
      const csvContent = [
        ['Feedbacks', 'Created Date'],
        ...notifications.map(notification => [
          `"${notification.description}"`,
          `"${new Date(notification.created_date).toLocaleString()}"`
        ])
      ].map(e => e.join(",")).join("\n");

      // Create a Blob from the CSV data
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      // Create a link to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.csv'); // Set the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up the link after triggering the download
    } catch (error) {
      console.error('Error generating report:', error);
      setError('Error generating report. Please try again.');
    }
  };

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
  
      // Convert the image to a base64 string
      const img = new Image();
      img.src = logo;
  
      img.onload = () => {
        // Add the logo to the PDF
        doc.addImage(img, 'JPEG', 10, 10, 30, 30); // Positioning the logo
  
        // Add the report name next to the logo
        doc.setFontSize(20);
        doc.text('Feedback Report', 50, 25); // Positioning the text next to the logo
  
        // Draw a line under the header (optional)
        doc.setLineWidth(0.5);
        doc.line(10, 45, 200, 45);
  
        // Define the columns for the table
        const tableColumn = ["Feedback", "Created Date"];
  
        // Define the rows for the table
        const tableRows = notifications.map(notification => [
          notification.description,
          new Date(notification.created_date).toLocaleString()
        ]);
  
        // Generate the table in the PDF
        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 50, // Start the table below the logo and title
          theme: 'striped',
          styles: {
            fontSize: 10,
          },
          headStyles: {
            fillColor: [41, 128, 185],
            textColor: [255, 255, 255],
          },
        });
  
        // Save the generated PDF
        doc.save('feedback_report.pdf');
      };
    } catch (error) {
      console.error('Error generating PDF report:', error);
      setError('Error generating PDF report. Please try again.');
    }
  };


  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Comment</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleDownloadReport}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          >
            Download CSV
          </button>
          <button
            onClick={handleDownloadPDF}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download PDF
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 border-b">Feedbacks</th>
              <th className="py-2 px-4 border-b">Created Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-4 text-center">No feedbacks found.</td>
              </tr>
            ) : (
              notifications.map((notification) => (
                <tr key={notification.id}>
                  <td className="py-2 px-4 border-b text-center">{notification.description}</td>
                  <td className="py-2 px-4 border-b text-center">{new Date(notification.created_date).toLocaleString()}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button onClick={() => handleDelete(notification.id)} className="text-xl text-gray-700 hover:text-red-500">
                      <MdAutoDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Coment;
