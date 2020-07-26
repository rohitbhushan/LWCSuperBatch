import { LightningElement } from 'lwc';
import conAPI from '@salesforce/schema/Contact';
import Name_Field from '@salesforce/schema/Contact.Name';
import First_Field from '@salesforce/schema/Contact.FirstName';
import Last_Field from '@salesforce/schema/Contact.LastName';
import Email_FIELD from '@salesforce/schema/Contact.Email';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class ContactCreator extends LightningElement {
    objectApiName = conAPI;
    fields=[First_Field,Last_Field, Email_FIELD];

    handleSuccess(event){
        const toastEvent = new ShowToastEvent({
            title: "Contact created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
    
    }
}