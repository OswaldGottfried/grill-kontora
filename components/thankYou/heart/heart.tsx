import clsx from 'clsx';
import s from './heart.module.scss';

const HeartIcon: React.FC = () => (
  <div className={s.wrap}>
    <svg
      className={s.heartLoader}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 90 90"
      version="1.1"
    >
      <g className={s.group}>
        <path className={s.square} strokeWidth="1" fill="none" d="M0,30 0,90 60,90 60,30z" />
        <path
          className={clsx(s.circle, s.mLeft)}
          strokeWidth="1"
          fill="none"
          d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"
        />
        <path
          className={clsx(s.circle, s.mRight)}
          strokeWidth="1"
          fill="none"
          d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"
        />
        <path
          className={s.heartPath}
          strokeWidth="2"
          d="M60,30 a30,30 0 0,1 0,60 L0,90 0,30 a30,30 0 0,1 60,0"
        />
      </g>
    </svg>
  </div>
);

export default HeartIcon;
