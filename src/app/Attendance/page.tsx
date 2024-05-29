'use client';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const AttendanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StudentList = styled.div`
  margin-top: 20px;
  width: 300px;
`;

const StudentItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 5px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
  }
`;

const Input = styled.input`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 280px;
  color:black;
`;

interface Student {
  id: number;
  name: string;
  present: boolean;
}

const Attendance: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudentName, setNewStudentName] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('/api/students');
      const data = await response.json();
      setStudents(data.Students.map((student: { id: number, name: string }) => ({
        ...student,
        present: false,
      })));
    };

    fetchStudents();
  }, []);

  const toggleAttendance = (index: number) => {
    const newStudents = [...students];
    newStudents[index].present = !newStudents[index].present;
    setStudents(newStudents);
  };

  const addStudent = () => {
    if (newStudentName.trim()) {
      const newStudent: Student = {
        id: Date.now(), // use current timestamp as unique id
        name: newStudentName,
        present: false,
      };
      setStudents([...students, newStudent]);
      setNewStudentName('');
    }
  };

  const deleteStudent = (index: number) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  const showAttendance = () => {
    const attendance = students.map(student => `${student.name}: ${student.present ? 'Present' : 'Absent'}`).join('\n');
    alert(attendance);
  };

  return (
    <AttendanceContainer>
      <h1>Student Attendance</h1>
      <Input
        type="text"
        value={newStudentName}
        onChange={(e) => setNewStudentName(e.target.value)}
        placeholder="Enter new student name"
      />
      <Button onClick={addStudent}>
        Add Student
      </Button>
      <StudentList>
        {students.map((student, index) => (
          <StudentItem key={student.id}>
            <span>{student.name}</span>
            <input
              type="checkbox"
              checked={student.present}
              onChange={() => toggleAttendance(index)}
            />
            <Button onClick={() => deleteStudent(index)}>
              Delete
            </Button>
          </StudentItem>
        ))}
      </StudentList>
      <Button onClick={showAttendance}>
        Show Attendance
      </Button>
      <div>
        <h2>Attendance Summary</h2>
        <pre>
          {students.map(student => `${student.name}: ${student.present ? 'Present' : 'Absent'}`).join('\n')}
        </pre>
      </div>
    </AttendanceContainer>
  );
};

export default Attendance;
