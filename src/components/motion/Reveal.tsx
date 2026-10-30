import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInView } from '@/hooks/useMotion';

type Props = {
  children: ReactNode;
  as?: ElementType;
  index?: number;
  className?: string;
  style?: CSSProperties;
};

const Reveal = ({ children, as: Tag = 'div', index = 0, className = '', style }: Props) => {
  const { ref, inView } = useInView<HTMLElement>(0.12);
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ ...style, ['--i' as string]: index }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
