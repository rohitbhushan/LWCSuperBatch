import { LightningElement , api } from 'lwc';
import { APPLICATION_SCOPE, MessageContext, publish } from 'lightning/messageService';
import BOATMC from '@salesforce/messageChannel/BoatMessageChannel__c';

export default class BoatSearch extends LightningElement {
    isLoading = false;
    selectedBoatId;
    @api boatId;
    // Handles loading event
  handleLoading() {
    isLoading = true;
   }
  
  // Handles done loading event
  handleDoneLoading() {
    isLoading = false ;
   }
  
  // Handles search boat event
  // This custom event comes from the form
  searchBoats(event) { 
    console.log('Boat Id '+JSON.stringify(event.detail.boatTypeId));
    this.selectedBoatId = event.detail.boatTypeId;
    console.log('this.selectedBoatId@'+ JSON.stringify(this.selectedBoatId));
    
  }
  
  createNewBoat() { }


}