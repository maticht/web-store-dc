import {Types} from "mongoose";

interface AddInfos{
    title: string;
    description: string;
}

interface Pictures {
    picture: string | any;
}

interface Sizes {
    size: string;
    amount: number;
}

export interface IProduct {
    id?:string;
    title: string;
    description: string;
    sizes: Types.DocumentArray<Sizes>;
    pictures: Types.DocumentArray<Pictures>;
    additionalInformation: Types.DocumentArray<AddInfos>;
}