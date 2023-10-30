//setting up test environment variable
process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");
const { captureStackTrace } = require("../expressError");

let cucumbers = {name: "cucumbers", price: 3.50}

beforeEach(function(){
    items.push(cucumbers);
})

afterEach(function(){
    items.length =0;
});




//make a request to route and confirm we get cucumbers as a response:

describe("GET/items", () =>{
    test("Get all items", async() =>{
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({items: [cucumbers]})
    })

})

//make a request to get item by name/ invalid name

describe("GET/items/:name", () =>{
    test("Get item by name", async() =>{
        const res = await request(app).get(`/items/${cucumbers.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({item:cucumbers})
    })
    test("Responds with 404 for invalid item", async() =>{
        const res = await request(app).get('/items/strawberries');
        expect(res.statusCode).toBe(404);
    })
})

//make post request to create new item

describe("POST/items", () =>{
    test("Creating a new item", async() =>{
        const res = await request(app).post('/items').send({name:"apples", price: 3.50});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({item: {name:"apples", price:3.50}})
    })
})

//make a patch request to update an item's name

describe("/PATCH/item/:name", ()=>{
    test("Updating an item's name", async() =>{
      const res = await request(app).patch(`/items/${cucumbers.name}`).send({name:'kiwi'});
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({item: {name: 'kiwi', price:3.50}});
    });
    test("Responds with 404 for invalid item name", async() =>{
        const res = await request(app).patch('/items/banannas');
        expect(res.statusCode).toBe(404);
      });
    
  });

  // make a request to delete an item

//   describe("/GET/item/:name", () =>{
//     test("Deleting an item", async() =>{
//         const res = await request(app).delete(`/items/${cucumbers.name}`);
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toEqual({message:"Deleted"});
//     })
//     test("Responds with 404 for deleting invalid item", async() =>{
//         const res = await request(app).delete('/items/carrots');
//         expect(res.statusCode).toBe(404);
//       });
//     })

describe("DELETE/items/:name", () =>{
    test("Deleting an item", async() =>{
      const res = await request(app).delete(`/items/${cucumbers.name}`);
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({message:"Deleted"});
    });
    test("Responds with404 for deleting invalid item", async() =>{
      const res = await request(app).delete('/items/carrots');
      expect(res.statusCode).toBe(404);
    });
  });
  