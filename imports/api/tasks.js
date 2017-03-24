import { Mongo } from 'meteor/mongo';

export const Products = new Mongo.Collection('products');
export const Csvfiles = new Mongo.Collection('csvfiles');