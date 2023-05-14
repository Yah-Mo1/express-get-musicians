// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const {it, expect, describe} = require("@jest/globals")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");
const exp = require('constants');


describe('./musicians endpoint --> get Method', () => {
    // Write your tests here
    it("Testing musicians endpoint", async () => {
        // Sends request to `/bakedGoods` endpoint
        const response = await request(app).get("/musicians");
        expect(response.statusCode).toBe(200);
        
    })

    it("testing if it is an array", async () => {
        const response = await request(app).get("/musicians");
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toEqual(3);



    })

    it("testing for the body", async () => {
        const response = await request(app).get("/musicians");
        expect(response.body[0]).toHaveProperty("id")
        expect(response.body[0]).toHaveProperty("name")
        expect(response.body[0]).toHaveProperty("instrument")
        expect(response.body[0]).toHaveProperty("bandId")




    })
    
})


describe("testing for get method for a specific id",() => { 
    test("has get by id method", async () => {
       const response = await request(app).get("/musicians/1")
       expect(response.body).toHaveProperty("id");
       expect(response.body["id"]).toEqual(1)


    })

    
})