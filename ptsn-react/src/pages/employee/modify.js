import { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { Container, Form, FormGroup, Row, Col, Button, Card } from 'react-bootstrap';
import CommonModal from '../../components/common-modal'

export default function EmployeeModify(){
  const navigate = useNavigate();
  const { emp_id } = useParams();
  const [fullname, setfullname] = useState("")
  const [dob, setdob] = useState("")
  const [photo, setphoto] = useState("")
  const [photodisplay, setphotodisplay] = useState("")
  const [badgeno, setbadgeno] = useState("")
  const [showmodal, setshowmodal] = useState(false)
  const [message, setmessage] = useState("")

  useEffect(()=>{
    if (emp_id){
      fetch(`http://localhost:8000/select_emp/?id=${emp_id}`)
      .then((res)=>{return res.json()})
      .then((res)=>{
        setbadgeno(res.badge_no)
        setfullname(res.fullname)
        setdob(res.dob)
        if (res.photo){
          // const modifiedUrl = res.photo.replace(/\/photo/, ""); //Django keep returning wrong url. no time to check.
          setphotodisplay("http://localhost:8000"+res.photo)
        }
      })
      .catch(err=>{console.log(err); navigate("/");})
    } else {
      navigate("/")
    }
  }, [emp_id, navigate])

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('id', emp_id);
    formData.append('fullname', fullname);
    formData.append('dob', dob);
    if(photo){
      formData.append('photo', photo);
    }

    fetch("http://localhost:8000/update_emp/", {
      method: "POST",
      body: formData,
    })
    .then((res)=>{return res.json()})
    .then((res)=>{setmessage("Information updated.")})
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
      setmessage("Employee removed. Badge is now Available")
    })
    .catch(err=>console.log(err))
  }

  const onImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setphoto(file);
      setphotodisplay(URL.createObjectURL(file));
    } else {
      setphoto(null);
    }
  };
  
  useEffect(()=>{
    if(message!==""){
      setshowmodal(true)
    }
  }, [message])
  
  useEffect(()=>{
    if(!showmodal){
      setmessage("")
    }
  }, [showmodal])

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
              <Form.Label>Date of Birth (YYYY-MM-DD)</Form.Label>
              <Form.Control defaultValue={dob} placeholder='type here' onChange={(e)=>{setdob(e.target.value)}}></Form.Control>
            </FormGroup>
          </Col>
          <Col sm={4}>
            <div className='photo-frame'>
              <input type="file" accept="image/jpeg, image/png, image/gif" name="employee-photo" className='input-picker' onChange={onImageChange} />
              {photodisplay ? (
                <img src={photodisplay} alt="" className='photo-frame-content w-100 p-2'/>
              ) : (
                <div className='photo-frame-text photo-frame-content'><div>Select Image</div></div>
              )}
            </div>
            <div className='text-center'>#{badgeno}</div>
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
      <CommonModal
        show={showmodal}
        handleClose={()=>setshowmodal(false)}
        msg={message}
      />
    </>
  )
}