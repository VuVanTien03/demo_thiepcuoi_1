import React from 'react';
import { motion } from 'framer-motion';

export default function LoveStory({ storyData }) {
  const { title, content, subQuote1, subQuote2 } = storyData;

  return (
    <section className="t39-love-story-section">
      <motion.div 
        className="t39-notebook-container"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8 }}
      >
        <img 
          src="/images/template39/notebook_paper.png" 
          alt="Our Love Story Notebook" 
          className="t39-notebook-bg"
        />

        <div className="t39-notebook-content-overlay">
          <h2 className="t39-notebook-title">{title}</h2>
          <p className="t39-notebook-body">{content}</p>
          
          <div className="t39-notebook-subquotes">
            <div>{subQuote1}</div>
            <div>&ldquo;{subQuote2}&rdquo;</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
