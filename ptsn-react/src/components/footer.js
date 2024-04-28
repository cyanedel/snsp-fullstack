import { Container } from 'react-bootstrap';

export default function PageFooter(){
  return (
    <>
      <Container fluid className='bg-dark text-white'>
        <Container className='py-5'>Dies ist eine Ein-Tages-App. Das heißt, die App wird an einem einzigen Tag erstellt.</Container>
      </Container>
    </>
  )
}