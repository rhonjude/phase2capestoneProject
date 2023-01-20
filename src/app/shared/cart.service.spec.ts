import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestBed, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IProduct } from '../products/product.model';
import { CartService } from "./cart.service"


describe('Cart Service',()=>{
    let service: CartService;
    let injector: TestBed;
    let httpMock: HttpTestingController;
    let prods:IProduct[]=[];
    beforeEach(async()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule,ReactiveFormsModule,FormsModule],
            providers:[CartService]
        });
        service=TestBed.get(CartService)
        injector=getTestBed();
        prods=[
            {
                "id":103,
                "name":"onion",
                "code":"TXD-787",
                "description":"Good Quality Onions",
                "price":45,
                "imageUrl":"../../assets/CarouselImages/vegetables-and-fruits-farmers-market.jpg",
                "quantity":0
            },
            {
                "id":104,
                "name":"cauliflower",
                "code":"TXD-785",
                "description":"Good Quality Cauliflower",
                "price":35,
                "imageUrl":"../../assets/CarouselImages/vegetables-and-fruits-farmers-market.jpg",
                "quantity":0
            },
        ];
        service.cart=prods;
        httpMock=injector.get(HttpTestingController);
    });
    it('should create',()=>{
        expect(service).toBeTruthy();
    });

    it('should check addtocart()',()=>{
        let veges = {
                "id":105,
                "name":"pottato",
                "code":"TXD-775",
                "description":"Good Quality Pottato",
                "price":35,
                "imageUrl":"../../assets/CarouselImages/vegetables-and-fruits-farmers-market.jpg",
                "quantity":0

        };
        prods = [...prods,veges];
        service.cart.push(veges);
        service.addtoCart(veges);
        expect(service.cart.length).toEqual(3);
    });

    it('should check emptyCart()',()=>{
        let vegetable = {
            "id":105,
                "name":"pottato",
                "code":"TXD-775",
                "description":"Good Quality Pottato",
                "price":35,
                "imageUrl":"../../assets/CarouselImages/vegetables-and-fruits-farmers-market.jpg",
                "quantity":0
        };

        prods = [...prods,vegetable];
        service.cart.push(vegetable);
        service.emptyCart();
        expect(service.cart.length).toEqual(0);

    });
});