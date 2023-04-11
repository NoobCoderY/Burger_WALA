import React from "react";
import { motion } from "framer-motion";
import me from "../../assests/WhatsApp Image 2023-03-14 at 2.52.09 AM.jpeg";
const Founder = () => {
  const options = {
    initial: {
      x: "-100%",
      opacity: 0,
    },
    whileInView: {
      x: 0,
      opacity: 1,
    },
  };

  return (
    <section className="founder">
      <motion.div {...options}>
        <img src={me} alt="Founder" height={200} width={200} />
        <h3>Bhalu</h3>

        <p>
          Hey, Everyone Bhalu Burger Wala, the founder of Bhalu Burger Wala.
          <br />
          Our aim is to create the most tasty burger on planet.
        </p>
      </motion.div>
    </section>
  );
};

export default Founder;