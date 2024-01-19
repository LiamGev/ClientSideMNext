export class Household{
    private _id: number;
    private _familyName: string;
    private _postCode: string;
    private _City: string;


    constructor(id: number, familyName: string, postCode: string, City: string) {
        this._id = id;
        this._familyName = familyName;
        this._postCode = postCode;
        this._City = City;
    }

    get id(): number {
        return this._id;
    }

    get familyName(): string {
        return this._familyName;
    }

    get postCode(): string {
        return this._postCode;
    }

    get City(): string {
        return this._City;
    }

    set id(value: number) {
        this._id = value;
    }

    set familyName(value: string) {
        this._familyName = value;
    }


    set postCode(value: string) {
        this._postCode = value;
    }

    set City(value: string) {
        this._City = value;
    }

    
}