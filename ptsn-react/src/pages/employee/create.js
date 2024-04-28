import { useState } from 'react'
import { Container, Form, FormGroup, Row, Col, Button } from 'react-bootstrap'

export default function EmployeeCreate(){
  const [fullname, setfullname] = useState("")
  const [dob, setdob] = useState("")
  const [photo, setphoto] = useState("")

  const onSubmit = () => {
    console.log({
      fullname, dob, photo
    })

    fetch("http://localhost:8000/add_emp/", {
      method: "POST",
      body: JSON.stringify({
        fullname: fullname
        , dob: dob
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
    .then((res)=>{return res.json()})
    .then((res)=>{
      console.log(res)
    })
    .catch(err=>console.log(err))
  }

  return (
    <>
      <Container className='my-5'>
        <h1 className='text-info'>Add New Employee</h1>
        <hr />
        <h2>Employee details</h2>
        <Row className='g-4'>
          <Col sm={8}>
            <FormGroup>
              <Form.Label>Fullname</Form.Label>
              <Form.Control defaultValue={fullname} placeholder='type here' onChange={(e)=>{setfullname(e.target.value)}}></Form.Control>
            </FormGroup>
            <FormGroup className='mt-3'>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control defaultValue={dob} placeholder='type here' onChange={(e)=>{setdob(e.target.value)}}></Form.Control>
            </FormGroup>
          </Col>
          <Col sm={4}>
            <FormGroup>
              <Form.Label>Photo</Form.Label>
              <Form.Control defaultValue={photo} placeholder='type here' onChange={(e)=>{setphoto(e.target.value)}}></Form.Control>
            </FormGroup>
          </Col>
        </Row>
      </Container>
      <Container className='my-5'>
        <Button variant='success' onClick={onSubmit}>Submit</Button>
      </Container>
    </>
  )
}