"use client";

import { motion } from "framer-motion";

type SectionImageProps = {
  src: string;
  alt: string;
  className?: string;
  withAppear?: boolean;
};

const SectionImage = ({ src, alt, className = "", withAppear = true }: SectionImageProps) => {
  const content = (
    <img
      src={src}
      alt={alt}
      className={`w-full h-auto object-contain ${className}`}
      draggable={false}
    />
  );

  if (!withAppear) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      {content}
    </motion.div>
  );
};

export default SectionImage;