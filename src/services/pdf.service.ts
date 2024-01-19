import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  // export to pdf functions
  public downloadAsPdf(
    amountLitres: string | 'NaN',
    priceKwh: string | 'NaN',
    electrical: string | 'NaN',
    energielabel: string | 'NaN',
    costOfHeatOnce: number | 0,
    costPerYear: number | 0,
    costPerDay: number | 0,
    timeNeededToHeat: number | 0,
    amountEnergyFifteenToSeventy: number | 0,
    household: string | 'NaN',
    opmerkingen: string | 'NaN',
    energyCoach: string | 'NaN',
    date: Date | 'NaN',
    title: string | 'NaN'
  ): void {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    function addLabelAndValue(
      label: string,
      value: string,
      x: number,
      y: number,
      textColor: string,
      fontSize: number,
      isLabelBold = false,
      isValueBold = false
    ) {
      // gives text color blue or black
      textColor = textColor === 'blue' ? '#2585fe' : '#131523';

      // sets label
      pdf.setFont('Arial', isLabelBold ? 'bold' : 'normal');
      pdf.setFontSize(fontSize);
      pdf.setTextColor(textColor);
      pdf.text(label, x, y);

      // sets value after label
      pdf.setFont('Arial', isValueBold ? 'bold' : 'normal');
      pdf.text(value, x + 100, y);
    }

    // place logo MNext top right
    const logo = new Image();
    logo.src = '../../assets/images/mnextLogo.png';
    pdf.addImage(logo, 160, 0, 0, 0);

    // Berekening Verbruik E-Boiler
    addLabelAndValue(
      'Berekening Energieverbruik E-Boiler',
      '',
      10,
      25,
      'blue',
      18,
      true,
      false
    );
    addLabelAndValue('Titel:', title, 10, 35, '', 11, false, false);

    addLabelAndValue('Klant:', household, 10, 50, '', 11, false, false);

    addLabelAndValue(
      'Energiecoach:',
      energyCoach,
      10,
      45,
      '',
      11,
      false,
      false
    );

    // Date
    const formattedDate = moment(date).format('D MMMM YYYY');
    addLabelAndValue(
      'Datum van Berekening:',
      formattedDate,
      10,
      40,
      '',
      11,
      false,
      false
    );
    // Boiler Informatie
    addLabelAndValue('Boiler Informatie', '', 10, 60, 'blue', 14, true, false);

    // Label and values for every inputfield
    addLabelAndValue(
      'Aantal Liter:',
      amountLitres + ' Liter',
      10,
      70,
      '',
      12,
      true,
      false
    );
    addLabelAndValue(
      'Prijs kWh:',
      priceKwh + ' eurocent',
      10,
      80,
      '',
      12,
      true,
      false
    );
    addLabelAndValue(
      'Electrisch vermogen E-Boiler:',
      electrical + ' kW',
      10,
      90,
      '',
      12,
      true,
      false
    );
    addLabelAndValue(
      'Energielabel boiler:',
      energielabel,
      10,
      100,
      '',
      12,
      true,
      false
    );

    pdf.setLineWidth(0.2);
    pdf.line(10, 110, 190, 110);

    // Kostenberekening section
    addLabelAndValue('Kostenberekening', '', 10, 120, 'blue', 14, true, false);

    // labels and values for output of every calculation
    addLabelAndValue(
      'Kosten voor één keer opwarmen:',
      '€ ' + costOfHeatOnce.toFixed(2),
      10,
      130,
      '',
      12,
      true,
      false
    );
    addLabelAndValue(
      'Kosten stilstandverlies per jaar:',
      '€ ' + costPerYear.toFixed(2),
      10,
      140,
      '',
      12,
      true,
      false
    );
    addLabelAndValue(
      'Hoeveelheid energie om op te warmen\nvan 15 °C naar 70 °C:',
      amountEnergyFifteenToSeventy.toFixed(2) + ' kWh',
      10,
      150,
      '',
      12,
      true,
      false
    );

    addLabelAndValue(
      'Tijd benodigd om het water te verwarmen:',
      timeNeededToHeat.toFixed(2) + ' uur',
      10,
      165,
      '',
      12,
      true,
      false
    );
    addLabelAndValue(
      'Stilstandsverlies (ongeveer):',
      costPerDay.toFixed(2) + ' kWh per dag',
      10,
      175,
      '',
      12,
      true,
      false
    );

    addLabelAndValue('Opmerkingen:', '', 10, 190, '', 12, true, false);

    // const opmerkingenText =
    //  'een twee drie vier vijf zes zeven acht negen tien een twee drie vier vijf zes zeven acht negen tien een twee drie vier vijf zes zeven acht negen tien een twee drie vier vijf zes zeven acht negen tien een twee drie vier vijf zes zeven acht negen tien een twee drie vier vijf zes zeven acht negen tien';

    printOpmerkingen(pdf, opmerkingen, 10, 195, 350, 5);

    // funtion for printing opmerkingen field
    function printOpmerkingen(
      pdf: any,
      opmerkingen: string,
      x: number,
      y: number,
      maxWidth: number,
      smallLineHeight: number
    ) {
      // Set font size and type for opmerkingen
      pdf.setFont('Arial', 'normal');
      pdf.setFontSize(12);

      // Split the opmerkingen text into words
      var words = opmerkingen.split(' ');

      var currentX = x;
      var currentY = y;
      var line = '';

      // loop through words
      for (var i = 0; i < words.length; i++) {
        var word = words[i];

        // Check if adding the word exceeds the maxWidth
        var wordWidth =
          pdf.getStringUnitWidth(word) * pdf.internal.getFontSize();
        if (currentX + wordWidth < maxWidth) {
          // Add the word to the current line
          line += (line === '' ? '' : ' ') + word;
          currentX +=
            wordWidth +
            pdf.getStringUnitWidth(' ') * pdf.internal.getFontSize();
        } else {
          // Print the current line
          pdf.text(x, currentY, line);
          currentY += smallLineHeight;

          line = word;
          currentX =
            x +
            wordWidth +
            pdf.getStringUnitWidth(' ') * pdf.internal.getFontSize();
        }
      }

      // Print the last line
      if (line !== '') {
        pdf.text(x, currentY, line);
      }
    }
    // Save the PDF
    pdf.save('Berekening_Boiler.pdf');
  }
}
