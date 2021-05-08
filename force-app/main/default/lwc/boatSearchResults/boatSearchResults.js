import { LightningElement, api, wire, track } from 'lwc';
import getBoat from '@salesforce/apex/BoatDataService.getBoats'; 
import updateBoatList from '@salesforce/apex/BoatDataService.updateBoatList';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const columns = [
    { label: 'Label', fieldName: 'Name', editable: true },
    { label: 'Length', fieldName: 'Length__c', type: 'number', editable: true },
    { label: 'Price', fieldName: 'Price__c', type: 'currency', editable: true },
    { label: 'Description', fieldName: 'Description__c', type: 'String', editable: true }
];


export default class BoatSearchResults extends LightningElement {
    @api boatTypeId;
    @track boats=[];
    error = undefined;
    @track selectedBoatId;
    isLoading = false;
    columns = columns;
    rowOffset = 0;
    @track wiredBoats;

    // wired getBoats method
    @wire(getBoat , {boatTypeId: '$boatTypeId'})
    boatRec(results){
        this.isLoading = true;
        console.log('boatId@'+ JSON.stringify( this.boatTypeId));
        if( results.data){
            console.log('data@'+ JSON.stringify(results.data));
            this.wiredBoats = results;
            this.boats = results.data;
            results.error = this.error;
            this.isLoading= false;
        }if( results.error){
            console.log('e data@'+ JSON.stringify(results.error));
            this.error = results.error;
            results.data = undefined;
            this.isLoading= false;
        }
    }

    updateSelectedTile(event){
        console.log('Boat Id @@'+JSON.stringify(event.detail.boatId));
        this.selectedBoatId = event.detail.boatId;
        console.log('this.selectedBoatId@@'+ JSON.stringify(this.selectedBoatId));

    }

      // Check the current value of isLoading before dispatching the doneloading or loading custom event
    notifyLoading(isLoading) {

     }

     async handleSave(event){
        const updatedFields = event.detail.draftValues;
        //const promises = recordInputs.map(recordInput => updateRecord(recordInput));

        try {
            // Pass edited fields to the updateBoatList Apex controller
            const result = await updateBoatList({data: updatedFields});
            console.log(JSON.stringify("Apex update result: "+ result));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Ship it!',
                    variant: 'success'
                })
            );
    
            // Refresh LDS cache and wires
           // getRecordNotifyChange(notifyChangeIds);
    
            // Display fresh data in the datatable
             // Clear all draft values in the datatable
             this.draftValues = [];
             return refreshApex(this.wiredBoats);
        
        } catch(error) {
               this.dispatchEvent(
                   new ShowToastEvent({
                       title: 'Error updating or refreshing records',
                       message: error.body.message,
                       variant: 'error'
                   })
             );
             return refreshApex(this.wiredBoats);
        }
     }


    
}