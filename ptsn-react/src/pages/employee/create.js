import { useEffect, useState } from 'react'
import { Container, Form, FormGroup, Row, Col, Button, Card } from 'react-bootstrap'
import CommonModal from '../../components/common-modal'

export default function EmployeeCreate(){
  const [fullname, setfullname] = useState("")
  const [dob, setdob] = useState("")
  const [photo, setphoto] = useState("")
  const [photodisplay, setphotodisplay] = useState("")
  const [showmodal, setshowmodal] = useState(false)
  const [message, setmessage] = useState("")

  const onSubmit = () => {
    if (!(fullname && dob && photo)) {
      setmessage("Please fill al required field.")
      return;
    }

    const formData = new FormData();
    formData.append('fullname', fullname);
    formData.append('dob', dob);
    if(photo){
      formData.append('photo', photo);
    }

    fetch("http://localhost:8000/add_emp/", {
      method: "POST",
      body: formData
    })
    .then((res)=>{return res.json()})
    .then((res)=>{
      setmessage(`New employee's badge number: ${res.badge_no}`)
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
        <h1 className='text-info'>Add New Employee</h1>
        <hr />
        <h2>Employee details</h2>
        <Row className='g-3'>
          <Col sm={8}>
            <Card>
              <Card.Body>
                <FormGroup>
                  <Form.Label>Fullname</Form.Label>
                  <Form.Control defaultValue={fullname} placeholder='type here' onChange={(e)=>{setfullname(e.target.value)}}></Form.Control>
                </FormGroup>
                <FormGroup className='mt-3'>
                  <Form.Label>Date of Birth (YYYY-MM-DD)</Form.Label>
                  <Form.Control defaultValue={dob} placeholder='type here' onChange={(e)=>{setdob(e.target.value)}}></Form.Control>
                </FormGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}>
            <div className='photo-frame'>
              <input type="file" accept="image/jpeg, image/png, image/gif" name="employee-photo" className='input-picker' onChange={onImageChange} />
              {photo ? (
                <img src={photodisplay} alt="" className='photo-frame-content w-100 p-2'/>
              ) : (
                <div className='photo-frame-text photo-frame-content'><div>Select Image</div></div>
              )}
            </div>
            
          </Col>
        </Row>
      </Container>
      <Container className='my-5'>
        <Button variant='success' onClick={onSubmit}>Submit</Button>
      </Container>
      <CommonModal
        show={showmodal}
        handleClose={()=>setshowmodal(false)}
        msg={message}
      />
    </>
  )
}