import { AbstractDocument } from './abstract-document.model';
import { InvoiceState } from './enums/invoice-state.enum';
import { InvoiceItem } from './invoice-item';

export interface Invoice extends AbstractDocument {

    /**
     * Date d'envoi
     */
    sendingDate?: Date;

    /**
     * Date de paiement
     */
    paymentDate?: Date;

    /**
     * True si la facture est payée
     */
    paid?: boolean;

    /**
     * True si la facture est gérée par du portage salarial
     */
    portage?: boolean;

    /**
     * Montant du salaire de portage salarial
     */
    portageSalary?: number;

    /**
     * True si la facture a été déclarée
     */
    declaredToTaxService?: boolean;

    /**
     * Etat courant de la facture
     */
    state?: InvoiceState;

    invoiceItems?: InvoiceItem[];

    companyId?: number;

    company?: { id: number };
}
