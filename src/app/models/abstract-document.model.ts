import { APIModel } from './api-model.model';
import { Address } from './address.model';

export interface AbstractDocument extends APIModel {
    createdDate?: Date;
    updatedDate?: Date;
    validityDate?: Date;

    /**
     * Libellé du document
     */
    title?: string;

    /**
     * Montant totat à payer TTC
     */
    amount?: number;

    /**
     * Montant totat à payer hors taxe
     */
    amountDutyFree?: number;

    /**
     * Document avec ou sans TVA
     */
    tvaActive?: boolean;

    /**
     * Montant de la TVA
     */
    tvaAmount?: number;



    // ----------------------------------------------- //
    //                USER CONTACT INFO                //
    // ----------------------------------------------- //


    /**
     * Nom de l'utilisateur
     */
    userName?: string;

    /**
     * Numéro de téléphone de l'utilisateur
     */
    userPhone?: string;

    /**
     * Email de l'utilisateur
     */
    userEmail?: string;

    /**
     * Numéro de SIRET de l'utilisateur
     */
    userSiret?: string;

    /**
     * Adresse de facturation de l'utilisateur
     */
    userFacturationAddress?: Address;

    /**
     * Numéro de TVA Intra communautaire
     */
    tvaIdentifier?: string;






    // ----------------------------------------------- //
    //               CUSTOMER CONTACT INFO             //
    // ----------------------------------------------- //

    /**
     * Nom du client
     */
    customerName?: string;

    /**
     * Numéro de téléphone du client
     */
    customerPhone?: string;

    /**
     * Email du client
     */
    customerEmail?: string;


    /**
     * Numéro de SIRET du client
     */
    customerSiret?: string;

    /**
     * Adresse de facturation du client
     */
    customerFacturationAddress?: Address;

}
