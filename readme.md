# CryptoPay

CryptoPay, a simple initiative to allow paying with cryptocurrencies in a physical location, as simply as with a credit card.

## Concept

CryptoPay was supposed to be a tool-suite, allowing customers to pay using cryptocurrencies (for instance Bitcoins) through a cryptocurrency provider (such as Bitget, Bitpanda, Coinbase...) with close to no effort. Sellpoints (supermarkets, barbers, restaurants...) are able to register in the CryptoPay ecosystem, and integrate our simple payment system into their payment options.

## Workflow

In order for a customer to pay at a given sellpoint with CryptoPay, following steps have (or would have) to be taken, with further details about their technical implementation later:

- A sellpoint has to register in our ecosystem (through a website / customer support)
- During the registration process, the sellpoint has to go through a KYC ("Know your customer") Process, and provide information, amongst them their address, name and a related crypto-wallet ID (similar to IBAN in online banking, each account at a cryptocurrency provider, such as coinbase, has an ID, that can identify it). Any transactions that are directed to the given crypto-wallet ID are expected to have been generated using CryptoPay and will later be subject to fees, once a certain threshhold has been met.
- In the Backend, the system registers the new sellpoint, and starts tracking any incoming payments to the given Walled ID.
- The sellpoint can now use the web-application, for instance on mobile phones of employees, to initiate a new payment. A QR Code, containing the target wallet ID and the payment amount is generated and displayed on the screen.
- The customer, who needs to use the CryptoPay Customer web-application on their mobile phone, can now interact with the payment request. The customer needs to scan the QR-code on the sellpoint web-application, and is automatically redirected to the crypto-currency provider, to whom the wallet ID is associated, prefilling the transfer form, therefore only requiring the customer to confirm the payment to the wallet ID.
- On the web-application of the sellpoint, once the customer has payed through the cryptocurrency provider, a payment verification can be started. If the payment for the given amount can be verified, the sellpoint can finalize their payment in their custom system, for instance by printing out a receipt.
- Our internal Billing service checks continuously if any payment has been made to any of the registered wallet IDs and tracks them accordingly, to later on require a fee to the sellpoints.

The customer can use the system entirely for free, the sellpoints pay a percentage of their income through CryptoPay as a fee, gradually decreasing as their income increased (<10k yearly: Free, <20k yearly: 3%, <50k yearly: 2%, <250k yearly: 1%, above: custom fee, contact the sales team). The fee is payed through a yearly bill to the sellpoint.

## Technical Implementation

CryptoPay has been implemented as a MVP (minimal viable product) in under a week. The system is working, but does not offer any security measures according to industry standards. Any user interfaces are not final, and just allow for a working prototype.

The current implementation should be considered as PoC (Proof of Concept), but would require throrough work to be able to use it in productive environment.

### Components:

#### Billing Service:

Microservice written in python with the flask framework. It supports the registration of a new customer to the payment tracking, and a periodic request to "Coinbase_Proto", our own cryptocurrency provider mock. It could make use of callbacks, if supported by any used cryptocurrency provider, to continously track new incoming payments. The payments are not persisted into a database, but should be if used.

#### Business App:

Frontend and Backend, both related to the web-application that the sellpoints would use. The Backend is written with Python and the Flask Framework, the Frontend with Typescript and Angular. The Business App can initiate new payments, generate QR codes on the backend, and check if new transactions with the given amount have been registered in "Coinbase_Proto". Furthemore, the frontend allows to go through an entire payment process on the sellpoint side (initiate payment intent => generate QR code => scan QR code of customer => check for incoming payment).

#### Coinbase Proto:

Frontend and Backend, that serve as a mock for actual cryptocurrency provider / broker (Coinbase, Bitpanda, Bitget...). The Backend is written with Python and the Flask Framework, the Frontend with Typescript and Angular. Only the minimal features are implemented, such as a simple login, a payment page to transfer cryptocurrencies from a wallet A to a wallet B (that can be prefilled!), and a transaction history (both for incoming and outgoing transactions). The Coinbase_Proto is used by all the systems in CryptoPay (either through its frotend or its integrated easy to use API). In a real use case, the Coinbase_Proto would have to be replaced by an actual cryptocurrency provider, that supports are least following features:

- Payment from wallet A to B - ideally with the ability to prefill forms
- Transaction History (reachable through free API) - ideally with callbacks
- Fast transaction speed - the shorter, the better

In a concrete implementation, several cryptocurrency provider can be supported at the same time in a productive CryptoPay instance.

#### Customer App:

Frontend, related to the web-application that the sellpoints would use. The Frontend is written with Typescript and Angular. The application is able to read a QR code from another device currently serving the business app, and therefore redirect the user to the frontend of the Coinbase_Proto (or any actual cryptocurrency providers, such as Coinbase). Furthermore, the customer app can also display a QR Code of the wallet ID of the customer, allowing the business app to know, which wallet ID to expect the payment from.
