'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import studentData from '@/data/student_info.json';

interface Student {
  id: number;
  name: string;
}

const AttendancePage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure this runs only on the client side
    setIsClient(true);

    // Fetch the student data
    fetch('/student_info.json')
      .then(response => response.json())
      .then((data: Student[]) => setStudents(data))
      .catch(error => console.error('Error fetching student data:', error));
  }, []);

  const handleAttendanceChange = (id: number) => {
    setAttendance(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save attendance to local storage or state management
    localStorage.setItem('attendance', JSON.stringify(attendance));
    // Redirect to summary page
    router.push('/Attendance');
  };

  if (!isClient) {
    return null; // or some fallback UI
  }

  return (
    <>
      <div className='flex flex-row'>
        <h1>Attendance</h1>
        <button onClick={handleSubmit} className='bg-blue-500 text-white p-2 rounded'>Submit</button>
      </div>

      <div>
        <table className='border-spacing-1'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>
                  Present <input type="checkbox" onChange={() => handleAttendanceChange(student.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AttendancePage;
