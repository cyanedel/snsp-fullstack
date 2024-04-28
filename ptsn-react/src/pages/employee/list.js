import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap'

export default function EmployeeList(){
  const [employeeData, setemployeeData] = useState([])

  useEffect(()=>{
    fetch("http://localhost:8000/select_emp_bystatus/1/")
    .then((res)=>{return res.json()})
    .then((res)=>{
      setemployeeData(res.data)
    })
    .catch(err=>console.log(err))
  }, [])
  return (
    <>
      <Container className='my-5'>
        <h1 className='text-info'>Active Employee List</h1>
        <hr />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Badge No</th>
              <th>Employee Name</th>
              <th>DoB</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {employeeData && employeeData.map((item, index)=>{
            const {id, fullname, dob, badge_no} = item
            return(
              <tr key={index}>
                <td>{badge_no} {id}</td>
                <td>{fullname}</td>
                <td>{dob}</td>
                <td><Link to={`/employee/update/${id}/`}><Button variant="success">Modify</Button></Link></td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      </Container>
    </>
  )
}