# btrz-pact
Pact library for Betterez APIs consumers.
Is a requirement to have a pact broker server to connect with.

# Features:
Publish and Verify the consumer pacts to the Betterez pact_broker

# How to use
## Initializing btrz-pact
    let options = {
      brokerUrl: "localhost",
      user: "",
      pass: ""
    };
    btrzPact = new BtrzPact(options);
    
## Publish pacts    
    let pactList = ["path/to/pact"]; // or use a folder containing pacts to publish
    let version = "1.0.0";
    btrzPact.publish(pactList, version, pact)
      .then(() => {
        // do your stuff here...
      })
      .catch((err) => {
        // process error
      });
        
## Verify pacts
    let providerBaseUrl = "host/to/api/endpoint";
    let pactList = ["path/to/pact"]; // or use a folder containing pacts to verify
    btrzPact.verify(providerBaseUrl, pactList, pact)
      .then(() => {
          // do your stuff here...
        })
        .catch((err) => {
          // process error
        });
