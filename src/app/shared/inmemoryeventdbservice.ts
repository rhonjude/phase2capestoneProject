import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
    providedIn:'root'
})
export class DbService implements InMemoryDbService{
    createDb(){
        return{
            products:[
                {
                    id:101,
                    name:"cabbage",
                    code:"TXN-440",
                    description:"farm fresh cabbage",
                   price:50,
                    imageUrl:"../../assets/CarouselImages/vegetables-and-fruits-farmers-market.jpg",
                    quantity:0
                },
                {
                    id:102,
                    name:"tomato",
                    code:"GDN-111",
                    description:"Good quality tomato",
                   price:40,
                    imageUrl:"../../assets/CarouselImages/vegetables-and-fruits-farmers-market.jpg",
                    quantity:0
                }

              
            ],
            users:[
                { id:1,
                    userName:'rhon',
                    password:'rhon',
                    isAdmin:true},
            
                    { id:2,
                      userName:'rahul',
                      password:'rahul',
                      isAdmin:false},
            
                      { id:3,
                        userName:'rambo',
                        password:'rambo',
                        isAdmin:false}
                
            ]
        }
    }
}