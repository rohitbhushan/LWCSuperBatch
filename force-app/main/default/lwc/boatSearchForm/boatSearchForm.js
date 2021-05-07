import { LightningElement, track , wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
    
    @track selectedBoatTypeId ='';
    @track error = undefined;
    value = 'All Types';
    @track searchOptions = '';
   

  
    @wire(getBoatTypes )
    boatTypes({ error, data }){
        if(data){
           /* alert('data'+ JSON.stringify(data));
            for(const list of data){
                const option = {
                    label : list.Name,
                    value : list.Id
                };
                this.searchOptions = [ ...this.searchOptions, option];
            }
          */
           this.searchOptions = data.map(type => {
            // TODO: complete the logic
            return { label: type.Name, value: type.Id };
          });
          this.searchOptions.unshift({ label: 'All Types', value: '' });
            
        }
        if(error){
            this.searchOptions = undefined;
            this.error = error;
           // console.log('@ error' );
        }
    }
    
    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
        // Create the const searchEvent
        // searchEvent must be the new custom event search
        event.preventDefault();
        this.selectedBoatTypeId = event.detail.value.trim();
        
        console.log(' this.selectedBoatTypeId'+ JSON.stringify( this.selectedBoatTypeId) );
            const searchEvent = new CustomEvent("search", {
            detail : {boatTypeId: this.selectedBoatTypeId}
        });
        this.dispatchEvent(searchEvent);
        
    }
    
   
}