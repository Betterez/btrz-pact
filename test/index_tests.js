"use strict";

describe("BtrzPact", () => {

  const BtrzPact = require("../").BtrzPact,
    Chance = require("chance").Chance,
    chance = new Chance(),
    chai = require("chai"),
    sinon = require("sinon");

  let expect = chai.expect,
    pact = require('@pact-foundation/pact-node'),
    btrzPact, options;

  before(() => {
    options = {
      brokerUrl: "http://172.17.0.1/",
      user: "",
      pass: "",
      version: "1.0.0"
    };
    btrzPact = new BtrzPact(options);    
  });

  describe("constructor", () => {
    it("should throw if no options passed", () => {
      function sut() {
        new BtrzPact();  
      }
      expect(sut).to.throw("BtrzPact options are mandatory.");
    });

    it("should save the correct properties", () => {
      expect(btrzPact.pactBroker).to.be.eql(options.brokerUrl);
      expect(btrzPact.pactBrokerUsername).to.be.eql(options.user);
      expect(btrzPact.pactBrokerPassword).to.be.eql(options.pass);
    });
  });

  describe("publish()", () => {
    
    it("should call publish with the proper arguments", (done) => {
      let pactList = [`${__dirname}/pacts/consumer-provider.json`];
      let version = "1.0.0";

      sinon.stub(pact, "publishPacts", (opts) => {
        expect(opts.pactBroker).to.be.eql(options.brokerUrl);
        expect(opts.pactUrls).to.be.eql(pactList);
        expect(opts.pactBrokerUsername).to.be.eql(options.user);
        expect(opts.pactBrokerPassword).to.be.eql(options.pass);
        expect(opts.consumerVersion).to.be.eql(version);
        pact.publishPacts.restore();
        return Promise.resolve();
      });

      btrzPact.publish(pactList, version, pact)       
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should publish a list of pacts", (done) => {
      let pactList = [`${__dirname}/pacts/consumer-provider.json`, `${__dirname}/pacts/soup-baby.json`];
      let version = "1.0.0";

      sinon.stub(pact, "publishPacts", (opts) => {
        expect(opts.pactBroker).to.be.eql(options.brokerUrl);
        expect(opts.pactUrls).to.be.eql(pactList);
        expect(opts.pactBrokerUsername).to.be.eql(options.user);
        expect(opts.pactBrokerPassword).to.be.eql(options.pass);
        expect(opts.consumerVersion).to.be.eql(options.version);
        pact.publishPacts.restore();
        return Promise.resolve();
      });

      btrzPact.publish(pactList, version, pact)
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should throw if no pacts passed", () => {
      function sut() {
        btrzPact.publish();  
      }
      expect(sut).to.throw("No pacts array passed.");
    });

    it("should throw if no version passed", () => {
      let pactList = [`${__dirname}/pacts/consumer-provider.json`];
      
      function sut() {
        btrzPact.publish(pactList);  
      }
      expect(sut).to.throw("No version passed.");
    });

  });

  describe("verify()", () => {
    let providerBaseUrl = "http://host:port";
    let pactList = [`${__dirname}/pacts/consumer-provider.json`];

    sinon.stub(pact, "verifyPacts", (opts) => {
        expect(opts.providerBaseUrl).to.be.eql(providerBaseUrl);
        expect(opts.pactUrls).to.be.eql(pactList);
        expect(opts.pactBrokerUsername).to.be.eql(options.user);
        expect(opts.pactBrokerPassword).to.be.eql(options.pass);
        expect(opts.providerStatesUrl).to.be.eql("");
        expect(opts.providerStatesSetupUrl).to.be.eql("");
        pact.verifyPacts.restore();
        return Promise.resolve();
      });

    it("should call the verify with the correct params", (done) => {
      btrzPact.verify(providerBaseUrl, pactList, pact)
        .then(() => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should throw if no providerUrl passed", () => {
      function sut() {
        btrzPact.verify();  
      }
      expect(sut).to.throw("No providerUrl passed.");
    });

    it("should throw if no pacts passed", () => {
      function sut() {
        btrzPact.verify(providerBaseUrl);  
      }
      expect(sut).to.throw("No pacts array passed.");
    });

  });

});