# Hand History Parser

Parse hand histories from online poker sites in JavaScript & TypeScript.

## Installation

Add `@poker-apprentice/hand-history-parser` as a dependency.

- yarn:
  ```bash
  yarn add @poker-apprentice/hand-history-parser
  ```
- npm:
  ```bash
  npm install @poker-apprentice/hand-history-parser --save
  ```

## Usage

### `parseHand`

This promise-based function can be used to parse hand histories from any [support poker site](#supported-poker-sites). To use it, simply pass the contents of an individual hand history.

```ts
// assumes `hand` is a string containing the hand history file contents
const handHistory = parseHand(hand)
  .then((handHistory) => console.log(handHistory))
  .catch((err) => console.error(err));
```

If preferred, an async/await implementation can be used instead.

```ts
// assumes `hand` is a string containing the hand history file contents
try {
  const handHistory = await parseHand(hand);
  console.log(handHistory);
} catch (err) {
  console.error(err);
}
```

The value returned is represented as a [`HandHistory`](https://github.com/poker-apprentice/hand-history-parser/blob/main/src/types.ts#L263) type object. For example:

```js
{
  "info": {
    "bettingStructure": "no limit",
    "blinds": ["0.1", "0.25"],
    "currency": "USD",
    "handNumber": "4290322948",
    "isFastFold": false,
    "site": "bovada",
    "tableSize": 6,
    "timestamp": new Date("2022-05-26T14:16:24.000Z"),
    "variant": "holdem",
  },
  "players": [
    {
      "chipStack": "25",
      "isAnonymous": false,
      "isHero": true,
      "name": "Big Blind",
      "position": "BB",
      "seatNumber": 1,
    },
    {
      "chipStack": "24.4",
      "isAnonymous": true,
      "isHero": false,
      "name": "UTG",
      "position": "UTG",
      "seatNumber": 2,
    },
    {
      "chipStack": "7.5",
      "isAnonymous": true,
      "isHero": false,
      "name": "UTG+1",
      "position": "UTG+1",
      "seatNumber": 3,
    },
    {
      "chipStack": "33.77",
      "isAnonymous": true,
      "isHero": false,
      "name": "UTG+2",
      "position": "UTG+2",
      "seatNumber": 4,
    },
    {
      "chipStack": "26.87",
      "isAnonymous": true,
      "isHero": false,
      "name": "Dealer",
      "position": "BTN",
      "seatNumber": 5,
    },
    {
      "chipStack": "23.3",
      "isAnonymous": true,
      "isHero": false,
      "name": "Small Blind",
      "position": "SB",
      "seatNumber": 6,
    },
  ],
  "actions": [
    {
      "type": "post",
      "postType": "blind",
      "amount": "0.1",
      "playerName": "Small Blind",
    },
    {
      "type": "post",
      "postType": "blind",
      "amount": "0.25",
      "playerName": "Big Blind",
    },
    {
      "type": "deal-hand",
      "cards": ["Th", "Qh"],
      "playerName": "Big Blind",
    },
    {
      "type": "deal-hand",
      "cards": ["9s", "Ks"],
      "playerName": "UTG",
    },
    {
      "type": "deal-hand",
      "cards": ["6h", "Ad"],
      "playerName": "UTG+1",
    },
    {
      "type": "deal-hand",
      "cards": ["Jd", "2s"],
      "playerName": "UTG+2",
    },
    {
      "type": "deal-hand",
      "cards": ["Tc", "8d"],
      "playerName": "Dealer",
    },
    {
      "type": "deal-hand",
      "cards": ["3d", "8c"],
      "playerName": "Small Blind",
    },
    {
      "type": "call",
      "amount": "0.25",
      "isAllIn": false,
      "playerName": "UTG",
    },
    {
      "type": "call",
      "amount": "0.25",
      "isAllIn": false,
      "playerName": "UTG+1",
    },
    {
      "type": "fold",
      "playerName": "UTG+2",
    },
    {
      "type": "fold",
      "playerName": "Dealer",
    },
    {
      "type": "fold",
      "playerName": "Small Blind",
    },
    {
      "type": "check",
      "playerName": "Big Blind",
    },
    {
      "type": "deal-board",
      "cards": ["Qs", "Ts", "4s"],
      "street": "flop",
    },
    {
      "type": "bet",
      "amount": "0.5",
      "isAllIn": false,
      "playerName": "Big Blind",
    },
    {
      "type": "call",
      "amount": "0.5",
      "isAllIn": false,
      "playerName": "UTG",
    },
    {
      "type": "fold",
      "playerName": "UTG+1",
    },
    {
      "type": "deal-board",
      "cards": ["Jc"],
      "street": "turn",
    },
    {
      "type": "bet",
      "amount": "1",
      "isAllIn": false,
      "playerName": "Big Blind",
    },
    {
      "type": "call",
      "amount": "1",
      "isAllIn": false,
      "playerName": "UTG",
    },
    {
      "type": "deal-board",
      "cards": ["5d"],
      "street": "river",
    },
    {
      "type": "check",
      "playerName": "Big Blind",
    },
    {
      "type": "bet",
      "amount": "2.75",
      "isAllIn": false,
      "playerName": "UTG",
    },
    {
      "type": "call",
      "amount": "2.75",
      "isAllIn": false,
      "playerName": "Big Blind",
    },
    {
      "type": "showdown",
      "handStrength": 5,
      "playerName": "UTG",
    },
    {
      "type": "showdown",
      "handStrength": 2,
      "playerName": "Big Blind",
    },
    {
      "type": "award-pot",
      "amount": "8.89",
      "isSidePot": false,
      "playerName": "UTG",
    },
  ],
}
```

### `parseSite`

This function can be used to determine the [support poker site](#supported-poker-sites) on which a hand was played. To use it, simply pass the contents of an individual hand history.

```ts
// assumes `hand` is a string containing the hand history file contents
const site = parseSite(hand);
console.log(site);
```

The value returned is represented as a [`Site`](https://github.com/poker-apprentice/hand-history-parser/blob/main/src/types.ts#6) string union type.

## Supported Poker Sites/Networks

This package currently supports the following poker sites & networks:

| Site     | Network  | Cash Games | Tournaments | Hold'em |  Omaha  | Omaha-8 | Stud | Currencies |
| -------- | -------- | :--------: | :---------: | :-----: | :-----: | :-----: | :--: | ---------- |
| Bodog    | Ignition |  &#9989;   |  &#10060;   | &#9989; | &#9989; | &#9989; | N/A  | USD        |
| Bovada   | Ignition |  &#9989;   |  &#10060;   | &#9989; | &#9989; | &#9989; | N/A  | USD        |
| Ignition | Ignition |  &#9989;   |  &#10060;   | &#9989; | &#9989; | &#9989; | N/A  | USD        |

The parser is built in a way that it is relatively straightforward to extend with new poker sites. The main thing that is missing for this to happen is a combination of sample hand histories to implement against & time.

If you are a developer that is interested in contributing, see the [contributing](#contributing) section below.

If you are an online poker player that has hand histories that can be used as a reference, please email them to the author.

## Contributing

If you'd like to implement a new poker site, fix a bug, improve the documentation, or anything else to better this library, pull requests are welcomed!

The architecture is as straightforward as possible, with the most complex part involving an understanding of the [ANTLR](https://www.antlr.org/) language processor. The approach is as follows:

1. Clone the repository:
   ```bash
   git clone git@github.com:poker-apprentice/hand-history-parser.git
   ```
1. Install dependencies:
   ```bash
   yarn install
   ```
1. Add a `.g4` grammar file under `grammar/[PokerSite].g4`.
   It is recommended that this file be parsed by different types of lines that appear within the file. These lines can typically be broken down into one of: game metadata, player metadata, & player actions. These three types of information comprise the data that must be returned by a new hand history parser.
1. Build all ANTLR grammar files:
   ```bash
   yarn build:grammar
   ```
1. Add a visitor for your poker site under `networks/[pokersite]/[PokerSite]HandHistoryVisitor.ts`.
   The visitor is responsible for returning a value representing the current node that is being parsed bym ANTLR. Ideally each line being parsed can return an object representing one of the three types of metadata outlined above. However, it may be necessary to utilize a custom return type that may or may not wrap the shared `Action`, `Player`, and `GameInfo` types depending on the poker site's hand history structure.
1. Add a parser for your poker site under `networks/[pokersite]/parseHand.ts`.
   This function is intended to delegate to the Visitor class implemented above, massaging the return value into a `HandHistory` object as a return value.
1. Include tests for common & uncommon parsing scenarios that demonstrate the `parseHand` function is working as intended. Common & uncommon scenarios include:
   - Multiple variants (e.g.: Hold'em, Omaha, Omaha-8, etc.),
   - Multiple betting structures (i.e.: limit, no-limit, pot-limit, spread-limit, cap-limit),
   - Multiple currencies,
   - Cash & tournament games,
   - Chopped pots & side pots,
   - Antes & bounties, and
   - Player disconnections & timeouts.

If you are interested in contributing, but you are stuck or lost at any point in your efforts, please reach out for help!
