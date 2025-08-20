import { convertData } from './modules/convertData.js';
import init from './modules/init.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const API_KEY = 'AIzaSyCTgLtdniuG1m7aRegYMiqq5s18ktk0SSM';
    const SPREADSHEET_ID = '1_-Ps7Ef7SUZku9GYCCnV7aQ20EhtHDMjKqEpO9SViqw';

    const sheetLoad = () => {

        gapi.client.init({
            'apiKey': API_KEY,
            'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
        }).then(() => {
            return  gapi.client.sheets.spreadsheets.values.get({
                        spreadsheetId: SPREADSHEET_ID,
                        range: 'books!A1:L6900', // for example: List 1!A1:B6
                    });
        }).then(response => init(convertData(response.result.values)));
  
    };

    gapi.load('client', sheetLoad);


});

