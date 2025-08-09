import { useState, useEffect, DetailedHTMLProps, HTMLAttributes } from 'react';
import ReactDOM from 'react-dom';

const Portal = (props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const [ container ] = useState(() => document.createElement('div'));

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal((
    <div {...props}>
      {props.children}
    </div>
  ), container);
};

export default Portal;