import Image from 'next/image';
import classes from './hero.module.css';

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image 
          src="/images/site/alex.jpg" 
          alt='An image showing Alex' 
          height={300} 
          width={300} 
        />
      </div>

      <h1>Hi, I am Alex</h1>

      <p>
        I blog about web development - especially frontend frameworks like Angular or React.
      </p>
    </section>
  );
}
