"use strict";
let pact = require('@pact-foundation/pact-node');

class BtrzPact {

	constructor(options) {
		if (!options) {
			throw new Error("BtrzPact options are mandatory.")
		}
		this.pactBroker = options.brokerUrl;
    this.pactBrokerUsername = options.user;
    this.pactBrokerPassword = options.pass;
	}	

	publish(pacts, version, _pactInjection_) {
		if (!pacts) {
			throw new Error("No pacts array passed.")
		}
		if (!version) {
			throw new Error("No version passed.")
		}
		pact = _pactInjection_ || pact;

		let options = {
			pactBroker: this.pactBroker,
			pactUrls: pacts, 
			pactBrokerUsername: this.pactBrokerUsername, 
			pactBrokerPassword: this.pactBrokerPassword, 
			consumerVersion: version
		};
		return pact.publishPacts(options);
	}

	verify(providerUrl, pacts, _pactInjection_) {
		if (!providerUrl) {
			throw new Error("No providerUrl passed.")
		}
		if (!pacts) {
			throw new Error("No pacts array passed.")
		}
		pact = _pactInjection_ || pact;

		let options = {
			providerBaseUrl: providerUrl,
			pactUrls: pacts, 
			pactBrokerUsername: this.pactBrokerUsername, 
			pactBrokerPassword: this.pactBrokerPassword, 
			providerStatesUrl: "",
			providerStatesSetupUrl: ""
		};
		return pact.verifyPacts(options);
	}
}


exports.BtrzPact = BtrzPact;