import { Form } from './Form/Form';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  // ========Adding contacts=========
  const onAddingContacts = newContact => {
    contacts.find(prev => prev.name === newContact.name)
      ? alert(`${newContact.name} is already in contacts`)
      : setContacts(prev => [...prev, newContact]);
  };

  // ===========Filter Contacts==============

  const onFilterHandler = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  // ===========Delete Contacts==============
  const onDeleteHandler = contactId => {
    const notAid = prev => prev.id !== contactId;
    const updatedList = contacts.filter(notAid);

    setContacts(updatedList);
  };

  // =========Render=========

  return (
    <div className={css.form__wrapper}>
      <h2 className={css.form__title}>Phonebook</h2>
      <Form onAddingContacts={onAddingContacts} contacts={contacts} />
      <h2 className={css.form__title}>Contacts</h2>
      <Filter filteredContent={filter} onFilterHandler={onFilterHandler} />
      <Contacts
        contacts={contacts}
        filteredContent={filter}
        handleDelete={onDeleteHandler}
      />
    </div>
  );
};
