export class Stage {
    constructor(
        public id?:number,
        public sujet?:string,
        public dateDeb?:Date,
        public dateFin?:Date,
        public siPaye?:string,
        public montant?:number,
        public nbPlaces?:number,
        public departement?:string,
        public typ?:number,
        public idAdmin?:number,
        ){} 
}
