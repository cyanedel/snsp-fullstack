import { Container } from 'react-bootstrap'

export default function PageAbout(){
  return (
    <>
      <Container className='my-5'>
        <h1 className='text-info'>About this Web App</h1>
        <p>As explained briefly in German at the footer, this react app is created in single day and it is not really feasible to create an "exceptional" UI/UX given my available timeframe.</p>
        <p>As for the Django backend, I have never used it before. I spent one day learning how the framework works and another day to actually developing it according to the requirements.</p>
        <p>In summary, 1 day to learn basic of django, 1 day to develop react+django.</p>
      </Container>
    </>
  )
}