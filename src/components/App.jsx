import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const onInputChange = evt => {
    setFilter(evt.currentTarget.value);
  };

  const addContact = data => {
    data.id = nanoid();
    const checkContact = contacts.find(contact => contact.name === data.name);

    checkContact
      ? alert(`${data.name} is already in the contacts`)
      : setContacts([...contacts, data]);
  };

  const filterContactToLowerCase = filter.toLowerCase();
  const filterContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterContactToLowerCase)
  );

  const onDeleteContact = idContact => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => idContact !== contact.id)
    );
  };

  useEffect(() => {
    const localStorageContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(localStorageContacts);
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter onInputChange={onInputChange} filter={filter} />
      <ContactList contacts={filterContact} onDeleteContact={onDeleteContact} />
    </div>
  );
}
