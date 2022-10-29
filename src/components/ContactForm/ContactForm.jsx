import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { Form, Button } from './ContactForm.styled';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameId = nanoid();
  const phoneId = nanoid();

  const onNameChange = evt => {
    setName(evt.target.value);
  };

  const onNumberChange = evt => {
    setNumber(evt.target.value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const onSubmitChange = evt => {
    evt.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  return (
    <Form onSubmit={onSubmitChange}>
      <label>
        Name{' '}
        <input
          type="text"
          name="name"
          id={nameId}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          onChange={onNameChange}
          required
        />
      </label>
      <label>
        Number{' '}
        <input
          type="tel"
          name="number"
          id={phoneId}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          onChange={onNumberChange}
          required
        />
      </label>
      <Button type="submit">Add contact</Button>
    </Form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
