import { LightningElement , wire } from 'lwc';
import { reduceErrors } from 'c/ldsUtils';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import First_Name_Field from '@salesforce/schema/Contact.FirstName';
import Last_Name_Field from '@salesforce/schema/Contact.LastName';
import Email_Field from '@salesforce/schema/Contact.Email';

const COLUMNS = [
    { label: 'First Name', fieldName: First_Name_Field.fieldApiName, type: 'text' },
    { label: 'Last Name', fieldName: Last_Name_Field.fieldApiName, type: 'text' },
    { label: 'Email_Field', fieldName: Email_Field.fieldApiName, type: 'text' }
];

export default class ContactList extends LightningElement {
    columns = COLUMNS;
    
    @wire(getContacts )
        contacts;
    
    get errors(){
            return (this.contacts.error) ?
        reduceErrors(this.contacts.error) : [];
    }
}