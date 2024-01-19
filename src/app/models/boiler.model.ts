import { Household } from "./household.model";

export class Boiler{
    private _id: number;
    private _Prijs_in_euro: number;
    private _Household: Household;
    private _Titel: string;
    private _OneTimeHeat: number;
    private _DownTimeLossYear: number;
    private _HeatFifteenToSeventy: number;
    private _TimeToHeat: number;
    private _DownTimeLossDay: number;
    private _Opmerkingen: string;
    private _Liters: number;
    private _Energie_label: string;
    private _Elektrisch_vermogen: number;

    constructor(id: number, Liters: number, Energie_label: string, Elektrisch_vermogen: number, Prijs_in_euro: number, Household: Household, Titel: string, OneTimeHeat: number, DownTimeLossYear: number, HeatFifteenToSeventy: number, TimeToHeat: number, DownTimeLossDay: number, Opmerkingen: string) {
        this._id = id;
        this._Liters = Liters;
        this._Energie_label = Energie_label;
        this._Elektrisch_vermogen = Elektrisch_vermogen;
        this._Prijs_in_euro = Prijs_in_euro;
        this._Household = Household;
        this._Titel = Titel;
        this._OneTimeHeat = OneTimeHeat;
        this._DownTimeLossYear = DownTimeLossYear;
        this._HeatFifteenToSeventy = HeatFifteenToSeventy;
        this._TimeToHeat = TimeToHeat;
        this._DownTimeLossDay = DownTimeLossDay;
        this._Opmerkingen = Opmerkingen;
    }

    get id(): number {
        return this._id;
    }

    get Liters(): number {
        return this._Liters;
    }

    get Energie_label(): string {
        return this._Energie_label;
    }

    get Elektrisch_vermogen(): number {
        return this._Elektrisch_vermogen;
    }

    get Prijs_in_euro(): number {
        return this._Prijs_in_euro;
    }

    get Household(): Household {
        return this._Household;
    }

    get Titel(): string {
        return this._Titel;
    }

    get OneTimeHeat(): number {
        return this._OneTimeHeat;
    }

    get DownTimeLossYear(): number {
        return this._DownTimeLossYear;
    }

    get HeatFifteenToSeventy(): number {
        return this._HeatFifteenToSeventy;
    }

    get TimeToHeat(): number {
        return this._TimeToHeat;
    }

    get DownTimeLossDay(): number {
        return this._DownTimeLossDay;
    }

    get Opmerkingen(): string {
        return this._Opmerkingen;
    }
    
    
    set id(value: number) {
        this._id = value;
    }

    set Liters(value: number) {
        this._Liters = value;
    }

    set Energie_label(value: string) {
        this._Energie_label = value;
    }

    set Elektrisch_vermogen(value: number) {
        this._Elektrisch_vermogen = value;
    }

    set Prijs_in_euro(value: number) {
        this._Prijs_in_euro = value;
    }

    set Household(value: Household) {
        this._Household = value;
    }

    set Titel(value: string) {
        this._Titel = value;
    }

    set OneTimeHeat(value: number) {
        this._OneTimeHeat = value;
    }

    set DownTimeLossYear(value: number) {
        this._DownTimeLossYear = value;
    }

    set HeatFifteenToSeventy(value: number) {
        this._HeatFifteenToSeventy = value;
    }

    set TimeToHeat(value: number) {
        this._TimeToHeat = value;
    }

    set DownTimeLossDay(value: number) {
        this._DownTimeLossDay = value;
    }

    set Opmerkingen(value: string) {
        this._Opmerkingen = value;
    }

}