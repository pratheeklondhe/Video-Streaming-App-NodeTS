import { Mongo } from "../../config/appconfig";
import { Categories } from "../entity/genre-categories";

const OrderSchema = new Mongo.Schema({
    key: { type: [String], enum: [...Object.values(Categories)], required: true },
    value: { type: [String], required: true }
})

const GenreOrderSchema = new Mongo.Schema({
    genreOrder: { type: [OrderSchema], required: true }
});

export const GenreOrderModel = Mongo.model('vsnodeapp_genre_order', GenreOrderSchema, 'vsnodeapp_genre_order');

export class GenreOrder {
    genreOrder: Order[] = [];
}

class Order {   
        key!: String;
        value!: String;    
}