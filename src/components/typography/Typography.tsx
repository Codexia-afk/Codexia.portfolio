import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

/**
 * MonoLabel Component
 * JetBrains Mono: technical tags, indices, status badges, coordinates.
 */
interface MonoLabelProps {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
  dotColor?: string;
  as?: 'span' | 'div' | 'p';
}

export const MonoLabel: React.FC<MonoLabelProps> = ({
  children,
  className = '',
  dot = false,
  dotColor = 'bg-[#486616] dark:bg-[#d5ef9c]',
  as: Component = 'span'
}) => {
  return (
    <Component
      className={`inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase font-semibold text-[#8c877b] dark:text-[#a8a69f] ${className}`}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor} animate-pulse`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </Component>
  );
};

/**
 * BodyText Component
 * Satoshi: Exceptional readability, restrained scale, optimal reading measure.
 */
interface BodyTextProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'base' | 'lg';
  tone?: 'primary' | 'secondary' | 'muted';
  as?: 'p' | 'span' | 'div';
}

export const BodyText: React.FC<BodyTextProps> = ({
  children,
  className = '',
  size = 'base',
  tone = 'secondary',
  as: Component = 'p'
}) => {
  const sizeClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-relaxed'
  }[size];

  const toneClasses = {
    primary: 'text-zinc-900 dark:text-zinc-100',
    secondary: 'text-zinc-600 dark:text-zinc-300',
    muted: 'text-zinc-500 dark:text-zinc-400'
  }[tone];

  return (
    <Component
      className={`font-sans ${sizeClasses} ${toneClasses} max-w-[68ch] text-pretty ${className}`}
    >
      {children}
    </Component>
  );
};

/**
 * EditorialHeading Component
 * Clash Display bold headlines paired with Instrument Serif italic contrast words.
 */
interface EditorialHeadingProps {
  title: string;
  italicPhrase?: string;
  italicPosition?: 'start' | 'end' | 'inline';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export const EditorialHeading: React.FC<EditorialHeadingProps> = ({
  title,
  italicPhrase,
  italicPosition = 'end',
  as: Component = 'h2',
  className = ''
}) => {
  return (
    <Component
      className={`font-display tracking-[-0.035em] text-[#1a1917] dark:text-[#f0ede5] text-balance ${className}`}
    >
      {italicPosition === 'start' && italicPhrase && (
        <span className="font-editorial font-normal italic lowercase tracking-normal text-[#486616] dark:text-[#d5ef9c] mr-2 sm:mr-3 inline-block">
          {italicPhrase}
        </span>
      )}
      <span>{title}</span>
      {italicPosition === 'end' && italicPhrase && (
        <>
          {' '}
          <span className="font-editorial font-normal italic lowercase tracking-normal text-[#486616] dark:text-[#d5ef9c] inline-block">
            {italicPhrase}
          </span>
        </>
      )}
    </Component>
  );
};

/**
 * SectionHeading Component
 * Standardized section header with MonoLabel indicator, Clash Display + Serif title, and Satoshi subtitle.
 */
interface SectionHeadingProps {
  number: string;
  label: string;
  title: string;
  italicWord?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  label,
  title,
  italicWord,
  subtitle,
  align = 'left',
  className = ''
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-12 sm:mb-16 border-b border-[#dcd6c8] dark:border-[#2d2c27] pb-6 ${
        isCenter ? 'text-center max-w-3xl mx-auto' : 'flex flex-col sm:flex-row sm:items-end justify-between'
      } ${className}`}
    >
      <div>
        <div className="mb-2.5">
          <MonoLabel dot dotColor="bg-[#486616] dark:bg-[#d5ef9c]">
            {number} // {label}
          </MonoLabel>
        </div>
        <h2 className="section-title text-[#1a1917] dark:text-[#f0ede5]">
          {title}
          {italicWord && (
            <>
              {' '}
              <span className="editorial-italic font-normal lowercase tracking-normal text-[#486616] dark:text-[#d5ef9c]">
                {italicWord}
              </span>
            </>
          )}
        </h2>
      </div>
      {subtitle && (
        <p
          className={`font-mono text-xs sm:text-sm text-[#8c877b] dark:text-[#a8a69f] ${
            isCenter ? 'mt-4' : 'mt-3 sm:mt-0 max-w-md sm:text-right'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

/**
 * ProjectTitle Component
 * Clash Display bold with subtle negative tracking and hover animation.
 */
interface ProjectTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}

export const ProjectTitle: React.FC<ProjectTitleProps> = ({
  children,
  className = '',
  as: Component = 'h3'
}) => {
  return (
    <Component
      className={`font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-[#1a1917] dark:text-[#f0ede5] group-hover:text-[#486616] dark:group-hover:text-[#d5ef9c] transition-colors duration-200 ${className}`}
    >
      {children}
    </Component>
  );
};

/**
 * HeroDisplay Component
 * Staggered line-mask reveal with Clash Display + Instrument Serif italic phrase.
 */
interface HeroDisplayProps {
  line1: string;
  line2: string;
  italicPhrase: string;
  className?: string;
}

export const HeroDisplay: React.FC<HeroDisplayProps> = ({
  line1,
  line2,
  italicPhrase,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.15
      }
    }
  };

  const lineVariants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { y: '105%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.75,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`hero-title text-[#1a1917] dark:text-[#f0ede5] select-none flex flex-col items-center sm:items-start text-center sm:text-left ${className}`}
    >
      {/* Line 1 */}
      <div className="overflow-hidden py-0.5">
        <motion.div variants={lineVariants} className="block">
          {line1}
        </motion.div>
      </div>

      {/* Line 2 */}
      <div className="overflow-hidden py-0.5">
        <motion.div variants={lineVariants} className="block text-[#1a1917] dark:text-[#f0ede5]">
          {line2}
        </motion.div>
      </div>

      {/* Expressive Italic Phrase */}
      <div className="overflow-hidden py-0.5">
        <motion.div
          variants={lineVariants}
          className="block editorial-italic font-normal lowercase tracking-normal text-[#486616] dark:text-[#d5ef9c]"
        >
          {italicPhrase}
        </motion.div>
      </div>
    </motion.div>
  );
};
