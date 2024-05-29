'use client';

import React from 'react';
import Link from 'next/link';
import stData from '@/data/student_info.json';
// import  '@/Components/Attendance'

interface Student {
  image: string;
  id: number;
  name: string;
  year: number;
  Degree: string;
  isFeature: boolean;
}

const Students = () => {
  const featuredStudent = stData.Students.filter((student: Student) => student.isFeature);

  return (
    <div className='py-12 bg-gray-900'>
      <div>
        <div className="text-center">
          <h2 className='text-base text-teal-600 font-semibold tracking-wide uppercase'>Student Information</h2>
          <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl'>Batch 2020</p>
        </div>
      </div>
      <div className='mt-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
          {featuredStudent.map((student: Student) => (
            <div key={student.id} className="flex justify-center text-white">
              <div className='rounded-lg bg-slate-600 p-4 sm:p-6 flex flex-col items-center text-center flex-grow'>
                <img className='rounded-full size-20' src={student.image} alt={student.name} />
                <h1>Year: {student.year}</h1>
                <p>Degree: {student.Degree}</p>
                <p>Reg: {student.id}</p>
                <p>Name: {student.name}</p>
                <Link href={`/Attendance/${student.id}`}
                   className='mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700'>View Attendance
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Students;
