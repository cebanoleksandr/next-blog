import ReactDOM from 'react-dom';
import classes from './notification.module.css';

type Status = 'success' | 'error' | 'pending'

type Props = {
  title: string;
  message: string;
  status: Status;
}

function Notification({ title, message, status }: Props) {
  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return ReactDOM.createPortal((
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  ), document.getElementById('notifications') as Element | DocumentFragment);
}

export default Notification;
