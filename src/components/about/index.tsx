import { Routes } from '@/constants/enums';
import MainHeading from '../main-heading';


async function About() {

  return (
    <section className='section-gap' id={Routes.ABOUT}>
      <div className='container text-center'>
        <MainHeading subtitle='Our Story' title='aboutUs' />
        <div className='text-accent max-w-md mx-auto mt-4 flex flex-col gap-4'>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias porro rerum beatae aliquid. Officia assumenda dicta quibusdam, dolores ipsum, reprehenderit magni beatae tenetur officiis, repudiandae obcaecati corporis quis nostrum ea.</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non dicta et autem labore facilis facere saepe voluptatem quisquam, accusantium optio aperiam, sit adipisci quia. Eaque ipsum obcaecati nesciunt maiores numquam!</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam laborum doloremque animi dolorem ullam suscipit illo et vero reiciendis similique ut quis, voluptatibus laboriosam doloribus enim esse ea ipsam quas!</p>
        </div>
      </div>
    </section>
  );
}

export default About;
