import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Button, Form, FormGroup } from 'react-bootstrap';
import { debounce } from 'lodash';

export default function EmployeeList(){
  const [employeeData, setemployeeData] = useState([])
  const [seachstring, setseachstring] = useState()

  const onSearchStringChange = (e) => {
    setseachstring(e.target.value)
  }

  function fetchActiveEmployee(){
    fetch("http://localhost:8000/select_emp_bystatus/1/")
    .then((res)=>{ return res.json() })
    .then((res)=>{ setemployeeData(res.data) })
    .catch(err=>console.log(err))
  }

  useEffect(()=>{
    fetchActiveEmployee();
  }, [])

  useEffect(()=>{
    if(seachstring) {
      fetch(`http://localhost:8000/select_emp_byname/${seachstring}/`)
        .then((res)=>{ return res.json() })
        .then((res)=>{ setemployeeData(res.data) })
        .catch(err=>console.log(err))
    } else {
      fetchActiveEmployee();
    }
  }, [seachstring])

  return (
    <>
      <Container className='my-5'>
        <h1 className='text-info'>Active Employee List</h1>
        <hr />
        <FormGroup className="my-3">
          <Form.Label>Employee Name</Form.Label>
          <Form.Control defaultValue={seachstring} placeholder='type here' onChange={debounce(onSearchStringChange, 300)}></Form.Control>
        </FormGroup>
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
                <td>{badge_no}</td>
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