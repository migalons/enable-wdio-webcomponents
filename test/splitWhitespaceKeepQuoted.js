const split = require("../lib/splitWhitespaceKeepQuoted");
const customCommands = require("../index");
const expect = require("chai").expect;

describe("Split whitespace ", function () {

    it("should work with single quotes", function () {
        expect(split("some lines 'quoted string'")).to.deep.equal(["some", "lines", "'quoted string'"])
    });

    it("should work with double quotes", function () {
        expect(split('some lines "quoted string"')).to.deep.equal(["some", "lines", "\"quoted string\""])
    });

    it("should work with selectors with attributes that may contain spaces spaces", function () {
        expect(split("")).to.deep.equal([]);
    });

    it("should work with selector attributes that contain double quotes", function () {
        expect(split("css a[text='hola']")).to.deep.equal(["css", "a[text='hola']"])
    });

    it("should work with selector attributes that contain single quotes", function () {
        expect(split('css a[text="hola"]')).to.deep.equal(['css', 'a[text="hola"]'])
    });

    it("should work empty strings", function () {
        expect(split("")).to.deep.equal([])
    });

    it("should work splitting double white spaces", function () {
        expect(split("one  two")).to.deep.equal(["one", "two"])
    });

    it("should work with leading spaces", function () {
        expect(split(" one  two")).to.deep.equal(["one", "two"])
    });

    it("should work with trailing spaces", function () {
        expect(split("one  two ")).to.deep.equal(["one", "two"])
    });

    it("should work with leading and trailing spaces", function () {
        expect(split(" one  two ")).to.deep.equal(["one", "two"])
    });

});
