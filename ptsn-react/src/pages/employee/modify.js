import { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { Container, Form, FormGroup, Row, Col, Button, Card } from 'react-bootstrap';

export default function EmployeeModify(){
  const navigate = useNavigate();
  const { emp_id } = useParams();
  const [fullname, setfullname] = useState("")
  const [dob, setdob] = useState("")
  const [photo, setphoto] = useState("")
  const [badgeno, setbadgeno] = useState("")

  useEffect(()=>{
    console.log(emp_id)
    if (emp_id){
      fetch(`http://localhost:8000/select_emp/?id=${emp_id}`)
      .then((res)=>{return res.json()})
      .then((res)=>{
        console.log(res)
        setbadgeno(res.badge_no)
        setfullname(res.fullname)
        setdob(res.dob)
        setphoto(res.photo)
      })
      .catch(err=>{console.log(err); navigate("/");})
    } else {
      navigate("/")
    }
  }, [emp_id, navigate])

  const onSubmit = () => {
    console.log({
      fullname, dob, photo
    })

    fetch("http://localhost:8000/update_emp/", {
      method: "POST",
      body: JSON.stringify({
        id: emp_id
        , fullname: fullname
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

  const onDeactivate = () => {
    fetch("http://localhost:8000/remove_emp/", {
      method: "POST",
      body: JSON.stringify({
        employee_id: emp_id
        , badge_no: badgeno
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
        <h1 className='text-info'>Update Employee Information</h1>
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
        <Button variant='success' onClick={onSubmit}>Update details</Button>
      </Container>
      <Container className='my-5'>
        <Card className='bg-dark text-light'>
          <Card.Body>
            <Card.Title>Danger Zone</Card.Title>
            <hr />
            <Button variant='danger' onClick={onDeactivate}>Remove Employee</Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}