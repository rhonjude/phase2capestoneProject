import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { getTestBed, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IProduct } from "../products/product.model";
import { ProductService } from "./product.service"

describe("Product Service",()=>{
    let service:ProductService;
    let injector:TestBed;
    let httpMock:HttpTestingController;
    let prods:IProduct[]=[];
    beforeEach(async()=>{
        TestBed.configureTestingModule({
            imports:[HttpClientTestingModule,ReactiveFormsModule,FormsModule],
            providers:[ProductService]
        });
        service = TestBed.get(ProductService);
        injector=getTestBed();

        prods = [
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

        httpMock=injector.get(HttpTestingController);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
        });

    it('should check createProduct()',()=>{
        let vegetable1={
            
                "id":104,
                "name":"carrot",
                "code":"TXD-777",
                "description":"Good Quality Carrots",
                "price":45,
                "imageUrl":"../../assets/CarouselImages/vegetables-and-fruits-farmers-market.jpg",
                "quantity":0
            

        };
        prods=[...prods,vegetable1];
        service.createProduct(vegetable1).subscribe(response=>expect(response).toEqual(vegetable1))

        expect(prods.length).toEqual(3);
        const req = httpMock.expectOne(service.url);
        expect(req.request.method).toBe('POST');
        req.flush(vegetable1);
    });

    it('should check updateProduct()',()=>{
        let vegetable  ={
              "id":104,
                "name":"carrot",
                "code":"TXD-777",
                "description":"Good Quality Carrots",
                "price":45,
                "imageUrl":"../../assets/CarouselImages/vegetables-and-fruits-farmers-market.jpg",
                "quantity":0
        };
        service.updateProduct(vegetable).subscribe(response=>expect(response).toEqual(vegetable))
        const req=httpMock.expectOne(`${service.url}/${vegetable.id}`);
        expect(req.request.method).toBe('PUT');
        req.flush({vegetable});
    });

    it('should check deleteProduct()',()=>{
        let veg1 = {
                "id":104,
                "name":"carrot",
                "code":"TXD-777",
                "description":"Good Quality Carrots",
                "price":45,
                "imageUrl":"../../assets/CarouselImages/vegetables-and-fruits-farmers-market.jpg",
                "quantity":0

        };
        let veg2 = {
                "id":105,
                "name":"cuccumber",
                "code":"TXD-787",
                "description":"Good Quality cuccumber",
                "price":45,
                "imageUrl":"../../assets/CarouselImages/vegetables-and-fruits-farmers-market.jpg",
                "quantity":0

        };
        prods = [...prods,veg1,veg2];
        service.deleteProduct(veg2.id).subscribe(
            response=>console.log(response)
        );

        expect(prods.length).toEqual(4);
        const req=httpMock.expectOne(`${service.url}/${veg2.id}`);
         expect(req.request.method).toBe('DELETE');
         req.flush(veg2);
    })

});