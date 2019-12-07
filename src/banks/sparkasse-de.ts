import slugify from '@sindresorhus/slugify';
import * as moment from 'moment';

abstract class Bank {
    static requiredHeaders: any;
    static validateHeaders(transaction): boolean {
        return this.requiredHeaders.every(header => header in transaction);
    };
    static parseOptions = {
        header: true,
        transformHeader: header => slugify(header),
    };
}

export class SparkasseGerman extends Bank {
    static description = 'Sparkasse (German)';

    static requiredHeaders = [
        'auftragskonto', 'buchungstag', 'valutadatum', 'buchungstext', 'verwendungszweck', 'glaeubiger-id', 'mandatsreferenz', 'kundenreferenz-end-to-end', 'sammlerreferenz', 'lastschrift-ursprungsbetrag', 'auslagenersatz-ruecklastschrift', 'beguenstigter-zahlungspflichtiger', 'kontonummer-iban', 'bic-swift-code', 'betrag', 'waehrung', 'info',
    ];

    static transformTransactions(transactions) {
        return transactions
            .filter(transaction => transaction.valutadatum)
            .map(obj => {
                const amount = parseFloat(obj.betrag.replace(',', '')) || 0;
                const payee = obj['beguenstigter-zahlungspflichtiger'];

                // Read date as utc (w/out timezone) and convert to js date
                const date = moment.utc(obj.valutadatum, 'DD.MM.YYYY').toDate();

                return {
                    notes: obj.verwendungszweck,
                    date,
                    amount,
                    payee,
                };
            });
    }

}
