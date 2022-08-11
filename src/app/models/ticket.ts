import { User } from "./user";

export interface Ticket {
    id: number;
    subject:string;
    departmentId:Number;
    email:string;
    phone:string;
    status:string;
    language:string;
    productId:string;
    description:string;
    assigneeId:string;
    classification:string;
    category:string;
    createdAt:Date;
    updatedAt:Date;
    user:User;
 }
