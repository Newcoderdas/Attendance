
// import Students from "@/Components/Students";
// import Attendance from "@/app/Attendance/page";
 import Login  from "@/app/Login/page"
import stData from '@/data/student_info.json'
import Link from 'next/link';



interface Student{
  image: string;
  id: number;
  name: string;
  year: number;
  Degree: string;
  isFeature: boolean;
}
export default function Home() {

 

  return (
    //  <Login/>
    // <Attendance/>
    // <Students/>
  
    <>
<Login/>      
    </>
        
  );
}
