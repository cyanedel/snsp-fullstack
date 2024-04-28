import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home(){

  const listRouteCard = [
    {
      title: "Add Employee",
      desc: "To assign an employee badge to an employee.",
      route: "/employee/add"
    }, {
      title: "Employee List",
      desc: "To see list of active employees.",
      route: "/employee"
    }
  ]

  return (
    <>
      <Container className='my-5'>
        <h1 className='text-info'>Welcome to this Simple React App!</h1>
        <p>Feel free to explore this mockup site from route provided in the header or body of this page.</p>
        <p>You can add and update employee information. There is also an option to flag the employee as 'inactive'.</p>
        <p>Rest of this page is just gibberish to make the page seem longer.</p>
      </Container>
      <Container className='my-5'>
        <Row className='g-3 row-cols-sm-2'>
          {listRouteCard.map((item, index)=>{return (
            <Col key={index}>
              <Link to={item.route}>
              <Card className='h-100'>
                <Card.Body>
                  <Card.Title className='text-info'>{item.title}</Card.Title>
                  <Card.Text>{item.desc}</Card.Text>
                </Card.Body>
              </Card>
              </Link>
            </Col>
          )})}
        </Row>
      </Container>
    </>
  )
}