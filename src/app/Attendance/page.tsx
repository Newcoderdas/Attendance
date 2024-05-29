'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AttendanceSummaryPage = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedAttendance = localStorage.getItem('attendance');
    if (storedAttendance) {
      setAttendanceData(JSON.parse(storedAttendance));
    } else {
      // Redirect back to attendance page if no data is found
      router.push('/');
    }
  }, [router]);

  return (
    <div>
      <h1>Attendance Summary</h1>
      <table className='border-spacing-1'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(attendanceData).map(([id, present]) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{/* Fetch and display the name from your student_info.json or state if needed */}</td>
              <td>{present ? 'Present' : 'Absent'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceSummaryPage;
