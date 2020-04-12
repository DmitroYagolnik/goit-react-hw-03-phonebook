import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import style from './App.module.css';
import defaultContacts from '../../data/contacts.json';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const persistContacts = localStorage.getItem('contacts');
    this.setState({
      contacts: persistContacts ? JSON.parse(persistContacts) : defaultContacts,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addNewContact = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  changeFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  SearchContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(elem =>
      elem.name.toUpperCase().includes(filter.toUpperCase()),
    );
  };

  findContact = contactName => {
    const { contacts } = this.state;
    return contacts.find(elem => elem.name === contactName);
  };

  deleteContact = e => {
    const { id } = e.target.parentNode;
    const { contacts } = this.state;
    this.setState({
      contacts: contacts.filter(elem => elem.id !== id),
    });
  };

  render() {
    const { contacts, filter } = this.state;
    const contactsLength = contacts.length;
    const filterLength = filter.length;
    const filteredContacts = this.SearchContacts();

    return (
      <div className={style.Phonebook}>
        <h1 className={style.PhonebookTitle}>Phonebook</h1>
        <ContactForm
          addNewContact={this.addNewContact}
          findContact={this.findContact}
        />
        <h2 className={style.PhonebookContactsTitle}>Contacts</h2>
        {contactsLength > 2 && <Filter handleFilter={this.changeFilter} />}

        {filterLength > 0 ? (
          <ContactList
            contacts={filteredContacts}
            handleDelete={this.deleteContact}
          />
        ) : (
          <ContactList contacts={contacts} handleDelete={this.deleteContact} />
        )}
      </div>
    );
  }
}

export default App;
