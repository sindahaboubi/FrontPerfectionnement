export class Demande {
        constructor(
            public demandefac?:string,
            public id?:number,
            public idStagiaire?:number,
            public etablissement?:string,
            public dateCrea?:Date, 
            public typ?:number,
            public dateDeb?:Date, 
            public dateFin?:Date,
            public niveauEtude?:string,
            public cv?:string,
            ){} 
} 
