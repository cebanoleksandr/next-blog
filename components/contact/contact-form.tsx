import { FormEvent, useEffect, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

type Status = 'success' | 'error' | 'pending';
type ContactData = {
  email: string;
  name: string;
  message: string;
}

const sendContactData = async (messageData: ContactData) => {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(messageData),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }
}

export default function ContactForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState<Status | null>(null);
  const [requestError, setRequestError] = useState('');

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError('');
      }, 4000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [requestStatus]);

  const reset = () => {
    setEmail('');
    setName('');
    setMessage('');
  }

  const sendMessageHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestStatus('pending');

    try {
      await sendContactData({
        email,
        name,
        message
      });
      setRequestStatus('success');
      reset();
    } catch (error: any) {
      setRequestError(error.message);
      setRequestStatus('error');
    }
  }

  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: requestStatus,
      title: 'Sending message...',
      message: 'Your message is on its way!'
    }
  }

  if (requestStatus === 'error') {
    notification = {
      status: requestStatus,
      title: 'Error',
      message: requestError
    }
  }

  if (requestStatus === 'success') {
    notification = {
      status: requestStatus,
      title: 'Success!',
      message: 'Message sent successfully!'
    }
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>

      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input 
              type="email" 
              id="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input 
              type="text" 
              id="name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea 
            name="message" 
            id="message" 
            rows={5}
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>

      {!!notification && (
        <Notification 
          title={notification.title} 
          message={notification.message} 
          status={notification.status}
        />
      )}
    </section>
  );
}
